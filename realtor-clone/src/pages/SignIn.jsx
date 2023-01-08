import React from "react";

export default function SignIn() {
  return (
    <section>
      <h1 className="text-center text-3xl font-bold mt-7 mb-10">Sign In</h1>
      <div className="flex justify-center px-3 max-w-6xl mx-auto items-center flex-wrap">
        <div className="md:w-[67%] lg:w-[48%] md:justify-center">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="alt"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 md:mt-20">
          <form>
            <input className="w-full" type="text" />
          </form>
        </div>
      </div>
    </section>
  );
}
