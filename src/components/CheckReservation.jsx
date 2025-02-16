import { useState, useEffect } from "react";
import api from "../Utils/Api.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import Modal from "../Layout/Modal.jsx";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
const CheckReservation = () => {
    const [data, setData] = useState(null);
  
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const [cancelId, setCancelId] = useState(null);
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
            setLoading(true);
            try {
                const response = await api.get("api/check-reservation/");

                setData(response.data);
               
                console.log(response.data);
              
            } catch (err) {
                console.error(err);
                setErrorMessage("An error occured please try again");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isCancel) {
            toast.success("Reservation cancelled successful", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide
            });
            return () => setIsCancel(false);
        }
    }, [isCancel]);

    const handleCancel = async id => {
        try {
            const response = await api.delete(`api/cancel-reservation/${id}/`);

            if (response.status === 200) {
                console.log(response.data);
                setData(data.filter(d => d.id !== id));
                setIsCancel(true);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleCancelClick = (id ,is_expired)=> {
      if(is_expired){
        handleCancel(id)
        setIsModalOpen(false)
      }
      else{
        setCancelId(id);
        setIsModalOpen(true);
      }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="grow">
                <ToastContainer />
                <Header>
                    <IoMdArrowRoundBack onClick={() => navigate("/")} />
                </Header>
                {errorMessage && (
                    <p className="text-center font-bold text-red-500 my-11 text-md">
                        {errorMessage}
                    </p>
                )}
                {loading && (
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 mx-auto mt-[100px] border-blue-500"></div>
                )}

                <div>
                    {data && data.length > 0 && !loading ? (
                        <div>
                            <Modal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                cancelId={cancelId}
                                setCancelId={setCancelId}
                                handleCancel={handleCancel}
                            />
                            <h1 className="text-center text-gray-600 text-2xl font-extrabold my-3">
                                Reservations
                            </h1>

                            {data.map(res => (
                                <div
                                    className="flex justify-center flex-col items-center p-3 shadow-black shadow rounded-md m-1.5 text-gray-600 font-bold mb-8 z-10"
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
                                        Check-out:{" "}
                                        {formatDate(res.checkout_date)}
                                    </p>
                                    <p className={`text-xl text-center font-bold ${res.is_expired?"text-red-500":"text-green-500"}`}>
                                        {res.is_expired ? "Epired" : "Active"}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleCancelClick(res.id,res.is_expired)
                                        }
                                        className="my-3 p-1.5 rounded-md border border-red-500"
                                    >
                                        {res.is_expired
                                            ? "Delete reservation"
                                            : "Cancel reservation"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        data && (
                            <div className="font-[450] text-gray-600 flex flex-col items-center">
                                <p className="m-2  mt-3 mb-4 text-md ">
                                    You have not book any reservation,click the
                                    button to check rooms
                                </p>
                                <button className="bg-blue-500 text-white  p-3 rounded-md">
                                    <Link to="/room">Check Rooms</Link>
                                </button>
                            </div>
                        )
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckReservation;
