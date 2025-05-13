import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios"
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings', { withCredentials: true }).then(response => {
            setBookings(response.data)
        })
    }, [])

    return(
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
                        <div className="w-48">
                            <PlaceImg place={booking.place}/>
                        </div>
                        <div className="py-3">
                            <h2>{booking.place.title}</h2>
                            {format(new Date(booking.checkIn), 'yyyy-MM-dd')} to {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                            <div className="border-t border-gray-300">
                                Number of nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br />
                                Total price: P{booking.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}