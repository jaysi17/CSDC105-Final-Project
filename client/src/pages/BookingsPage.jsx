import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios"

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
                    <div>
                        {booking.checkIn} to {booking.checkOut}
                    </div>
                ))}
            </div>
        </div>
    )
}