// AppContext.js

import React, { createContext, useState, useContext } from 'react';

// Create the Context
const AppContext = createContext();

// Create a Context Provider Component
export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const login = (newUserId) => {
        setUserId(newUserId);
    };

    const logout = () => {
        setUserId(null);
    };

    // Provide the value to the components
    const contextValue = {
        userId,
        login,
        logout,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to consume the context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within a AppProvider');
    }
    return context;
};
