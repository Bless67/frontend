import { useState, useEffect } from "react";
import api from "../Utils/Api.js";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Layout/Card.jsx";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
function Room() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get("api/room/");
                console.log(response.data);
                setData(response.data);
            } catch (err) {
                console.error(err);
                setErrorMessage("An Error occured please try again");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header>
                <IoMdArrowRoundBack onClick={() => navigate("/")} />
            </Header>

            {loading && (
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 mx-auto mt-44 border-blue-500"></div>
            )}
            {errorMessage && (
                <p className="text-center font-bold text-red-500 my-11 text-md">
                    {errorMessage}
                </p>
            )}
            {data && (
                <div className="text-gray-600">
                    <h2 className="text-2xl text-center font-bold my-2 ">
                        Available Rooms
                    </h2>
                    <p className="font-medium mx-2">
                        The list of hotel rooms available click on it to see
                        more info about the room
                    </p>
                    <button className="flex items-center border border-1 border-blue-500 py-1 rounded m-2">
                        <p className="font-medium mx-1">Filter</p>
                        <BsFilterLeft className="font-bold mx-1" />
                    </button>
                    <ul>
                        {data.map(item => (
                            <Link to={`/room/${item.id}`} key={item.id}>
                                <Card
                                    room_name={item.room_name}
                                    room_price={item.room_price}
                                    room_type={item.room_type}
                                    image={item.images[0].image}
                                />
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
            {!loading && !errorMessage && <Footer/>}
        </div>
    );
}

export default Room;
