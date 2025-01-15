import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() =>
        localStorage.getItem("accessToken")
            ? jwtDecode(localStorage.getItem("accessToken"))
            : null
    );
    const [isLogged, setIsLogged] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        navigate("/");
        setIsLoggedOut(true);
    };

    return (
        <AuthContext.Provider
            value={{
                logout: logout,
                user: user,
                setUser: setUser,
                isLogged: isLogged,
                setIsLogged: setIsLogged,
                isLoggedOut: isLoggedOut,
                setIsLoggedOut: setIsLoggedOut,
                isBooked:isBooked,
                setIsBooked:setIsBooked
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
