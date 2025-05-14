import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
// Used to let other components access that user data (like their name, email, ID)
export const UserContext = createContext({});

// Create a provider component
// This component will wrap around the parts of the app that need access to user data
export function UserContextProvider({children}) {
    // useState hook to manage the user state
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // useEffect hook to fetch the user data when the component mounts
    useEffect(() => {
        if (!user) {
            // Make a GET request to fetch the user data
            // If the user is logged in, the server will respond with their data
            axios.get('/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            })
        }
    }, [])

    return(
        // Provide the user data and the setUser function to the rest of the app
        // The UserContext.Provider component allows other components to access the user data
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}