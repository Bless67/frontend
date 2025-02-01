import Footer from "../Layout/Footer.jsx";
import Header from "../Layout/Header.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthProvider.jsx";
const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <div className="flex flex-col h-screen">
        <main className="grow">
            <Header>
                <IoMdArrowRoundBack onClick={() => navigate("/")} />
            </Header>
            <p className="my-3 text-2xl font-bold text-gray-600">
                Username: {user.username}
            </p>
            <p className="my-3 text-2xl font-bold text-gray-600">
                Email: {user.email}
            </p>
            </main>
            <Footer/>
        </div>
    );
};

export default Profile;
