import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { signOut } from "firebase/auth";
import { MdOutlineClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCurrencyFill } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../libs/firebaseConfig";
import useStore from "../store";
import ThemeSwitch from "./switch";
import TransitionWrapper from "./wrappers/transition-wrapper";

const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];

const UserMenu = () => {
  const { user, setCredentials } = useStore((state) => state);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (user?.provider === "google") {
      await handleSocialLogout();
    }
    localStorage.removeItem("user");
    setCredentials(null);
    navigate("/sign-in");
  };

  const handleSocialLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <Menu as="div" className="relative z-50">
      <div>
        <MenuButton className="outline-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer 2xl:w-12 2xl:h-12 bg-gray-700">
              <p className="text-2xl font-bold">
                {user?.firstname?.charAt(0)}
              </p>
            </div>
            <MdOutlineKeyboardArrowDown className="hidden text-2xl text-gray-600 cursor-pointer md:block dark:text-gray-300" />
          </div>
        </MenuButton>
      </div>

      <TransitionWrapper>
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="p-4">
            <div className="flex w-full gap-3 mb-4">
              <div className="flex items-center justify-center text-white bg-gray-700 rounded-full cursor-pointer w-10 h-10 2xl:w-12 2xl:h-12">
                <p className="text-2xl font-bold">
                  {user?.firstname?.charAt(0)}
                </p>
              </div>
              <div className="w-full">
                <p className="text-violet-700">{user?.firstname}</p>
                <span className="text-xs text-gray-500">{user?.country}</span>
              </div>
            </div>

            <MenuItem>
              {({ active }) => (
                <Link to="/settings">
                  <button
                    className={`${
                      active ? "bg-gray-100" : ""
                    } text-gray-900 dark:text-gray-300 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? "bg-red-700/15" : ""
                  } text-red-600 dark:bg-red-600 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </TransitionWrapper>
    </Menu>
  );
};

const MobileSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="md:hidden">
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton className="flex items-center rounded-md font-medium focus:outline-none text-gray-600 dark:text-gray-400">
              {open ? <MdOutlineClose size={26} /> : <IoIosMenu size={26} />}
            </PopoverButton>

            <TransitionWrapper>
              <PopoverPanel className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 bg-white left-1/2 transform -translate-x-1/2 shadow-lg">
                <div className="flex flex-col space-y-2">
                  {links.map(({ label, link }, index) => (
                    <Link to={link} key={index} className="block">
                      <PopoverButton className="text-gray-900 dark:text-gray-300 px-4 py-2 text-lg font-medium">
                        {label}
                      </PopoverButton>
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            </TransitionWrapper>
          </>
        )}
      </Popover>
    </div>
  );
};

export { UserMenu, MobileSidebar };

const Navbar = () => {
    return (
      <nav className=" dark:bg-slate-800">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-2xl font-bold text-violet-700">My-Finance</div>
          <div className="flex items-center gap-4">
            <UserMenu />
            <MobileSidebar />
          </div>
        </div>
      </nav>
    );
  };
  
  // Export the Navbar component
  export default Navbar;