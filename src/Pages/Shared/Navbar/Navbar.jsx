import { useContext } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
    const [cart] = useCart();
    const { user, userLogOut } = useContext(AuthContext);
    const handelLogOut = () => {
        userLogOut();
        console.log('Inside Handel Logout')
    }
    const navlist = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Our Shop</Link></li>
        <li>
            <Link to="dashboard/mycart">
                <div className="flex gap-2">
                    <FaShoppingCart/>
                    {user && <div className="badge badge-secondary relative top-[-20px]">+{cart?.length || 0}</div>}
                </div>
            </Link>
        </li>

        {
            user ?
                <>
                    <button onClick={handelLogOut} className="">Logout</button>
                </>
                :
                <>
                    <li><Link to="/login">Login</Link></li>
                </>
        }
    </>
    return (
        <div className="navbar fixed z-10 bg-black text-white bg-opacity-30 max-w-[1480px] mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black text-white rounded-box w-52">
                        {
                            navlist
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navlist
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Get started</a>
            </div>
        </div>
    );
};

export default Navbar;