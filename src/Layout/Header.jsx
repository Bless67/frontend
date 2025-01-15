
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Utils/AuthProvider.jsx";
import { useContext } from "react";

const Header = ({ children,isOpen }) => {
    const { user, setUser ,logout} = useAuth()
    const navigate = useNavigate();

    return (
        <header className="bg-gray-200 flex flex-row justify-between ">
            <button className="ml-2 text-2xl">{children}</button>
            <Link to="/">
                <p className="p-3 text-2xl font-extrabold font-sans text-blue-500">
                    Bicons
                </p>
            </Link>
            {user ? (
                <button
                disabled={isOpen}
                    className="mr-2 font-bold bg-white text-blue-500 rounded-md my-3 px-2"
                    onClick={()=>logout()}
                >
                    Logout
                </button>
            ) : (
                <button className="mr-2 font-bold bg-white text-blue-500 rounded-md my-3 px-2">
                    <Link to="/login"> Login</Link>
                </button>
            )}
        </header>
    );
};

export default Header;
