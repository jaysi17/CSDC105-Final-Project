import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    // State to hold the places data
    const [places, setPlaces] = useState([]);
    // useEffect hook to fetch places data from the server
    // The empty dependency array [] means this effect runs once when the component mounts
    useEffect(() => {
        // Fetch places data from the server    
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <>
            <div className="mt-8 px-4">
                <h1 className="text-5xl font-bold mb-2 ">Find your next stay</h1>
                <h3 className="text-2xl">Search low prices on hotels, homes and much more...</h3>
            </div>
            <div className="mt-10 px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.length > 0 && places.map(place => (
                    // Link to the place details page
                    // The key prop is used to uniquely identify each place in the list
                    <Link
                        to={`/place/${place._id}`}
                        key={place._id}
                        className="group relative rounded-3xl overflow-hidden shadow-lg bg-white transition-transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Image section */}
                        <div className="h-56 w-full bg-gray-200 flex items-center justify-center">
                            {place.photos?.[0] ? (
                                <img
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    src={
                                        place.photos[0].startsWith('http')
                                            ? place.photos[0]
                                            : `http://localhost:4000/uploads/${place.photos[0]}`
                                    }
                                    alt={place.title}
                                />
                            ) : (
                                <span className="text-gray-400">No Image</span>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-lg font-semibold text-white truncate">{place.title}</h3>
                            <p className="text-sm text-gray-200 truncate">{place.address}</p>
                            <div className="mt-2">
                                <span className="text-xl font-bold text-white">₱{place.price}</span>
                                <span className="text-sm text-gray-200 ml-1">/ day</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}