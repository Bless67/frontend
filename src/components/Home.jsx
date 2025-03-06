import { useContext, useState, useEffect } from "react";
import { useAuth } from "../Utils/AuthProvider.jsx";
import { Link } from "react-router-dom";
import Header from "../Layout/Header.jsx";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Layout/Sidebar.jsx";
import Footer from "../Layout/Footer.jsx";
import { ToastContainer, toast, Slide } from "react-toastify";
import { FirstDescription, SecondDescription } from "../Utils/WriteUp.js"

const Home = () => {
  const {
    user,
    setUser,
    isLogged,
    setIsLogged,
    isLoggedOut,
    setIsLoggedOut
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () =>  setIsOpen(false);
  const showNotification = (message) => {
    toast.success(message, {
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
  useEffect(() => {
    if (isLogged) {
      showNotification("Login successful")
      setIsLogged(false)
    }
    if (isLoggedOut) {
      showNotification("Logout successful")
      setIsLoggedOut(false)

    }

  }, [isLogged, isLoggedOut]);

  return (
    <div
      className={`h-screen ${isOpen ? "overflow-hidden" : "overflow-auto"
        }`}
    >
      <ToastContainer />
      <Header isOpen={isOpen}>
        <FaBars onClick={handleIsOpen} />
      </Header>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div onClick={handleClose}>
        <p className="font-extrabold text-gray-700 text-3xl text-center my-3">
          Experience Luxury at Its Best
        </p>

        <div className="h-[270px] w-full p-1">
          <img
            src="/luxury-resort.jpg"
            alt="Home image"
            className="rounded-xl w-full h-full object-cover "
          />
        </div>
        <h1 className="mt-4 mb-2 text-md text-gray-600 text-center font-bold">
          Welcome to Bicons Hotel – Your Perfect Escape
        </h1>
        <p className="text-md mx-1 mb-2 font-light">
          {FirstDescription}
        </p>

        <div className="h-[270px] w-full p-1">
          <img
            src="/modern.jpg"
            alt="Home image"
            className="rounded-xl w-full h-full object-cover "
          />
        </div>
        <p className="text-md my-2 mx-1 font-light">
          {SecondDescription}
        </p>

        <div className="flex justify-center gap-6 my-4">
          <button className="border-2 border-blue-500 text-center text-gray-600  p-2 text-xl px-8 rounded font-bold">
            <Link to="/room">Rooms</Link>
          </button>
          {user &&
            <button className="border-2 border-blue-500 text-center text-gray-600  p-2 text-xl  rounded font-bold">
              <Link to="/check-reservation">Reservations</Link>
            </button>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
