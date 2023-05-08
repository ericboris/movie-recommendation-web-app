import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [accountAddress, setAccountAddress] = useState(null);

    return (
        <UserContext.Provider value={{ accountAddress, setAccountAddress }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
