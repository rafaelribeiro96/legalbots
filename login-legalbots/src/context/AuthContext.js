import { createContext, useState } from "react";
import { signIn, signOut } from '../services/authService';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleSignIn = async (email, password, navigation) => {
    const result = await signIn(email, password);
    if (result.success) {
      setUser(result.user);
      navigation.navigate('Home');
    }
    return result;
  };

  const handleSignOut = async () => {
    signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
