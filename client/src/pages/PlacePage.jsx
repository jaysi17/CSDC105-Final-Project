import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(response => setPlace(response.data));
    }, [id]);

    if (!place) return '';

    return (
        <div className="mt-6 bg-gray-50 min-h-screen px-0 md:px-8 py-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">{place.title}</h1>
                <AddressLink>{place.address}</AddressLink>
                <div className="my-6">
                    <PlaceGallery place={place} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="md:col-span-2">
                        <div className="mb-6">
                            <h2 className="font-semibold text-2xl mb-2">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{place.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 text-gray-600 text-base">
                            <div className="bg-white rounded-xl shadow p-4 flex-1">
                                <span className="font-semibold">Check-in:</span> {place.checkIn}
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 flex-1">
                                <span className="font-semibold">Check-out:</span> {place.checkOut}
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 flex-1">
                                <span className="font-semibold">Max Guests:</span> {place.maxGuests}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sticky top-24">
                            <BookingWidget place={place} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow px-8 py-8 border-t">
                    <h2 className="font-semibold text-2xl mb-2">Extra Info</h2>
                    <div className="text-gray-700 leading-5 text-base">
                        {place.extraInfo}
                    </div>
                </div>
            </div>
        </div>
    );
}