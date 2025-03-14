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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
function SingleRoom() {
  const { user, isBooked, setIsBooked } = useAuth();

  const { id } = useParams();
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const [isAmenityOpen, setIsAmenityOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const response = await api.get(`api/room/${id}/`);
    console.log(response.data);
    return response.data;

  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["room", id],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  

  useEffect(() => {
    if (isBooked) {
      toast.success("Reservation booked successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
        onClick: () => navigate("/check-reservation")
      });

      queryClient.invalidateQueries(["rooms"]);
      refetch();
      return () => setIsBooked(false);
    }
  }, [isBooked]);
  return (
    <>
      <ToastContainer />
      <Header>
        <IoMdArrowRoundBack onClick={() => navigate("/room")} />
      </Header>
      <div className="mx-1 text-gray-600">
        {isLoading && (
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 mx-auto mt-44 border-t-white border-b-white"></div>
        )}
        {error && (
          <p className="text-center font-bold text-red-500 my-11 text-md">
            An error occurred,please try again
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

            <Carousel
              images={data.images}
            />

            <h2 className="text-2xl my-1.5 font-bold flex justify-start items-center mt-8">
              Amenities
              <motion.button
                onClick={() => setIsAmenityOpen(!isAmenityOpen)}
                className=" text-gray-600 ml-4 text-3xl bg-blue-500  px-1 rounded-full"

                initial={{ rotate: 0 }}
                animate={{ rotate: isAmenityOpen ? 180 : 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              >

                <FaAngleDown />

              </motion.button>
            </h2>
            <AnimatePresence initial={false}>
              {isAmenityOpen && (
                <motion.ul
                  className="w-full p-1 px-2 font-medium overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.3
                  }}
                >
                  {data?.room_amenities?.map(
                    (amenity, index) => (
                      <motion.li
                        key={amenity.id}
                        layout
                      >
                        {amenity.amenity_name}
                      </motion.li>
                    )
                  )}
                </motion.ul>
              )}
            </AnimatePresence>

            <h2 className="text-2xl my-4 mt-7 font-bold flex justify-start items-center">
              Features
              <motion.button
                onClick={() => setIsFeatureOpen(!isFeatureOpen)}
                className="ml-7 text-gray-600 text-blue-500 rounded-full bg-blue-500 px-1 text-3xl"
                
                initial={{ rotate: 0 }}
                animate={{rotate:isFeatureOpen ?180 :0}}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              >

                <FaAngleDown />

              </motion.button>
            </h2>

            <AnimatePresence initial={false}>
              {isFeatureOpen && (
                <motion.ul
                  className="w-full p-1 px-2 font-medium overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.3
                  }}
                >
                  {data?.room_features?.map(
                    (feature,
                      index) => (
                      <motion.li
                        key={feature.id}

                        layout
                      >
                        {feature.feature_name}
                      </motion.li>
                    )
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
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
            {!user && (
              <div>
                <p className="text-xl text-center font-bold my-4 text-gray-600">
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-500 underline"
                  >
                    Login
                  </span>{" "}
                  to book a reservation for this room
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {!isLoading && !error && <Footer />}
    </>
  );
}
export default SingleRoom;
