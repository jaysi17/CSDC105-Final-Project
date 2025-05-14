import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios"
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    //  State to hold the bookings data
    //  The useState hook is used to manage the state of the bookings
    const [bookings, setBookings] = useState([]);

    //  useEffect hook to fetch bookings data from the server
    //  The empty dependency array [] means this effect runs once when the component mounts
    useEffect(() => {
        axios.get('/bookings', { withCredentials: true }).then(response => {
            setBookings(response.data)
        })
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <AccountNav />
            <div className="max-w-4xl mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
                <div className="space-y-6">
                    {bookings?.length > 0 && bookings.map(booking => (
                        <Link
                            to={`/account/bookings/${booking._id}`}
                            key={booking._id}
                            className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl overflow-hidden shadow transition-shadow group"
                        >
                            <div className="md:w-48 w-full h-48 md:h-auto flex-shrink-0">
                                <PlaceImg place={booking.place} className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col justify-between py-4 pr-4 flex-1">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-1 transition-colors group-hover:text-[#2563eb]">
                                        {booking.place.title}
                                    </h2>
                                    <BookingDates booking={booking} className="mb-2 text-gray-500" />
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-lg font-medium text-gray-700">Total price:</span>
                                    <span className="text-2xl font-bold transition-colors group-hover:text-[#2563eb]">₱{booking.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {/* If there are no bookings, display a message */}
                    {(!bookings || bookings.length === 0) && (
                        <div className="text-center text-gray-500 py-12">
                            You have no bookings yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}