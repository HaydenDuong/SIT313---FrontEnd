import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { lightTheme, darkTheme } from './themes';
import { useAuthState } from 'react-firebase-hooks/auth';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme); // Default to lightTheme
  const [isPremium, setIsPremium] = useState(false);
  const auth = getAuth();
  const [user] = useAuthState(auth); // Get the current authenticated user

  const toggleTheme = () => {
    console.log('Button clicked');
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);

    // Call saveThemeToFirestore here only if the user is premium
    if (isPremium) {
      saveThemeToFirestore(newTheme);
    }
  };

  const saveThemeToFirestore = async (selectedTheme) => {
    if (user && isPremium) {
      const userRef = doc(getFirestore(), 'user', user.uid);
      await setDoc(userRef, { selectedTheme: selectedTheme === darkTheme ? 'dark' : 'light' }, { merge: true });
      console.log('Theme saved successfully!');
    }
  };

  useEffect(() => {
    const fetchTheme = async () => {
      if (user) {
        const userRef = doc(getFirestore(), 'user', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.selectedTheme === 'dark') {
            setTheme(darkTheme);
          }
          setIsPremium(data.isPremium || false);
        }
      }
    };

    fetchTheme();
  }, [user]); // React to changes in the authentication state

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, saveThemeToFirestore, isPremium }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

