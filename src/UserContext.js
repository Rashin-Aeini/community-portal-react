import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        token: ""
    });

    const value = {
        user, // ===> value of context
        setUser // ===> function for changing context value
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

const useUser = () => {
    
    const context = useContext(UserContext);

    if(context === undefined){
        throw new Error();
    }

    return context;
}

export {
    useUser,
    UserProvider
}