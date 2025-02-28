import { useState, useEffect } from "react";
import api from "../Utils/Api.js";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Layout/Card.jsx";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import FilterPage from "../Layout/FilterPage.jsx";
import { useQuery } from "@tanstack/react-query";

function Room() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const navigate = useNavigate();
    const fetchData = async () => {
        const response = await api.get("api/room/");
        console.log(response.data);
        return response.data;
    };
    const { data, isLoading, error } = useQuery({
        queryKey: ["rooms"],
        queryFn: fetchData,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false
    });
    useEffect(() => {
        if (data) {
            setFilteredData(data);
        }
    }, [data]);
    const handleFilterClick = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <main
            className={`flex flex-col h-screen ${
                isFilterOpen ? "overflow-hidden" : "overflow-auto"
            } `}
        >
            <div className={`grow `}>
                <Header>
                    <IoMdArrowRoundBack onClick={() => navigate("/")} />
                </Header>

                {isLoading && !data && (
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 mx-auto mt-44 border-t-white border-b-white"></div>
                )}
                {error && (
                    <div>
                        <p className="text-center font-bold text-red-500 my-11 text-md">
                            An error occurred, please try again
                        </p>
                    </div>
                )}
                {data && data.length > 0 && (
                    <div className="text-gray-600">
                        <FilterPage
                            isFilterOpen={isFilterOpen}
                            setIsFilterOpen={setIsFilterOpen}
                            setFilteredData={setFilteredData}
                            constantData={data}
                        />
                        <h2 className="text-2xl text-center font-bold my-2 ">
                            Available Rooms
                        </h2>
                        <p className="font-medium mx-2">
                            The list of hotel rooms available click on it to see
                            more info about the room
                        </p>
                        <button
                            className="flex items-center border border-1 border-blue-500 py-1 rounded m-2"
                            onClick={handleFilterClick}
                        >
                            <p className="font-medium mx-1">Filter</p>
                            <BsFilterLeft className="font-bold mx-1" />
                        </button>
                        <ul>
                            {filteredData &&
                                filteredData.map(item => (
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
                {data && data.length <= 0 && (
                    <p className="text-2xl font-bold text-gray-600 my-28 text-center mx-2">
                        No available room at the moment
                    </p>
                )}
                {data &&
                    data.length > 0 &&
                    filteredData &&
                    filteredData.length <= 0 && (
                        <div>
                            <p className="text-md font-bold text-gray-600 my-28 text-center mx-4">
                                No matching room
                            </p>
                        </div>
                    )}
            </div>
            {!isLoading && !error && <Footer />}
        </main>
    );
}

export default Room;
