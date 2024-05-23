import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username, password) => {
    // Dummy authentication logic with specific credentials
    if (username === 'nua-admin' && password === 'nua-log') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
