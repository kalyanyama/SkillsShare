import { Button } from "@headlessui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalAccess } from "../../authentication/GlobalAccessProvider";
import { domainDetails } from "../../site-information";

export const Header = () => {
  const { user, setUser } = useGlobalAccess();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="relative">
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b">
        <nav
          aria-label="Global"
          className="flex items-center justify-between py-3 px-5 lg:px-8"
        >
          <div className="flex lg:flex-1 items-center gap-2">
            <a
              href="/"
              className="-m-1.5 p-1.5 text-lg uppercase font-bold text-accent-foreground flex lg:flex-1 items-center gap-2"
            >
              {domainDetails.name}{" "}
              <span className="text-green-400 font-bold"> .</span>
            </a>
          </div>

          <div className="flex lg:flex-1 lg:justify-end gap-2">
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/tutor/dashboard")}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  Dashboard
                </Button>

                <Button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  Log out
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
