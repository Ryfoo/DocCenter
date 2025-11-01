import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import PasswordResetRequest from "./pages/registration/PasswordResetRequest";
import ContactPage from "./pages/Contact";
import NotificationsPage from "./pages/Dashboard/Notifications";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/signup", "/PasswordReset"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  const testUser = {
    name: "John Doe",
    avatarUrl: "/assets/default-avatar.png",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 transition-colors duration-300">
      {!shouldHideHeader && <Header user={user || testUser} />}

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/PasswordReset" element={<PasswordResetRequest />} />

          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/notifications" element={<NotificationsPage user={user || testUser} />} />
          <Route path="/settings" element={<Settings user={user || testUser} />} />
        </Routes>
      </main>

      {!shouldHideHeader && <Footer />}
    </div>
  );
}

export default App;
