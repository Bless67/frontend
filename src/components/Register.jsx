import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Utils/AuthProvider.jsx";
import { jwtDecode } from "jwt-decode";
import { FaHome } from "react-icons/fa";

const Register = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUsernameError("");
        setPasswordError("");
        setPassword2Error("");
        setEmailError("");
    }, [username, password, email, password2]);

    const handleSignup = async e => {
        e.preventDefault();
        let hasError = false;
        setLoading(true);
        
        if (password !== password2) {
            setPasswordError("Password not the same");
            setPassword2Error("Password not the same");
            hasError = true;
        }
        if (username === "") {
            setUsernameError("Username is empty");
            hasError = true;
        }
        if (email === "") {
            setEmailError("Email is empty");
            hasError = true;
        }
        if (password === "") {
            setPasswordError("Password is empty");
            hasError = true;
        }
        if (password2 === "") {
            setPassword2Error("Password is empty");
            hasError = true;
        }
        if (hasError) {
          setLoading(false)
            return;
        }
        
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register/",
                {
                    username,
                    password,
                    email
                }
            );

            console.log(response.data);
            navigate("/login");
        } catch (err) {
            console.error(err);
            if (err.response.data.username) {
                setUsernameError("Username already exist");
            }
            if (err.response.data.email) {
                setEmailError("Email already exist");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="rounded-md shadow shadow-blue-500 mx-3 mt-14 py-3">
                <p className="text-blue-500 text-center font-extrabold text-2xl mb-1.5">
                    Signup
                </p>

                <form onSubmit={handleSignup} className="flex flex-col  px-6">
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
                        <p className="text-center text-sm font-bold text-red-500">
                            {usernameError}
                        </p>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`${
                            emailError
                                ? "border border-red-500"
                                : "border border-black"
                        } p-1.5 rounded-xl font-bold mt-8`}
                    />
                    {emailError && (
                        <p className="text-center font-bold text-red-500 text-sm">
                            {emailError}
                        </p>
                    )}

                    <input
                        className={`${
                            passwordError
                                ? "border border-red-500"
                                : "border border-black"
                        } p-1.5 rounded-xl font-bold mt-8`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <p className="text-center text-sm font-bold text-red-500">
                            {passwordError}
                        </p>
                    )}
                    <input
                        className={`${
                            password2Error
                                ? "border border-red-500"
                                : "border border-black"
                        } p-1.5 rounded-xl font-bold mt-8`}
                        type="password"
                        placeholder="Password Again"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                    {password2Error && (
                        <p className="text-center text-sm font-bold text-red-500">
                            {password2Error}
                        </p>
                    )}
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
                            "Register"
                        )}
                    </button>
                </form>

                <p className="font-bold text-center text-gray-400">
                    Forget Password?
                </p>
                <p className="text-center font-bold mt-5">
                    Already have an account?
                    <Link className="text-gray-400" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
