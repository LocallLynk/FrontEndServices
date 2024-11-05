import React, { useState, useContext } from 'react';

const UserContext = React.createContext({
    user: { name: '', isLoggedIn: false },
    setUser: () => {}
});

export const useUser = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', isLoggedIn: false });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
