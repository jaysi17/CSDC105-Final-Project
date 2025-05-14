import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
    //  useState hooks to manage the state of the booking widget
    //  These states include check-in date, check-out date, number of guests, name, phone number, and redirect URL
    const [checkIn,setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    //  useEffect hook to set the name state when the user context changes
    //  This ensures that the name field is pre-filled with the user's name if they are logged in
    useEffect(()=> {
        //  If the user is logged in, set the name state to the user's name
        if (user) {
            setName(user.name)
        }
    }, [user])

    //  Function to calculate the number of nights based on the check-in and check-out dates
    //  This function uses the differenceInCalendarDays function from date-fns to calculate the difference in days
    //  between the two dates
    let numberOfNights = 0;
    //  If both check-in and check-out dates are provided, calculate the number of nights
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    //  Function to handle the booking process
    //  This function sends a POST request to the server to create a new booking
    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        })
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    //  If the user is not logged in and the redirect state is not set
    //  redirect them to the login page
    if(redirect) {
        return <Navigate to={redirect}/>
    }

    //  Render the booking widget
    return (
        <div className="bg-white shadow p-4 rounded-2xl w-full max-w-sm mx-auto">
            <div className="text-center text-2xl">
                Price: ₱ {place.price} / night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex gap-2">
                    <div className="py-3 px-4 flex-1 min-w-0">
                        <label>Check-in: </label>
                        <input 
                            type="date" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)}
                            className="w-full min-w-0"
                        />
                    </div>
                    <div className="py-3 px-4 border-l flex-1 min-w-0">
                        <label>Check-out: </label>
                        <input 
                            type="date" 
                            value={checkOut} 
                            onChange={ev => setCheckOut(ev.target.value)}
                            className="w-full min-w-0"
                        />
                    </div>
                </div>
                <div className="px-4 py-3 border-t">
                    <label>Max guests: </label>
                    <input 
                        type="number" 
                        value={numberOfGuests} 
                        onChange={ev => setNumberOfGuests(ev.target.value)}
                        className="w-full"
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="px-4 py-3 border-t">
                        <label>Full name: </label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={ev => setName(ev.target.value)}
                            className="w-full"
                        />
                        <label>Phone Number: </label>
                        <input 
                            type="tel" 
                            value={phone} 
                            onChange={ev => setPhone(ev.target.value)}
                            className="w-full"
                        />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="bg-[#2563eb] text-white py-2 px-6 rounded-full w-full mt-4 hover:bg-blue-700 transition-colors">
                Book this place
                {numberOfNights > 0 && (
                    <span> for ₱{numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}