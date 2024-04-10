import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Otp from "./pages/Otp";
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Profile from "./pages/Profile";
import Table from "./components/Table";
import EmailVerification from "./pages/EmailVerification";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailVerification" element={<EmailVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
