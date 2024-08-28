


import React, { createContext, useState } from 'react';

// Create the context
export const CollectionContext = createContext();

// Create a provider component
export const CollectionProvider = ({ children }) => {
    const [collectionName, setCollectionName] = useState('');

    // Provide the context value to children components
    return (
        <CollectionContext.Provider value={{ collectionName, setCollectionName }}>
            {children}
        </CollectionContext.Provider>
    );
};
