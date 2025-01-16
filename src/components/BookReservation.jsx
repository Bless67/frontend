import api from "../Utils/Api.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../Layout/Header.jsx";
import { FaStar } from "react-icons/fa";
import Footer from "../Layout/Footer.jsx";
import { useAuth } from "../Utils/AuthProvider.jsx";

function BookReservation() {
    const { setIsBooked } = useAuth();
    const [email, setEmail] = useState("");
    const [checkin_date, setCheckin_date] = useState("");
    const [checkout_date, setCheckout_date] = useState("");

    const [emailError, setEmailError] = useState("");
    const [checkin_dateError, setCheckin_dateError] = useState("");
    const [checkout_dateError, setCheckout_dateError] = useState("");

    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const roomName = queryParams.get("room_name");
    const roomType = queryParams.get("room_type");

    useEffect(() => {
        setEmailError("");
        setCheckout_dateError("");
        setCheckin_dateError("");
    }, [email, checkin_date, checkout_date]);

    const validateEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        let hasError = false;

        const payload = {
            checkin_date,
            checkout_date
        };

        if (email === "") {
            setEmailError("Email is empty");
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            hasError = true;
        }

        if (checkin_date === "") {
            setCheckin_dateError("Check-in date is empty");
            hasError = true;
        }

        if (checkout_date === "") {
            setCheckout_dateError("Check-out date is empty");
            hasError = true;
        } else if (new Date(checkin_date) >= new Date(checkout_date)) {
            setCheckout_dateError("Check-out date must be after check-in date");
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(`api/reservation/${id}/`, payload, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);
            setIsBooked(true);
            navigate(`/room/${id}`);
        } catch (err) {
            console.error(err);
            if (err.response?.data?.checkin_date) {
                setCheckin_dateError(err.response.data.checkin_date);
            }
            if (err.response?.data?.checkout_date) {
                setCheckout_dateError(err.response.data.checkout_date);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="grow">
                <Header>
                    <IoMdArrowRoundBack
                        onClick={() => navigate(`/room/${id}`)}
                        className="cursor-pointer"
                    />
                </Header>
                <div className="flex justify-start m-2 mt-3">
                    <FaStar className="text-yellow-400 " />
                    <FaStar className="text-yellow-400 ml-1" />
                    <FaStar className="text-yellow-400 ml-1" />
                    <FaStar className="text-yellow-400 ml-1" />
                    <FaStar className="text-gray-200 ml-1" />
                </div>
                <p className="ml-2 mt-3 font-extrabold text-2xl">
                    Room {roomName}
                </p>
                <p className="font-bold ml-2 text-md mt-1">{roomType}</p>
                <div className="rounded-md shadow-md shadow-blue-500 m-2 mt-5 mb-7">
                    <p className="text-2xl font-extrabold text-blue-500 text-center my-2">
                        Book
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mx-6"
                    >
                        <label className="mt-4 font-bold">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            className={`border ${
                                emailError ? "border-red-500" : "border-black"
                            } rounded-md font-bold p-2`}
                        />
                        {emailError && (
                            <p className="font-bold text-red-500 text-sm mt-1">
                                {emailError}
                            </p>
                        )}

                        <label className="mt-4 font-bold">Check-In Date</label>
                        <input
                            type="date"
                            value={checkin_date}
                            onChange={e => setCheckin_date(e.target.value)}
                            className={`border ${
                                checkin_dateError
                                    ? "border-red-500"
                                    : " border-black"
                            } rounded-md font-bold p-1`}
                            min={new Date().toISOString().split("T")[0]}
                        />
                        {checkin_dateError && (
                            <p className="text-red-500 text-sm mt-1 font-bold">
                                {checkin_dateError}
                            </p>
                        )}

                        <label className="mt-4 font-bold">Check-Out Date</label>
                        <input
                            type="date"
                            value={checkout_date}
                            onChange={e => setCheckout_date(e.target.value)}
                            className={`border ${
                                checkout_dateError
                                    ? "border-red-500"
                                    : "border-black"
                            } border-black rounded-md font-bold p-1`}
                            min={new Date().toISOString().split("T")[0]}
                        />
                        {checkout_dateError && (
                            <p className="text-red-500 text-sm mt-1 font-bold">
                                {checkout_dateError}
                            </p>
                        )}

                        <button
                            className="my-7 p-2 rounded-md bg-blue-500 text-white font-bold flex justify-center"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-t-blue-400 border-4 border-white"></div>
                            ) : (
                                "Book"
                            )}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default BookReservation;
