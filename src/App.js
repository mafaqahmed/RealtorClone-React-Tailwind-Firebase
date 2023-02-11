import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<PrivateRoute  />}>
          <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact path="/create-listing" element={<PrivateRoute  />}>
          <Route exact path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route exact path="/category/:categoryType" element={<Category  />} />
          <Route exact path="/edit-listing/:listingId" element={<PrivateRoute  />}>
          <Route exact path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/offers" element={<Offers />} />
          <Route exact path="/create-listing" element={<CreateListing />} />
        </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
