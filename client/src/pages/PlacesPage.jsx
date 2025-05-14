import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
    // State to hold the places data
    const [places, setPlaces] = useState([]);

    // Fetch places data from the server when the component mounts
    useEffect(() => {
        fetchPlaces();
    }, []);

    // Function to fetch places from the server
    const fetchPlaces = () => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    };

    // Function to delete a place
    const deletePlace = (placeId) => {
        // Show a confirmation dialog before deleting
        if (window.confirm("Are you sure you want to delete this place?")) {
            axios.delete(`/places/${placeId}`).then(() => {
                // Refresh the list of places after deletion
                fetchPlaces();
            }).catch((err) => {
                console.error("Failed to delete place:", err);
            });
        }
    };

    return (
        <div>
            <AccountNav />
            <div className="text-center mt-6">
                <Link
                    className="inline-flex items-center gap-2 bg-[#2563eb] text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition-colors"
                    to={'/account/places/new'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-8 flex flex-col gap-6">
                {places.length > 0 && places.map(place => (
                    <div
                        key={place._id}
                        className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow group p-4"
                    >
                        <div className="md:w-40 w-full h-40 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
                            <PlaceImg place={place} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                            <h2 className="text-xl font-semibold mb-1 group-hover:text-[#2563eb] transition-colors">{place.title}</h2>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-3">{place.description}</p>
                            <div className="flex gap-4">
                                <Link
                                    to={`/account/places/${place._id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deletePlace(place._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {places.length === 0 && (
                    <div className="text-center text-gray-500 col-span-full py-12">
                        You have not added any places yet.
                    </div>
                )}
            </div>
        </div>
    );
}