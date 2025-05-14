import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mt-10 px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link
                    to={`/place/${place._id}`}
                    key={place._id}
                    className="group relative rounded-3xl overflow-hidden shadow-lg bg-white transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
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
    );
}