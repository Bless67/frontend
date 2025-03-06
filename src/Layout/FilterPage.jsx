import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const FilterPage = ({ isFilterOpen, setIsFilterOpen, setFilteredData, constantData }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [roomType, setRoomType] = useState("All");

  const handleTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleClose = () => {
    setIsFilterOpen(false);
    setMaxPrice(1000);
    setMinPrice(0);
    setRoomType("All");
  };

  const handleFilterData = () => {
    const filteredData = constantData.filter((item) => {
      const withinPriceRange = item.room_price >= minPrice && item.room_price <= maxPrice;
      const matchesRoomType = roomType === "All" || item.room_type === roomType;
      return matchesRoomType && withinPriceRange;
    });

    setFilteredData(filteredData);
    setIsFilterOpen(false);
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={isFilterOpen ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className="fixed left-0 top-0 bg-gray-800 h-screen pr-3 pt-4 z-50 w-full"
    >
      <div className="flex justify-end">
        <button onClick={handleClose} className="text-white text-3xl">
          <FaTimes />
        </button>
      </div>
      <main className="px-12 py-4">
        <p className="text-green-500 font-extrabold text-2xl mb-2">Room price</p>
        <div className="text-white text-xl flex flex-col font-bold mb-6 shadow shadow-black p-3">
          <label>
            Min price:
            <input
              type="range"
              min={0}
              max={1000}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="accent-green-500"
            />
          </label>
          <p>${minPrice}</p>
          <label>
            Max price:
            <input
              type="range"
              min={0}
              max={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="accent-green-500"
            />
          </label>
          <p>${maxPrice}</p>
        </div>
        <p className="text-green-500 font-extrabold text-2xl mb-2">Room type</p>
        <div className="flex flex-col text-white font-bold text-xl p-3 shadow shadow-black">
          {["All", "Single", "Double", "Suite"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="room type"
                className="mr-3 accent-green-500"
                value={type}
                onChange={handleTypeChange}
                checked={roomType === type}
              />
              {type}
            </label>
          ))}
        </div>
        <div className="flex justify-center my-7">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFilterData}
            className="py-2 px-7 border border-green-500 font-bold text-white rounded-md text-xl"
          >
            Filter
          </motion.button>
        </div>
      </main>
    </motion.div>
  );
};

export default FilterPage;