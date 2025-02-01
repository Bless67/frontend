import { useContext, useState, useEffect } from "react";
import { useAuth } from "../Utils/AuthProvider.jsx";
import { Link } from "react-router-dom";
import Header from "../Layout/Header.jsx";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Layout/Sidebar.jsx";
import Footer from "../Layout/Footer.jsx";
import { ToastContainer, toast, Slide } from "react-toastify";

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
    const handleClose = () => {
        if (isOpen) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        if (isLogged) {
            toast.success("Login successful", {
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
        if (isLoggedOut) {
            toast.success("Logout successful", {
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
        return () => {
            setIsLoggedOut(false);
            setIsLogged(false);
        };
    }, [isLogged, isLoggedOut]);

    return (
        <div
            className={`h-screen ${
                isOpen ? "overflow-hidden" : "overflow-auto"
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
                    Located in the heart of the city, Bicons Hotel is a
                    luxurious retreat designed to provide you with an
                    unforgettable experience. From the moment you step through
                    our doors, you'll be surrounded by timeless elegance,
                    exceptional service, and a warm, welcoming atmosphere. Our
                    spacious rooms are thoughtfully designed to ensure your
                    utmost comfort, featuring sophisticated decor and modern
                    amenities. Indulge in a world of flavors at our on-site
                    restaurants, where every meal is crafted to perfection by
                    our renowned chefs. For relaxation, immerse yourself in
                    tranquility at our spa or unwind by the pool, enjoying the
                    serene ambiance. Whether you're visiting for business or
                    leisure, Bicons Hotel offers a seamless blend of luxury and
                    convenience, making it the perfect destination for creating
                    lasting memories. Experience the best in hospitality at
                    Bicons Hotel – your home away from home.
                </p>

                <div className="h-[270px] w-full p-1">
                    <img
                        src="/modern.jpg"
                        alt="Home image"
                        className="rounded-xl w-full h-full object-cover "
                    />
                </div>
                <p className="text-md mx-1  my-2 font-light">
                    Bicons Hotel offers a unique blend of luxury and comfort,
                    designed to make your stay unforgettable. Located in the
                    heart of the city, our elegant rooms, exceptional dining,
                    and serene spaces promise a truly relaxing experience.
                    Whether you're here for business or leisure, every moment at
                    Bicons Hotel is crafted with care to meet your highest
                    expectations.
                </p>

                <div className="flex justify-center gap-6 my-4">
                    <button className="border-2 border-blue-500 text-center text-gray-600  p-2 text-xl px-8 rounded font-bold">
                        <Link to="/room">Rooms</Link>
                    </button>
                    {user &&
                    <button className="border-2 border-blue-500 text-center text-gray-600  p-2 text-xl  rounded font-bold">
                        <Link to="/check-reservation">Rerservations</Link>
                    </button>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
