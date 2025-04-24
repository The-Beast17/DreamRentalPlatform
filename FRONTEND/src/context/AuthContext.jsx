import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role")||"");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid user JSON in localStorage:", error);
        localStorage.removeItem('user');
      }
    } else {
      localStorage.removeItem('user');
    }
  }, []);
  
  

  // Update localStorage whenever user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  // Optional: Keep role in sync
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated, setIsAuthenticated,
      role, setRole,
      currentUser, setCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
