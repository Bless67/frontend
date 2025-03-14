import { useState } from "react";
import { motion } from "framer-motion";
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseUrl = "https://res.cloudinary.com/db2tiupnj/";
  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mt-2">
      {/* Images */}
      <div className="overflow-hidden relative mx-1 rounded-2xl">
        <motion.img
          src={`${baseUrl}${images[currentIndex].image}`}
          alt={`Slide ${currentIndex}`}
          className="w-full h-64 object-cover transition-transform duration-500"
          key={currentIndex}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.6 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index
              ? "bg-gray-800"
              : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
