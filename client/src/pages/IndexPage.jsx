import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    // State to hold the places data
    const [places, setPlaces] = useState([]);
    // State to hold the selected sort option
    const [sortOption, setSortOption] = useState("oldest"); // Default sort option

    // Fetch places data from the server
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    // Sort places based on the selected option
    // The sort function is called whenever the sortOption changes
    // The sortedPlaces array is created by copying the original places array and sorting it
    const sortedPlaces = [...places].sort((a, b) => {
        if (sortOption === "priceLowToHigh") {
            return a.price - b.price; // Sort by price (low to high)
        } else if (sortOption === "priceHighToLow") {
            return b.price - a.price; // Sort by price (high to low)
        } else if (sortOption === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt); // Sort by oldest
        }
        return 0;
    }, {timestamps: true});

    return (
        <>  
            <div className="flex items-center justify-between flex-col md:flex-row lg:flex-row px-4 mt-10">    
                <div className="mt-8 px-4">
                    <h1 className="font-bold mb-2 text-3xl md:text-4xl lg:text-5xl">Find your next stay</h1>
                    <h3 className="text-xl md:text-2xl lg:text-3xl">Search low prices on hotels, homes, and much more...</h3>
                </div>

                {/* Sorting Dropdown */}
                <div className="mt-4 px-4">
                    <label htmlFor="sort" className="mr-2 font-semibold">Sort by:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded-lg px-3 py-2">
                        <option value="oldest">Oldest</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Places Grid */}
            <div className="mt-10 px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedPlaces.length > 0 && sortedPlaces.map(place => (
                    <Link
                        to={`/place/${place._id}`}
                        key={place._id}
                        className="group relative rounded-3xl overflow-hidden shadow-lg bg-white transition-transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Image Section */}
                        <div className="h-82 w-full bg-gray-200 flex items-center justify-center">
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