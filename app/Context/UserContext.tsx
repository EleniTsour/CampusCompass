import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from 'firebase/auth'; // Import User type if using Firebase

// Define the shape of the context
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Context Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => useContext(UserContext);
