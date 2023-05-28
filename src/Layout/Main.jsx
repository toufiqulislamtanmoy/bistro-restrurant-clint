import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    console.log(location)
    const newLayout = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <>
            {newLayout || <Navbar />}
            <Outlet />
            {newLayout || <Footer />}
        </>
    );
};

export default Main;