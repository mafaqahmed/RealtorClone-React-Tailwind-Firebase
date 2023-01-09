import React from "react";
import {FcGoogle} from "react-icons/fc";

export default function OAuth() {
  return (
    <button
      className="flex justify-center items-center w-full py-3 text-white bg-red-700 shadow-md rounded text-sm font-medium uppercase hover:bg-red-800 hover:shadow-lg active:bg-red-900 transition duration-150 ease-in-out"
      type="submit"
    >
        <FcGoogle className="mr-2 bg-white rounded-full text-xl"/>
      continue with google
    </button>
  );
}
