import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false); // State for handling logout animation

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      return error.message;
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { queryParams: { prompt: "select_account" } },
    });
    if (error) {
      return error.message;
    }
  };

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      return error.message;
    }
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      throw error.message;
    }
  };

  const signOut = async () => {
    setLoggingOut(true);
    setTimeout(async () => {
      await supabase.auth.signOut();
      setUser(null);
      setLoggingOut(false); // Reset the animation state after 2 seconds
    }, 2000); // Delay logout for 2 seconds to show animation
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signInWithGoogle, signInWithGitHub, resetPassword, signOut, loggingOut }}>
      {children}
    </AuthContext.Provider>
  );
};
