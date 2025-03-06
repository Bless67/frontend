import Login from "./components/Login.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Utils/AuthProvider.jsx";
import PrivateRoute from "./Utils/PrivateRoute.jsx";
import Home from "./components/Home.jsx";
import Room from "./components/Room.jsx";
import SingleRoom from "./components/SingleRoom.jsx";
import BookReservation from "./components/BookReservation.jsx";
import CheckReservation from "./components/CheckReservation.jsx";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import About from "./components/About.jsx";
function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/room/:id" element={<SingleRoom />} />
                    <Route
                        path="/reservation/:id/"
                        element={
                            <PrivateRoute>
                                <BookReservation />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/check-reservation"
                        element={
                            <PrivateRoute>
                                <CheckReservation />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
