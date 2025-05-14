import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import JCLogo from '../assets/jc-icon.png';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password }, { withCredentials: true });
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            alert('Login Failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="min-h-screen flex bg-[#003580]">
            {/* Blue space left */}
            <div className="hidden lg:block lg:w-[calc(50%-300px)]" />
            
            {/* Centered white login section */}
            <div className="w-full lg:w-[600px] bg-white flex items-center">
                <div className="w-full max-w-lg mx-auto p-8">
                    <div className="mb-8 flex justify-center">
                        <img 
                            src={JCLogo}
                            alt="JC Logo"
                            className="h-56 w-auto"
                        />
                    </div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#262626] mb-2">Welcome back</h1>
                        <p className="text-gray-600">Sign in to manage your account</p>
                    </div>
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
                        <button className="w-full py-3 bg-[#006CE4] hover:bg-[#003580] text-white font-medium rounded-md transition-colors">
                            Sign in
                        </button>
                        <div className="text-sm text-center">
                            <a href="#" className="text-[#006CE4] hover:underline">Forgot password?</a>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">Don't have an account yet?</p>
                        <Link to={'/register'} className="text-[#006CE4] font-medium hover:underline">
                            Create an account
                        </Link>
                    </div>
                    <div className="mt-8 pt-8 border-t text-xs text-gray-500 text-center">
                        By signing in, you agree to our <a href="#" className="text-[#006CE4] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#006CE4] hover:underline">Privacy Statement</a>
                    </div>
                </div>
            </div>
            
            {/* Blue space right */}
            <div className="hidden lg:block lg:w-[calc(50%-300px)]" />
        </div>
    );
}