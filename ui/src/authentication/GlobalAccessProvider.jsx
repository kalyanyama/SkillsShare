import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context to store global state
const GlobalAccessContext = createContext();

// Custom hook to use the GlobalAccessContext
export const useGlobalAccess = () => {
  return useContext(GlobalAccessContext);
};

export const GlobalAccessProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function simulates an authentication check (e.g., checking localStorage or cookies)
  const checkAuth = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  useEffect(() => {
    // Simulate authentication check on component mount
    const storedUser = checkAuth();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return (
    <GlobalAccessContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalAccessContext.Provider>
  );
};
