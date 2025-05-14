import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    // Extract the place ID from the URL parameters
    const{id} = useParams();
    // State to hold the form data
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100)
    
    // Fetch the place data when the component mounts or when the id changes
    useEffect(() => {
        if(!id) {
            return;
        }
        // Make a GET request to fetch the place data
        axios.get('/places/'+id)
            .then(response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price)
            })
    }, [id]);

    // Helper functions to create input headers and descriptions
    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>
    }

    // Helper function to create input descriptions
    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>
    }

    // Helper function to create input sections with header and description
    function preInput(header, description) {
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    // Function to handle form submission
    // This function is called when the form is submitted
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, photos: addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price
        }

        // If id is present, update the place
        // Otherwise, create a new place
        if (id) {
            //update
            console.log("Saving place with photos:", addedPhotos);
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true)
        } 
        else {
            //new
            console.log("Saving place with photos:", addedPhotos);
            await axios.post('/places', placeData);
            
            setRedirect(true)
        }
    }

    // If redirect is true, navigate to the account places page
    if(redirect) {
        return <Navigate to={'/account/places'} />
    }

    return(
        // Main container for the form
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />
                
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                {preInput('Photos', 'More is better')}
                
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description','Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}></textarea>

                {preInput('Perks', 'Select all the perks of your place')}
                <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks}></Perks>
                </div>

                {preInput('Extra Info', 'House rules, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} ></textarea>

                {preInput('Check-In & Out Times','Add Check-in and Check-out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check-In Time</h3>
                        <input 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} 
                            type="text" placeholder="12:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-Out Time</h3>
                        <input 
                            value={checkOut} 
                            onChange={ev => setCheckOut(ev.target.value)} 
                            type="text" placeholder="11:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                        <input 
                            value={maxGuests} 
                            onChange={ev => setMaxGuests(ev.target.value)} 
                            type="number" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price Per Night</h3>
                        <input 
                            value={price} 
                            onChange={ev => setPrice(ev.target.value)} 
                            type="number" />
                    </div>
                </div>
                
                <button className="my-4 p-2 w-full text-white rounded-2xl bg-[#F5385D]">
                    Save
                </button>
                
            </form>
        </div>
    )
}