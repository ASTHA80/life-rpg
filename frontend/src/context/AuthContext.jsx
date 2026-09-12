import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiRequest } from "../api/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("study_game_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await apiRequest("/auth/me");
        setUser(currentUser);
      } catch {
        localStorage.removeItem("study_game_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(email, password) {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    localStorage.setItem(
      "study_game_token",
      data.access_token
    );

    const currentUser = await apiRequest("/auth/me");

    setUser(currentUser);

    return currentUser;
  }

  async function signup(email, password) {
    await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return login(email, password);
  }

  function logout() {
    localStorage.removeItem("study_game_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// This file intentionally contains both AuthProvider and useAuth.
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };