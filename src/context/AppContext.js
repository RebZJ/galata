// AppContext.js

import React, { createContext, useState, useContext } from 'react';

// Create the Context
const AppContext = createContext();

// Create a Context Provider Component
export const AppProvider = ({ children }) => {

    const [userType, setUserType] = useState(null);


    // Provide the value to the components
    const contextValue = {
        userType,
        setUserType

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to consume the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};
