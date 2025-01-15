import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Utils/AuthProvider.jsx";
import { jwtDecode } from "jwt-decode";
import { FaHome } from "react-icons/fa";

const Login = () => {
    const { setUser, setIsLogged } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUsernameError("");
        setPasswordError("");
    }, [username, password]);

    const handleLogin = async e => {
        e.preventDefault();
        let hasError = false;

        if (username === "") {
            setUsernameError("Username is empty");
            hasError = true;
        }
        if (password === "") {
            setPasswordError("Password is empty");
            hasError = true;
        }
        if (hasError) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username,
                    password
                }
            );
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            setUser(jwtDecode(localStorage.getItem("accessToken")));
            setIsLogged(true)
            console.log(response.data);
            navigate("/");
        } catch (err) {
            console.error(err);
            if (err.response.status === 401) {
                setPasswordError("Invalid credentials");
                setUsernameError("Invalid credentials");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="rounded-md shadow shadow-blue-500 mx-3 mt-14 py-3">
                <p className="text-blue-500 text-center font-extrabold text-2xl mb-1.5">
                    Signin
                </p>

                <form onSubmit={handleLogin} className="flex flex-col  px-6">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={`${
                            usernameError
                                ? "border border-red-500"
                                : "border border-black"
                        } p-1.5 rounded-xl font-bold mt-3`}
                    />
                    {usernameError && (
                        <p className="text-center font-bold text-red-500 text-sm">
                            {usernameError}
                        </p>
                    )}

                    <input
                        className={`${
                            passwordError
                                ? "border border-red-500"
                                : "border border-black"
                        } p-1.5 rounded-xl font-bold mt-8`}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <p className="text-center text-sm font-bold text-red-500">
                            {passwordError}
                        </p>
                    )}
                    <label className="flex items-center font-bold mt-4">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-1"
                        />
                        Show password
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex justify-center  text-white p-1.5 rounded-md font-bold mb-3 mt-8 mx-6 ${
                            loading ? "bg-blue-400" : "bg-blue-500"
                        }`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-t-blue-400 border-4 border-white"></div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="font-bold text-center text-gray-400">
                    Forget Password?
                </p>
                <p className="text-center font-bold mt-5">
                    Not a member?
                    <Link className="text-gray-400" to="/register">
                        Signup
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
