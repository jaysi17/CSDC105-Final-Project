import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handlLoginSubmit(ev) {
        ev.preventDefault();

        try {
            await axios.post('/login', {email, password}, {withCredentials: true})
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            alert('Login Failed')
        }
    }

    if (redirect)  { // Redirect to homepage if login in successful
        return <Navigate to={'/'} />
    }
    
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-62">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form  className="max-w-md mx-auto" onSubmit={handlLoginSubmit}>
                    <input 
                        type="email" 
                        placeholder='your@email.com' 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="login">Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}