import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../AccountNav"

export default function ProfilePage() {
    //  useContext hook to access the UserContext
    //  This allows us to access the user data and the setUser function
    const { ready, user, setUser } = useContext(UserContext)

    //  useState hook to manage the redirect state
    const [redirect, setRedirect] = useState(null)

    //  useParams hook to extract the subpage parameter from the URL
    //  This allows us to determine which subpage to display (profile or places)
    let { subpage } = useParams()

    //  If the subpage is not provided, default it to 'profile'
    if (subpage === undefined) {
        subpage = 'profile';
    }

    //  Function to handle logout
    //  This function sends a POST request to the server to log out the user
    //  After logging out, it sets the redirect state to '/' and clears the user data
    async function logout() {
        await axios.post('/logout')
        setRedirect('/');
        setUser(null)
    }

    //  If the user is not ready (i.e., the user data is still being fetched)
    //  return a loading message
    if (!ready) {
        return 'Loading. . .';
    }

    //  If the user is not logged in and the ready state is true
    //  redirect them to the login page
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }
    //  If the user is logged in and the redirect state is set
    //  redirect them to the specified path
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        // Main container for the profile page
        // This div contains the account navigation and the profile information
        <div className="min-h-screen bg-gray-50 pb-10">
            <AccountNav />
            <div className="max-w-4xl mx-auto mt-8 px-4">
                {subpage === 'profile' && (
                    <div className="flex flex-1 justify-center items-start">
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center mt-8 mx-auto">
                            <div className="mb-4">
                                <div className="text-2xl font-bold mb-1 text-[#2563eb]">{user.name}</div>
                                <div className="text-gray-600 mb-6">{user.email}</div>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full py-3 rounded-xl bg-[#2563eb] text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
                {subpage === 'places' && (
                    <PlacesPage />
                )}
            </div>
        </div>
    )
}