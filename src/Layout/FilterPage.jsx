import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const FilterPage = ({
    isFilterOpen,
    setIsFilterOpen,
    setFilteredData,
    constantData
}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [roomType, setRoomType] = useState("All");

    const handleTypeChange = e => {
        setRoomType(e.target.value);
    };
    const handleClose = () => {
        setIsFilterOpen(!isFilterOpen);
        setMaxPrice(1000);
        setMinPrice(0);
        setRoomType("All");
    };

    const handleFilterData = () => {
        const allreadyFilterData = constantData.filter(item => {
            const withinPriceRange =
                item.room_price >= minPrice && item.room_price <= maxPrice;
            const matchesRoomType =
                roomType === "All" || item.room_type === roomType;
            return matchesRoomType && withinPriceRange;
        });

        setFilteredData(allreadyFilterData);
        setIsFilterOpen(!isFilterOpen);
    };
    return (
        <div
            className={`fixed left-0 top-0 bg-gray-800 h-screen pr-3 pt-4 transform transition-all duration-500 z-50 w-full insert-1 ${
                isFilterOpen
                    ? "opacity-100 -translate-y-0"
                    : "opacity-0 translate-y-full"
            }`}
        >
            <div className="flex justify-end">
                <button onClick={handleClose} className="text-white text-3xl">
                    <FaTimes />
                </button>
            </div>
            <main className="px-12 py-4 ">
                <p className="text-green-500 font-extrabold text-2xl mb-2">
                    Room price
                </p>
                <div className="text-white text-xl flex flex-col font-bold mb-6 shadow shadow-black p-3">
                    <label>
                        min price:
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            value={minPrice}
                            onChange={e => setMinPrice(e.target.value)}
                            className="accent-green-500"
                        />
                    </label>
                    <p className="">${minPrice}</p>
                    <label>
                        max price:
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                            className="accent-green-500"
                        />
                    </label>
                    <p>${maxPrice}</p>
                </div>
                <p className="text-green-500 font-extrabold text-2xl mb-2">
                    Room type
                </p>
                <div className="flex flex-col  text-white font-bold text-xl p-3 shadow shadow-black">
                    <label>
                        <input
                            type="radio"
                            name="room type"
                            className="mr-3 accent-green-500"
                            value="All"
                            onChange={handleTypeChange}
                            checked={roomType === "All"}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="room type"
                            className="mr-3 accent-green-500"
                            value="Single"
                            onChange={handleTypeChange}
                            checked={roomType === "Single"}
                        />
                        Single
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="room type"
                            className="mr-3 accent-green-500"
                            value="Double"
                            onChange={handleTypeChange}
                            checked={roomType === "Double"}
                        />
                        Double
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="room type"
                            className="mr-3 accent-green-500"
                            value="Suite"
                            onChange={handleTypeChange}
                            checked={roomType === "Suite"}
                        />
                        Suite
                    </label>
                </div>
                <div className="flex justify-center my-7">
                    <button
                        onClick={handleFilterData}
                        className="py-2 px-7 border border-green-500 font-bold text-white rounded-md text-xl"
                    >
                        Filter
                    </button>
                </div>
            </main>
        </div>
    );
};
export default FilterPage;
