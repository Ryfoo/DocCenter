import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import Login from "./pages/registration/Login";
import Logout from "./pages/registration/Logout";
import Signup from "./pages/registration/Signup";
import PasswordResetRequest from "./pages/registration/PasswordResetRequest";
import ContactPage from "./pages/Contact";
import NotificationsPage from "./pages/Dashboard/Notifications";
import posts from "./data/posts";
import PostDetails from "./pages/PostDetails";
import Privacy from "./pages/settings/Privacy";
import Account from "./pages/settings/Account";
import ChangeEmail from "./pages/settings/ChangeEmail";
import ChangePassword from "./pages/settings/ChangePassword";
import NavBar from "./components/NavBar";
import Profile from "./pages/Dashboard/Profile"
import CreatePost from "./pages/Dashboard/CreatePost"
import EditPost from "./pages/Dashboard/EditPost"
import SavedPosts from "./pages/Dashboard/SavedPosts"
import MyPosts from "./pages/Dashboard/MyPosts"
function App() {
  const location = useLocation();

  const hiddenRoutes = ["/login", "/signup", "/PasswordReset"];
  const hidden = hiddenRoutes.includes(location.pathname);

  const [user, setUser] = useState({
    id: Date.now(),
    username: "TestUser",
    email: "testuser2025@test.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    savedPosts: [],
    createdPosts: [],
    coAuthoredPosts: [],
    preferences: {
      darkMode: true,
      notifications: true,
    },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 transition-colors duration-300 overflow:none">
      {!hidden && <Header user={user} AuthState={isLoggedIn} />}

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home Posts={posts} User={user} AuthState={isLoggedIn} />} />
          {/* Flat pages */}
          <Route path="/post/:id" element={<PostDetails user={user} AuthState={isLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Dynamic user profiles */}
          <Route path="/profile/:username" element={<Profile User={user} AuthState={isLoggedIn} />} />
          {/* Auth pages */}
          <Route path="/login" element={<Login setUser={setUser} setAuthState={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout setUser={setUser} setAuthState={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passwordReset" element={<PasswordResetRequest />} />

          {/* Protected routes */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <NotificationsPage User={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <CreatePost user={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <MyPosts user={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <EditPost user={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <SavedPosts user={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <Dashboard User={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute AuthState={isLoggedIn}>
                <Settings User={user} AuthState={isLoggedIn} />
              </ProtectedRoute>
            }
          >
            <Route path="privacy" element={<Privacy />} />
            <Route path="account" element={<Account />} />
            <Route path="email" element={<ChangeEmail />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </main>

      {(!hidden && user && isLoggedIn) &&
        < NavBar user={user} />
      }
      {!hidden && <Footer />}
    </div >
  );
}

export default App;
