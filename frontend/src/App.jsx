import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import StartScreen from "./pages/StartScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CharacterSelect from "./pages/CharacterSelect";
import WorldSelect from "./pages/WorldSelect";
import GameWorld from "./pages/GameWorld";
import Profile from "./pages/Profile";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* TITLE SCREEN */}
          <Route
            path="/"
            element={
              <StartScreen
                onStart={() => {
                  window.location.href = "/login";
                }}
              />
            }
          />

          {/* AUTH */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* CHARACTER SELECTION */}
          <Route
            path="/character"
            element={
              <ProtectedRoute>
                <CharacterSelect
                  onContinue={() => {
                    window.location.href = "/world";
                  }}
                />
              </ProtectedRoute>
            }
          />

          {/* WORLD SELECTION */}
          <Route
            path="/world"
            element={
              <ProtectedRoute>
                <WorldSelect
                  onContinue={() => {
                    window.location.href = "/game";
                  }}
                />
              </ProtectedRoute>
            }
          />

          {/* ACTUAL GAME */}
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GameWorld />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* INVENTORY */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          {/* UNKNOWN URL */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;