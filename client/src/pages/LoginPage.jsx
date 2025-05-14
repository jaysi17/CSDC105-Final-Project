import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import JCLogo from '../assets/jc-icon.png';

export default function LoginPage() {
    // State hooks for form fields and redirect
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    // Handles form submission for login
    async function handleLoginSubmit(ev) {
        ev.preventDefault(); // Prevent default form submit behavior
        try {
            // Send login request to backend with email and password
            const { data } = await axios.post('/login', { email, password }, { withCredentials: true });
            setUser(data); // Set user context with returned user data
            alert('Login Successful');
            setRedirect(true); // Trigger redirect to home page
        } catch (e) {
            alert('Login Failed'); // Show error if login fails
        }
    }

    // If login is successful, redirect to home page
    if (redirect) {
        return <Navigate to={'/'} />;
    }

    // Render the login page UI
    return (
        <div className="min-h-screen flex bg-[#003580]">
            {/* Blue space left for large screens */}
            <div className="hidden lg:block lg:w-[calc(50%-300px)]" />
            
            {/* Centered white login section */}
            <div className="w-full lg:w-[600px] bg-white flex items-center">
                <div className="w-full max-w-lg mx-auto p-8">
                    {/* Logo at the top */}
                    <div className="mb-8 flex justify-center">
                        <img 
                            src={JCLogo}
                            alt="JC Logo"
                            className="h-56 w-auto"
                        />
                    </div>
                    {/* Welcome message */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#262626] mb-2">Welcome back</h1>
                        <p className="text-gray-600">Sign in to manage your account</p>
                    </div>
                    {/* Login form */}
                    <form className="w-full space-y-4" onSubmit={handleLoginSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* Submit button */}
                        <button className="w-full py-3 bg-[#006CE4] hover:bg-[#003580] text-white font-medium rounded-md transition-colors">
                            Sign in
                        </button>
                        {/* Forgot password link */}
                        <div className="text-sm text-center">
                            <a href="#" className="text-[#006CE4] hover:underline">Forgot password?</a>
                        </div>
                    </form>
                    {/* Link to registration page */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">Don't have an account yet?</p>
                        <Link to={'/register'} className="text-[#006CE4] font-medium hover:underline">
                            Create an account
                        </Link>
                    </div>
                    {/* Terms and privacy notice */}
                    <div className="mt-8 pt-8 border-t text-xs text-gray-500 text-center">
                        By signing in, you agree to our <a href="#" className="text-[#006CE4] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#006CE4] hover:underline">Privacy Statement</a>
                    </div>
                </div>
            </div>
            
            {/* Blue space right for large screens */}
            <div className="hidden lg:block lg:w-[calc(50%-300px)]" />
        </div>
    );
}