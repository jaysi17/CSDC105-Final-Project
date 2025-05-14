import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();

        try {
            const { data } = await axios.post('/login', { email, password }, { withCredentials: true })
            setUser(data)
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            alert('Login Failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 relative">
            {/* Vertical road effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-16 h-full bg-gradient-to-b from-gray-900 via-gray-700 to-transparent flex flex-col items-center justify-center">
                    <div className="w-3 h-2/3 bg-yellow-400 rounded-full shadow-lg animate-pulse mt-20"></div>
                </div>
            </div>
            <div className="relative z-10 bg-white/95 rounded-none md:rounded-3xl shadow-2xl px-4 md:px-10 py-12 w-full max-w-md flex flex-col items-center">
                {/* Car icon */}
                <div className="mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" className="w-16 h-16 text-[#2563eb] mx-auto">
                        <rect x="8" y="20" width="32" height="12" rx="4" fill="#2563eb" />
                        <rect x="12" y="16" width="24" height="8" rx="3" fill="#fff" />
                        <circle cx="14" cy="34" r="4" fill="#222" />
                        <circle cx="34" cy="34" r="4" fill="#222" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-[#2563eb] mb-2 text-center tracking-wide">CarBook Login</h1>
                <p className="text-gray-600 mb-6 text-center">Welcome back, driver! Please sign in to your garage.</p>
                <form className="w-full" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 outline-none transition"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 outline-none transition"
                    />
                    <button
                        className="w-full py-3 rounded-xl bg-[#2563eb] text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                        </svg>
                        Start Your Engine
                    </button>
                    <div className="text-center py-4 text-gray-500">
                        Don't have an account yet?{' '}
                        <Link to={'/register'} className="underline text-[#2563eb] font-medium hover:text-blue-800 transition-colors">
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}