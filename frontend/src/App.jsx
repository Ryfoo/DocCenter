import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Publish from "./pages/Publish";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import PasswordResetRequest from "./pages/registration/PasswordResetRequest";


function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();


  const hideHeaderRoutes = ["/login", "/signup", "/PasswordReset"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 transition-colors duration-300">

      {!shouldHideHeader && (user ? <protectedHeader /> : <Header />)}

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {!user && <Route path="/login" element={<Login setUser={setUser} />} />}
          {!user && <Route path="/signup" element={<Signup />} />}
          {!user && <Route path="/PasswordReset" element={<PasswordResetRequest />} />}

          {user && <Route path="/profile" element={<Profile />} />}
          {user && <Route path="/publish" element={<Publish />} />}
          {user && <Route path="/settings" element={<Settings />} />}
        </Routes>
      </main>
      {!shouldHideHeader && <Footer />}
    </div>
  );
}

export default App;
