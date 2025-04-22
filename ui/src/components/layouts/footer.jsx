import React from "react";
import { domainDetails } from "../../site-information";

export const Footer = () => {
  return (
    <div className="container mx-auto my-6 py-12 sm:py-4 border-t px-5">
      <div className="flex justify-between flex-col gap-2 sm:flex-row text-gray-600">
        <p className="text-sm opacity-70">
          &copy; {new Date().getFullYear()} All rights reserved by{" "}
          <span className="font-semibold">{domainDetails.name}</span>
        </p>
        <p className="text-sm opacity-70 italic">
          Keep building. Keep learning. 🚀
        </p>
      </div>
    </div>
  );
};
