import { createContext, useContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [dataStore, setDataStore] = useState({});

  const value = { isAdmin, setIsAdmin};

  // --- New Generic Data Management Functions ---

  // Retrieves data for a specific key
  const getData = (key) => {
    return dataStore[key];
  };

  // Sets or updates data for a specific key
  const setData = (key, value) => {
    setDataStore(prevDataStore => ({
      ...prevDataStore,
      [key]: value
    }));
  };

  // Deletes data for a specific key
  const deleteData = (key) => {
    setDataStore(prevDataStore => {
      const { [key]: deletedKey, ...restOfData } = prevDataStore;
      return restOfData;
    });
  };

  // --- Merge everything into the context value ---
  const contextValue = { 
    ...value, 
    dataStore, 
    getData, 
    setData, 
    deleteData 
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
