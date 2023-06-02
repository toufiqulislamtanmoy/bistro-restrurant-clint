import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_PK_TOKEN);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const totalPrice = parseFloat(total.toFixed(2))
    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro Boss | Payment</title>
            </Helmet>
            <SectionTitle title="Payment Here" subtitle="Please Complete the process" />
            <h2>Payment Here</h2>
            <Elements  stripe={stripePromise}>
                <CheckOutForm  cart={cart} price={totalPrice}></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;