import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //What this function does is it checks is to POST(CREATE) a user from the forms to the API.
    //It also checks if the email is already taken using try-catch error-handling.
    async function registerUser(ev) {
        ev.preventDefault(); //prevent page reloading
        try {
            await axios.post('/register', {
                name,
                email,
                password
            }) //Send request to API
            alert('Regstration Successful. Now you can log in')
        }
        catch (e) {
            alert('Registration failed. Please try again later.')
        }
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-62">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form  className="max-w-md mx-auto" onSubmit={registerUser} >
                    <input type="text" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)}/>
                    <input type="email" 
                        placeholder='your@email.com' 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}/>
                    <button className="login">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link to={'/login'} className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}