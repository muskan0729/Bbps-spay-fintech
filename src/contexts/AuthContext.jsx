// import { createContext, useContext, useState, useEffect } from "react";
// import useGet from "../hooks/useGet";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const { data, loading, error, fetchData } = useGet();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     fetchData("/auth/me", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   }, []);

//   // When the API returns user data, update context
//   useEffect(() => {
//     if (data) {
//       setUser(data);
//     }
//   }, [data]);

//   // If token is invalid → remove it
//   useEffect(() => {
//     if (error) {
//       localStorage.removeItem("token");
//     }
//   }, [error]);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  const [dataStore, setDataStore] = useState({});

  // On refresh: load token and default user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({
        name: "Dummy User",
        role: "user",
      });
    }
  }, []);

  // --- Authentication Functions ---

  const login = ({ username }) => {
    localStorage.setItem("token", "dummy_token_123");

    const fakeUser = {
      name: username,
      role: "user",
    };

    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // --- Generic Data Management Functions (from AdminContext) ---

  // Get value by key
  const getData = (key) => dataStore[key];

  // Set/update value by key
  const setData = (key, value) => {
    setDataStore((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Delete a key/value
  const deleteData = (key) => {
    setDataStore((prev) => {
      const { [key]: removed, ...rest } = prev;
      return rest;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        dataStore,
        getData,
        setData,
        deleteData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
