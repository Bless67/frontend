import { FaStar } from "react-icons/fa";

const Card = ({ room_name, room_type, room_price, image }) => {
    const baseUrl = "https://web-production-186a.up.railway.app";

    return (
        <div className="bg-gray-200 mb-5 rounded-xl mx-2 p-1 shadow-md shadow-blue-500">
            <div
                className="bg-center h-[250px] mx-0.5 rounded-xl bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${baseUrl}${image})` }}
            ></div>

            <p className="text-2xl font-extrabold text-center text-blue-500 mt-2">
                Room {room_name}
            </p>
            <p className="text-center text-xl font-bold mt-2">{room_type}</p>
            <p className="text-center text-xl font-bold mt-2">${room_price}</p>

            <div className="flex justify-center mt-2 mb-2">
                <FaStar className="text-yellow-400 " />
                <FaStar className="text-yellow-400 ml-1" />
                <FaStar className="text-yellow-400 ml-1" />
                <FaStar className="text-yellow-400 ml-1" />
                <FaStar className="text-white ml-1" />
            </div>
        </div>
    );
};

export default Card;
