import { useState, useEffect } from "react";
import api from "../Utils/Api.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../Layout/Header.jsx";
import { useNavigate, Link } from "react-router-dom";
const CheckReservation = () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formatDate = dateString => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("api/check-reservation/");
                console.log(response.data);
                setData(response.data);
            } catch (err) {
                console.error(err);
                setErrorMessage("An error occured please try again")
            }
        };
        fetchData();
    }, []);

    const handleCancel = async id => {
        try {
            const response = await api.delete(`api/cancel-reservation/${id}`);

            if (response.status === 200) {
                console.log(response.data);
                setData(data.filter(d => d.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Header>
                <IoMdArrowRoundBack onClick={() => navigate("/")} />
            </Header>
             {errorMessage && (
                <p className="text-center font-bold text-red-500 my-11 text-md">
                    {errorMessage}
                </p>
            )}
            {data && data.length > 0 ? (
                <div>
                    <h1 className="text-center text-gray-600 text-2xl font-extrabold my-3">
                        Reservations
                    </h1>
                    {data.map(res => (
                        <div
                            className="flex justify-center flex-col items-center p-3 shadow-black shadow rounded-md m-1.5 text-gray-600 font-bold"
                            key={res.id}
                        >
                            <p className="text-2xl text-blue-500 underline">
                                <Link to={`/room/${res.room.id}`}>
                                    Room {res.room.room_name}
                                </Link>
                            </p>
                            <p className="my-3">
                                Check-in: {formatDate(res.checkin_date)}
                            </p>
                            <p className="my-3">
                                Check-out: {formatDate(res.checkout_date)}
                            </p>
                            <button
                                onClick={() => handleCancel(res.id)}
                                className="my-3 p-1.5 rounded-md border border-red-500"
                            >
                                cancel reservation
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="font-[450] text-gray-600 flex flex-col items-center">
                    <p className="m-2  mt-3 mb-4 text-md ">
                        You have not book any reservation,click the button to
                        check rooms
                    </p>
                    <button className="bg-blue-500 text-white  p-3 rounded-md">
                        <Link to="/room">Check Rooms</Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckReservation;
