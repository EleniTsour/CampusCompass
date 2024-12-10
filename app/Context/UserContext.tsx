import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth'; // Import User type if using Firebase
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse and set user data if available
        }
      } catch (error) {
        console.error('Error loading user data from AsyncStorage', error);
      }
    };

    loadUserData();
  }, []);

  // Save user data to AsyncStorage when the user state changes
  useEffect(() => {
    const saveUserData = async () => {
      if (user) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user)); // Store the user data
        } catch (error) {
          console.error('Error saving user data to AsyncStorage', error);
        }
      } else {
        // If user logs out, remove the user data from AsyncStorage
        await AsyncStorage.removeItem('user');
      }
    };

    saveUserData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => useContext(UserContext);
