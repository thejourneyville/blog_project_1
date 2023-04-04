import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        setLoggedIn(true);
        console.log("logged in");
    };

    const logout = () => {
        setLoggedIn(false);
        console.log("logged out");
    };

    const value = { login, logout, loggedIn };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
