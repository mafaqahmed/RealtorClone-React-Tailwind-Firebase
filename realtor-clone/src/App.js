import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home/>}
            />
            <Route
              exact
              path="/profile"
              element={<Profile/>}
            />
            <Route
              exact
              path="/sign-in"
              element={<SignIn/>}
            />
            <Route
              exact
              path="/sign-up"
              element={<SignUp/>}
            />
            <Route
              exact
              path="/forgot-password"
              element={<ForgotPassword/>}
            />
            <Route
              exact
              path="/offer"
              element={<Offer/>}
            />
          </Routes>
        </Router>
    </>
  );
}

export default App;
