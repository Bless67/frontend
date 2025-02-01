import {
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaAngleUp,
    FaAngleDown
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Utils/AuthProvider.jsx";

const Footer = () => {
    const { user } = useAuth();
    const [contactOpen, setContactOpen] = useState(false);
    return (
        <footer className="bg-gray-200 w-full p-2 text-gray-600">
            <p className="text-blue-500 text-2xl font-extrabold">
                <Link to="/">Bicons</Link>
            </p>
            {user && (
                <p className="my-3 text-xl font-bold">
                    <Link to="/check-reservation">Reservation</Link>
                </p>
            )}
            <p className="my-3 text-xl font-bold">About us</p>
            <div className={`${contactOpen && "shadow"}`}>
                <p className="my-3 text-xl font-bold flex items-center gap-3">
                    Contact us
                    <button
                        onClick={() => setContactOpen(!contactOpen)}
                        className="text-3xl bg-blue-500 rounded-full"
                    >
                        {contactOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                </p>
                <div
                    className={` overflow-hidden transition-all duration-500 ease-in-out ${
                        contactOpen ? "mb-3 h-16 opacity-100" : "h-0 opacity-0"
                    } text-gray-600 font-bold p-1 px-4`}
                >
                    <p>Email: bicons70@gmail.com</p>
                    <p>Phone no: 09076543376</p>
                </div>
            </div>
            {/*<p className="my-3 text-xl font-bold">FAQ</p>*/}

            <div className="gap-3 text-4xl flex  items-center">
                <FaWhatsapp />
                <FaFacebook />
                <FaInstagram />
                <FaXTwitter />
            </div>
            <p className="font-bold text-md my-3">
                © 2025 Bicons. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
