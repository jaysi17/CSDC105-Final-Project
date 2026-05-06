const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

//MODELS
const User = require('./models/User.js');
const Place = require('./models/Place');
const Booking = require('./models/Booking.js');

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

// Cloudinary configuration for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'place_images', // Optional: a folder inside Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const uploadToCloud = multer({ storage: storage });

// Verify required environment variables
if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined in environment variables');
    process.exit(1);
}

// MongoDB connection with improved error handling
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Helper function to extract user data from JWT token
// This function verifies the token and retrieves user data
// It returns a promise that resolves with the user data
// If the token is missing or invalid, it rejects so the caller can respond with 401
function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        if (!req.cookies.token) {
            return reject(new Error('No token provided'));
        }
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData)=>{
            if(err) return reject(err);
            resolve(userData);
        })
    })
}

// Test route to check if the server is running
app.get('/test', (req, res) => {
    res.json('test ok')
});


// This route handles user registration
// It creates a new user in the database with hashed password
// It uses bcrypt to hash the password before saving it
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

// User login route
// This route handles user login and token generation
// It checks if the user exists and verifies the password
// If successful, it generates a JWT token and sends it back in a cookie
app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // Wrap DB and bcrypt calls in try/catch so unexpected errors return a response
    // instead of leaving the request hanging
    try {
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
                        if (err) return res.status(500).json({ error: 'Failed to sign token' });
                        // httpOnly prevents JS from reading the cookie (XSS protection)
                        // sameSite: 'lax' makes the cookie reliably sent on cross-origin
                        // requests from the Vite dev server (port 5173 → 4000)
                        res.cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'lax',
                        }).json(userDoc)
                    })
                }
                else {
                    res.status(422).json('incorrect password')
                }
        } else {
            res.status(422).json('not found')
        }
    } catch (e) {
        res.status(500).json({ error: 'Login failed' });
    }
})

// This route retrieves the user's profile information
// It checks if the user is authenticated by verifying the JWT token
// If the token is valid, it fetches the user's data from the database
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            // Throwing inside this async callback won't reach Express's error handler,
            // so we respond explicitly with 401 instead
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            const {name, email, _id} = await User.findById(userData._id);
            res.json({name, email, _id})
        })
    } else {
     res.json(null)
    }
})

// This route handles user logout
// It clears the JWT token from the cookies
// This is done by setting the token cookie to an empty string
app.post('/logout', (req, res) => {
    // clearCookie removes the cookie from the browser instead of just setting it
    // to an empty string, which some browsers may keep around
    res.clearCookie('token').json(true);
})


// This route handles image uploads via a link
// It downloads the image from the provided link and saves it to the server
// If the link is a Cloudinary link, it returns the link as-is
// Otherwise, it downloads the image and returns the new file name
app.post('/upload-by-link', async (req, res) => {
    const {link} =  req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    // If it's a Cloudinary or external link, just return it as-is
    if (link.startsWith('http') && (link.includes('cloudinary.com') || link.includes('res.cloudinary.com'))) {
        return res.json(link);  // Return full URL
    }

    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads'});

// This route handles image uploads from the client
// It uses multer to handle file uploads and saves them to the server
app.post('/upload', uploadToCloud.array('photos', 100), (req, res) => {
    const uploadedFiles = req.files.map(file => file.path); // Cloudinary returns file.path as the URL    
    res.json(uploadedFiles);
})

// This route handles the creation of new places
// It requires the user to be authenticated by verifying the JWT token
// If the token is valid, it creates a new place in the database
app.post('/places', async (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
            const {
                title, address, photos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
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

// This route retrieves all places owned by the authenticated user
// It verifies the JWT token and fetches the places from the database
// The places are filtered by the owner's ID
app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        // Without this check, an invalid token leaves userData undefined
        // and the destructure below crashes the route
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const {_id} = userData;
        res.json(await Place.find({owner:_id}));
    })
})

// This route retrieves a specific place by its ID
// It verifies the JWT token and fetches the place from the database
app.get('/places/:_id', async (req, res) => {
    const {_id} = req.params;
    res.json(await Place.findById(_id));
});

// This route handles the update of an existing place
// It verifies the JWT token and checks if the user is the owner of the place
// If the user is the owner, it updates the place with the new data
// It uses the set method to update only the fields that have changed
app.put('/places', async (req, res) => {
    const{token} = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const {
            id,
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const placeDoc = await Place.findById(id)
        if (userData._id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok')
        } else {
            // Without this branch the request hangs when the user is not the owner
            res.status(403).json({ error: 'You are not authorized to update this place' });
        }
    })
})

// This route retrieves all places from the database
// It fetches all places and returns them as a JSON response
app.get('/places', async (req, res) => {
    res.json(await Place.find() )
})

// This route handles the creation of new bookings
// It verifies the JWT token and checks if the user is authenticated
// If the token is valid, it creates a new booking in the database
app.post('/bookings', async (req,res) => {
    // Catch the rejection from getUserDataFromToken so a missing or invalid
    // token returns 401 instead of becoming an unhandled promise rejection
    let userData;
    try {
        userData = await getUserDataFromToken(req);
    } catch (e) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price
    } = req.body;
    await Booking.create({
        place,user:userData._id , checkIn, checkOut, numberOfGuests, name, phone, price
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        res.status(500).json({ error: 'Failed to create booking' });
    })
})

// This route retrieves all bookings for the authenticated user
// It verifies the JWT token and fetches the bookings from the database
// The bookings are filtered by the user's ID
app.get('/bookings', async (req, res) => {
    // Same defensive pattern as POST /bookings: a missing/invalid token
    // should return 401 rather than crash the request
    let userData;
    try {
        userData = await getUserDataFromToken(req);
    } catch (e) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const bookings = await Booking.find({ user: userData._id }).populate('place'); // optional: populate place data
    res.json(bookings);
});

// This route handles the deletion of a place by its ID
// It verifies the JWT token and checks if the user is the owner of the place
app.delete('/places/:id', async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ error: "Place not found" });
        }

        // Check if the user is the owner of the place
        if (placeDoc.owner.toString() === userData._id) {
            await Place.findByIdAndDelete(id);
            res.json({ success: true });
        } else {
            res.status(403).json({ error: "You are not authorized to delete this place" });
        }
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});