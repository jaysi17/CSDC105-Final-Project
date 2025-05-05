const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs')
require('dotenv').config();
//MODELS
const User = require('./models/User.js');
const Place = require('./models/Place');

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = '9f3hfreunuvnreg93jg8revufh8924f20'

//MIDDLEWARE
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(express.json()); //parser
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(userDoc);
    }
    catch (e){
        res.status(422).json(e);
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

        const userDoc = await User.findOne({email})
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password) //checks if the input password when encrypted be the same as the pass of the user document
                if (passOk) {
                    // Payload — what data to store inside the token.
                    // Secret key — to make sure no one else can fake the token.
                    // SYNTAX = jwt.sign(payload, secret, options, callback)
                    jwt.sign({
                        email:userDoc.email, 
                        _id:userDoc._id
                    }, jwtSecret, {}, (err, token) => {
                        if (err) throw err;
                        res.cookie('token', token).json(userDoc)
                    })
                }
                else {
                    res.status(422).json('incorrect password')
                }
        } else {
            res.status(422).json('not found')
        }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            const {name, email, _id} = await User.findById(userData._id);
            res.json({name, email, _id})
        })
    } else {
     res.json(null)
    } 
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} =  req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads'});

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];       

    for(let i = 0; i <req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.split('\\').pop().split('/').pop());
    }
    res.json(uploadedFiles);
})

app.post('/places', async (req, res) => {
    const {token} = req.cookies;
            const {
                title, address, photos, 
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const placeDoc = await Place.create({
            owner: userData._id,
            title, address, photos, 
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc)
    })
})

app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {_id} = userData;
        res.json(await Place.find({owner:_id}));
    })
})

app.get('/places/:_id', async (req, res) => {
    const {_id} = req.params;
    res.json(await Place.findById(_id));
});

app.put('/places', async (req, res) => {
    const{token} = req.cookies;
    const {
            id,
            title, address, photos, 
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        if(err) throw err;
        if (userData._id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos, 
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok')
        }
    })
}) 

app.get('/places', async (req, res) => {
    res.json(await Place.find() )
})


app.listen(4000); 