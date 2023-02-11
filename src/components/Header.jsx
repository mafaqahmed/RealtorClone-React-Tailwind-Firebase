import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const [mobileMenu, setMobileMenu] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathCheck = (route) => {
    if (route === location.pathname) return true;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-3 max-w-6xl mx-auto relative">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="Logo"
            className="h-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="sm:hidden py-3 text-2xl">
          <span className="sr-only">Open menu</span>
          <BiMenu
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          />
        </div>
        <div className="hidden sm:block">
          <ul className="flex  space-x-10">
            <li
              className={`py-3 text-sm text-gray-500 cursor-pointer border-b-2 ${
                pathCheck("/") && "border-red-900 text-black"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm text-gray-500 cursor-pointer border-b-2 ${
                pathCheck("/offers") && "border-red-900 text-black"
              }`}
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm text-gray-500 cursor-pointer border-b-2 ${
                (pathCheck("/sign-in") || pathCheck("/profile")) &&
                "border-red-900 text-black"
              }`}
              onClick={() => {
                navigate("/profile");
              }}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </div>
      {mobileMenu && <ul className="flex flex-col sm:hidden">
            <li
              className={`py-3 px-3 text-sm text-gray-400 cursor-pointer border-b-2 ${
                pathCheck("/") && "border-b-red-900 text-black"
              }`}
              onClick={() => {
                navigate("/");
                setMobileMenu(false);
              }}
            >
              Home
            </li>
            <li
              className={`py-3 px-3 text-sm text-gray-400 cursor-pointer border-b-2 ${
                pathCheck("/offers") && "border-b-red-900 text-black"
              }`}
              onClick={() => {
                navigate("/offers");
                setMobileMenu(false);
              }}
            >
              Offers
            </li>
            <li
              className={`py-3 px-3 text-sm text-gray-400 cursor-pointer border-b-2 ${
                (pathCheck("/sign-in") || pathCheck("/profile")) &&
                "border-b-red-900 text-black"
              }`}
              onClick={() => {
                navigate("/profile");
                setMobileMenu(false);
              }}
            >
              {pageState}
            </li>
          </ul>}
    </header>
  );
}
