import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-10 px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-1 text-blue-700">{booking.place.title}</h1>
            <AddressLink className="my-2 block text-blue-500">{booking.place.address}</AddressLink>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-10">
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Your Booking Information</h2>
                        <BookingDates booking={booking} />
                    </div>
                </div>
                <div>
                    <div className="bg-blue-600 p-8 text-white rounded-2xl shadow flex flex-col items-center justify-center h-full">
                        <div className="text-lg font-medium mb-2">Total Price</div>
                        <div className="text-4xl font-bold mb-1">₱{booking.price}</div>
                        <span className="text-sm opacity-80">for your stay</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Gallery</h2>
                <PlaceGallery place={booking.place} />
            </div>
        </div>
    );
}