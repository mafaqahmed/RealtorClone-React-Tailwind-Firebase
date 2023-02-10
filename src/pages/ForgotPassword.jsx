import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async() => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      toast.success("Request is sent to your email address")
      navigate("/sign-in")
    } catch (error) {
      toast.error("Could not process the request")
    }
  }
  return (
    <section>
      <h1 className="text-center text-3xl font-bold mt-7 mb-10">Forgot Password</h1>
      <div className="flex justify-center px-3 max-w-6xl mx-auto items-center flex-wrap">
        <div className="md:w-[67%] lg:w-[48%] md:justify-center mb-6 lg:mb-0">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="alt"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full rounded border-gray-300 text-xl text-gray-700 bg-white transition ease-in-out"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={onChange}
              type="text"
            />
            <div className="flex justify-between mt-6 mb-6 sm:text-lg text-sm whitespace-nowrap">
              <p>
                Don't have an account?{" "}
                <Link
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                  to="/sign-up"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link to="/sign-in" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Sign in instead</Link>
              </p>
            </div>
            <button className="w-full py-3 text-white bg-blue-600 shadow-md rounded text-sm font-medium uppercase hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out" type="submit">send reset email</button>
            <div className=" my-3 flex items-center before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
              <p className="mx-3 font-semibold text-center">OR</p>
            </div>
            <OAuth/>
          </form>
        </div>
      </div>
    </section>
  );
}
