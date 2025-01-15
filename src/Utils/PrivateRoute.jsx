import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Utils/AuthProvider.jsx";

const PrivateRoute = ({ children}) => {
    const {user}=useContext(AuthContext)
    return (
    user ? children : <Navigate to="/" />
    );
};

export default PrivateRoute;
