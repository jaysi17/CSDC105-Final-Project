import { data, Link, useParams } from "react-router-dom"
import AccountNav from "../AccountNav";
import { useEffect } from "react";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(({data}) => {
            setPlaces(data);
        })
    })
    return(
        <div>
            <AccountNav/>
                <div className="text-center">
                LIST OF ALL ADDED PLACES <br />

                <Link className="inline-flex gap-1 bg-[#F5385D] text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
        </div>
    )
}