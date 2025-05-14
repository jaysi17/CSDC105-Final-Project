import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    // State hooks for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handles form submission for registration
    async function registerUser(ev) {
        ev.preventDefault(); // Prevent default form submit behavior
        try {
            // Send registration data to backend
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert('Registration Successful. Now you can log in'); // Success message
        } catch (e) {
            alert('Registration failed. Please try again later.'); // Error message
        }
    }

    // Render the registration page UI
    return (
        <div className="min-h-screen flex bg-[#003580]">
            <div className="w-full flex flex-col lg:flex-row">
                {/* Left section: Features and marketing */}
                <div className="flex-1 p-8 lg:p-16 text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-8">Join StayConnect.com</h1>
                    <p className="text-xl mb-12">Start your journey with us and discover the world's best accommodations.</p>
                    
                    {/* Feature highlights */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-400"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                                <p className="text-gray-200">List your property in minutes with our simple interface</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-400"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                                <p className="text-gray-200">Connect with millions of potential guests worldwide</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-400"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                                <p className="text-gray-200">Safe and reliable payment processing for your peace of mind</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right section: Registration form */}
                <div className="w-full lg:w-[600px] p-8 bg-white flex items-center justify-center">
                    <div className="w-full max-w-lg">
                        <h2 className="text-3xl font-bold text-[#262626] mb-4">Create an account</h2>
                        <p className="text-gray-600 mb-8">Join our community of property owners and start earning today</p>
                        
                        {/* Registration form */}
                        <form className="space-y-6" onSubmit={registerUser}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={ev => setName(ev.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
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
                                Get started now
                            </button>
                            {/* Terms and privacy policy notice */}
                            <div className="text-sm text-gray-500 mt-6">
                                By creating an account, you agree to our <a href="#" className="text-[#006CE4] hover:underline">Terms of Service</a> and acknowledge our <a href="#" className="text-[#006CE4] hover:underline">Privacy Policy</a>
                            </div>
                        </form>
                        
                        {/* Link to login page */}
                        <div className="mt-8 pt-8 border-t text-center">
                            <p className="text-gray-600">Already have an account?</p>
                            <Link to={'/login'} className="text-[#006CE4] font-medium hover:underline block mt-2">
                                Sign in to your account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}