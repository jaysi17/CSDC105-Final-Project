import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
// Used to let other components access that user data (like their name, email, ID)
export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            })
        }
    }, [])

    return(
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}