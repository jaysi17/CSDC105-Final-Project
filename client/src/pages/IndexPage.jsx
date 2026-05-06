import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function IndexPage() {
    const { user } = useContext(UserContext);
    // State to hold the places data
    const [places, setPlaces] = useState([]);
    // Distinguishes the initial fetch from an actually-empty result
    // so the empty state doesn't flash before data arrives
    const [loading, setLoading] = useState(true);
    // State to hold the selected sort option
    const [sortOption, setSortOption] = useState("oldest"); // Default sort option

    // Fetch places data from the server
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        }).finally(() => {
            setLoading(false);
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
            <div className="flex items-center justify-between flex-col md:flex-row lg:flex-row px-4 mt-4 md:mt-10">
                <div className="mt-2 md:mt-8 px-4">
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
            {!loading && sortedPlaces.length > 0 && (
                <div className="mt-10 px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {sortedPlaces.map(place => (
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
            )}

            {/* Loading skeleton — same grid shape as the real cards so the layout
                doesn't jump when data arrives */}
            {loading && (
                <div className="mt-10 px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-3xl overflow-hidden shadow-lg bg-white animate-pulse"
                        >
                            <div className="h-82 w-full bg-gray-200" />
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                <div className="h-5 bg-gray-200 rounded w-1/3 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state — only after the fetch resolves with zero results */}
            {!loading && sortedPlaces.length === 0 && (
                <div className="mt-16 mx-4 flex flex-col items-center justify-center text-center bg-white rounded-3xl shadow-lg py-16 px-6">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#2563eb]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">No stays listed yet</h2>
                    <p className="text-gray-600 max-w-md mb-6">
                        Walang nakalistang lugar sa ngayon. Maging unang host at i-share ang iyong stay sa mga bisita!
                    </p>
                    <Link
                        to={user ? '/account/places/new' : '/login'}
                        className="inline-flex items-center gap-2 bg-[#2563eb] text-white py-3 px-6 rounded-full shadow hover:bg-blue-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        {user ? 'Add your first place' : 'Sign in to host'}
                    </Link>
                </div>
            )}
        </>
    );
}