import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"


export default function AccountPage() {
    const {ready, user, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)

    let {subpage} = useParams()
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout')
        setRedirect('/');
        setUser(null)
    }

    if(!ready)  {
        return 'Loading. . .';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    function linkClasses(type=null) {
        let classes = 'py-2 px-6';

        if (type === subpage) {
            classes += ' bg-[#F5385D] text-white rounded-full';
        }

        return classes;
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2">
                <Link to={'/account'} className={linkClasses('profile')}> My Profile </Link>
                <Link to={'/account/bookings'} className={linkClasses('bookings')}> My Bookings </Link>
                <Link to={'/account/places'} className={linkClasses('places')}> My Accomodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-l mt-2 bg-[#F5385D] text-white p-1 rounded-full">Logout</button>
                </div>
            )}
        </div>
    )
}