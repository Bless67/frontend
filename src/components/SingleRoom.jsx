import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../Utils/Api.js";
import { useAuth } from "../Utils/AuthProvider.jsx";
import { FaStar, FaAngleUp, FaAngleDown } from "react-icons/fa";
import Carousel from "../Layout/Carousel.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import { ToastContainer, toast, Slide } from "react-toastify";

function SingleRoom() {
    const { user, isBooked, setIsBooked } = useAuth();

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erroMessage, setErrorMessage] = useState(null);
    const [isFeatureOpen, setIsFeatureOpen] = useState(false);
    const [isAmenityOpen, setIsAmenityOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDtata = async () => {
            setLoading(true);
            try {
                const response = await api.get(`api/room/${id}`);
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
                setErrorMessage("An Error occured,please try again");
            } finally {
                setLoading(false);
            }
        };
        fetchDtata();
    }, []);

    useEffect(() => {
        if (isBooked) {
            toast.success("Reservation booked successful", {
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
        }
        return () => setIsBooked(false);
    }, [isBooked]);
    return (
        <>
            <ToastContainer />
            <Header>
                <IoMdArrowRoundBack onClick={() => navigate("/room")} />
            </Header>
            <div className="mx-1 text-gray-600">
                {loading && (
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 mx-auto mt-44 border-blue-500"></div>
                )}
                {erroMessage && (
                    <p className="text-center font-bold text-red-500 my-11 text-md">
                        {erroMessage}
                    </p>
                )}
                {data && (
                    <div className="w-full">
                        <div className="flex justify-start m-2 mt-3">
                            <FaStar className="text-yellow-400 " />
                            <FaStar className="text-yellow-400 ml-1" />
                            <FaStar className="text-yellow-400 ml-1" />
                            <FaStar className="text-yellow-400 ml-1" />
                            <FaStar className="text-gray-200 ml-1" />
                        </div>
                        <h3 className="text-3xl ml-2 font-extrabold  my-1.5">
                            Room {data.room_name}
                        </h3>
                        <h3 className="text-xl font-bold my-1.5 ml-2">
                            {data.room_type}
                        </h3>
                        <h3 className="font-bold text-xl ml-2">
                            ${data.room_price}
                        </h3>

                        <Carousel images={data.images} />
                        
                            <h2 className="text-2xl my-1.5 font-bold flex justify-start items-center mt-8">
                                Amenities
                                <button
                                    onClick={() =>
                                        setIsAmenityOpen(!isAmenityOpen)
                                    }
                                    className=" text-gray-600 ml-4 text-3xl bg-blue-500  px-1 rounded-full"
                                >
                                    {isAmenityOpen ? (
                                        <FaAngleUp />
                                    ) : (
                                        <FaAngleDown />
                                    )}
                                </button>
                            </h2>
                            {data.room_amenities.map(amenity => (
                                <div
                                    key={amenity.id}
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                        isAmenityOpen
                                            ? "max-h-40 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <li>{amenity.amenity_name}</li>
                                </div>
                            ))}
                        

                        <h2 className="text-2xl my-4 mt-7 font-bold flex justify-start items-center">
                            Features
                            <button
                                onClick={() => setIsFeatureOpen(!isFeatureOpen)}
                                className="ml-7 text-gray-600 text-blue-500 rounded-full bg-blue-500 px-1 text-3xl"
                            >
                                {isFeatureOpen ? (
                                    <FaAngleUp />
                                ) : (
                                    <FaAngleDown />
                                )}
                            </button>
                        </h2>
                        {data.room_features.map(feature => (
                            <div
                                key={feature.id}
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    isFeatureOpen
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <li>{feature.feature_name}</li>
                            </div>
                        ))}
                        <p className="mx-1 text-md font-light font-sans my-4 text-gray-600">
                            {data.room_description}
                        </p>
                        {user && data.room_status === "Available" && (
                            <div className="flex justify-center ">
                                <button className="bg-blue-500 text-white  p-2 rounded  font-bold my-4">
                                    <Link
                                        to={`/reservation/${id}/?room_name=${data.room_name}&room_type=${data.room_type}`}
                                    >
                                        Book Reservation
                                    </Link>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {!loading && !erroMessage && <Footer />}
        </>
    );
}
export default SingleRoom;
