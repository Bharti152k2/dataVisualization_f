import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/signup.jsx";
import Signin from "./components/signin.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Authentication from "./components/Authentication.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Authentication>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                <Dashboard />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </Authentication>
      </BrowserRouter>
    </>
  );
}

export default App;
