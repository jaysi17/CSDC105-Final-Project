import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios"
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

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
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
                        <div className="w-48">
                            <PlaceImg place={booking.place}/>
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            
                            <div className="flex gap-2 border-t border-gray-300 mt-2 py-2"></div>
                            <BookingDates booking={booking} className="mb-2 text-gray-500" />
                            <div className="text-2xl font-semibold mt-2">
                                Total price: ₱{booking.price}
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}