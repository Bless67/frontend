import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-gray-200 w-full p-2 text-gray-600">
            <p className="text-blue-500 text-2xl font-extrabold">
                <Link to="/">Bicons</Link>
            </p>
            <hr className="bg-black" />
            <p className="my-3 text-xl font-bold">About us</p>
            <p className="my-3 text-xl font-bold">Contact us</p>
            <p className="my-3 text-xl font-bold">FAQ</p>

            <div className="gap-3 text-4xl flex  items-center">
                <FaWhatsapp />
                <FaFacebook  />
                <FaInstagram/>
                <FaXTwitter />
            </div>
            <p className="font-bold text-md my-3">
                © 2025 Bicons. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
