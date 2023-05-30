import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaHome, FaWallet, FaCalendarAlt, FaBars, FaShoppingBag,FaBook, FaUsers } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
const Dashboard = () => {
    const [cart] = useCart();
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    return (
        <div className="drawer drawer-mobile space-x-5 ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#999794]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80  text-base-content">
                    {
                        isAdmin ?
                            <>

                                <li><NavLink to="/dashboard/"><FaHome />Admin Home</NavLink></li>
                                <li><NavLink to="/additems"> <ImSpoonKnife/> Add Items</NavLink></li>
                                <li><NavLink to="/manageitems"><FaBars/> Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/managebookings"><FaBook />
                                   Manage Bookings
                                </NavLink></li>
                                <li><NavLink to="/dashboard/allusers"><FaUsers />
                                   All Users
                                </NavLink></li>
                            </>
                            :
                            <>

                                <li><NavLink to="/dashboard/"><FaHome />User Home</NavLink></li>
                                <li><NavLink to="/reservation"><FaCalendarAlt />Reservation</NavLink></li>
                                <li><NavLink to="/paymentHistory"><FaWallet />Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/mycart"><FaShoppingCart />
                                    My Cart
                                    <div className="badge badge-secondary relative top-[-20px]">+{cart?.length || 0}</div>
                                </NavLink></li>
                            </>
                    }

                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome />Home</NavLink></li>
                    <li><NavLink to="/menu"><FaBars />Menu</NavLink></li>
                    <li><NavLink to="/order/salad"><FaShoppingBag />Shop</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;