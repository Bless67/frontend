import Footer from "../Layout/Footer.jsx";
import Header from "../Layout/Header.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const About = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen">
            <main className="grow">
                <Header>
                    <IoMdArrowRoundBack onClick={() => navigate("/")} />
                </Header>
                <p className="my-3 text-2xl text-center font-bold text-gray-600">
                    About us
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default About;
