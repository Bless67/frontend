import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Utils/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
const Sidebar = ({ isOpen, setIsOpen }) => {
    const { user, logout } = useAuth();
    const handleClose = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 bg-gray-800 h-screen  pr-3 pt-4 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 z-10 w-[85%]`}
            >
                <div className="w-full mb-3 flex justify-between px-1.5  ">
                    <p className="text-blue-500 text-2xl font-extrabold">
                        Bicons
                    </p>
                    {isOpen && (
                        <FaTimes
                            className="text-white text-2xl"
                            onClick={handleClose}
                        />
                    )}
                </div>
                {user && (
                    <p className="text-white ml-2 text font-bold mb-10">
                        <Link to="/profile">{user.username}</Link>
                    </p>
                )}

                <hr />
                <div className="">
                    <p className="text-xl ml-2 mt-8 text-white font-bold">
                        <Link to="/room">Rooms</Link>
                    </p>

                    {user && (
                        <p className="text-xl ml-2 mt-5 text-white font-bold">
                            <Link to="/check-reservation">Reservations</Link>
                        </p>
                    )}

                    <p className="text-xl ml-2 mt-5 text-white font-bold">
                        Contacts
                    </p>

                    <p className="text-xl ml-2 mt-5 text-white font-bold">
                        <Link>About</Link>
                    </p>

                    {user && (
                        <p className="text-xl ml-2 mt-5 mb-10 text-white font-bold">
                            <Link to="/profile">Profile</Link>
                        </p>
                    )}
                    <hr />
                    <div className="pl-3 pt-10">
                        {user ? (
                            <button
                                onClick={() => logout()}
                                className="  font-bold bg-white text-blue-500 rounded-md my-3 px-2 py-1"
                            >
                                Logout
                            </button>
                        ) : (
                            <button className="font-bold bg-white text-blue-500 rounded-md my-3 px-2 py-1">
                                <Link to="/login">Login</Link>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
