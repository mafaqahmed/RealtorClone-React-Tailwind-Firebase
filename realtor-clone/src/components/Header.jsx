import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathCheck = (route) =>{
    if(route === location.pathname) return true
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div >
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="Logo"
            className="h-5 cursor-pointer"
            onClick={()=>{navigate("/")}}
          />
        </div>
        <div>
          <ul className="flex  space-x-10">
            <li className={`py-3 text-sm text-gray-500 cursor-pointer border-b-2 ${pathCheck("/") && "border-red-900 text-black"}`} onClick={()=>{navigate("/")}}>Home</li>
            <li className={`py-3 text-sm text-gray-500 cursor-pointer border-b-2 ${pathCheck("/offers") && "border-red-900 text-black"}`} onClick={()=>{navigate("/offers")}}>Offers</li>
            <li className={`py-3 text-sm text-gray-500 cursor-pointer border-b-2 ${pathCheck("/sign-in") && "border-red-900 text-black"}`} onClick={()=>{navigate("/sign-in")}}>Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
