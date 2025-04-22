import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useGlobalAccess } from "../authentication/GlobalAccessProvider";

export const Card = ({ details }) => {
  const { user } = useGlobalAccess();

  return (
    <div key={details.name}>
      <div className="h-[200px] grid place-content-center w-full bg-black/10 rounded-2xl shadow">
        <img
          src={details.image}
          alt={details.name}
          className="rounded-2xl object-cover bg-white size-32 p-2 shadow object-center"
        />
      </div>
      <h4 className="text-lg mt-3 font-semibold">{details.name}</h4>
      <p className="opacity-50 text-sm my-1 line-clamp-1">
        {details.description}
      </p>
      <Link
        to={user ? "/skills/" + details._id : "/login"}
        className="flex items-center gap-1 text-sm hover:underline underline-offset-4 text-blue-500"
      >
        learn more
        <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
};
