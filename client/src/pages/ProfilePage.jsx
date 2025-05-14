import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../AccountNav"

export default function ProfilePage() {
    const { ready, user, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout')
        setRedirect('/');
        setUser(null)
    }

    if (!ready) {
        return 'Loading. . .';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
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