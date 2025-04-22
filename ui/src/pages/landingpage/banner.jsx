import React from "react";

export const Banner = () => {
  return (
    <div className=" container mx-auto space-y-6 py-12" id="">
      <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
        Learn something new every day. Ask freely. Grow together.
      </h1>
      <p className="text-lg sm:text-xl text-gray-300">
        Join a community where questions are welcome and learning has no limits.
      </p>
      <a
        href="#"
        className="inline-block rounded-full bg-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-blue-500 transition"
      >
        Start Exploring
      </a>
    </div>
  );
};
