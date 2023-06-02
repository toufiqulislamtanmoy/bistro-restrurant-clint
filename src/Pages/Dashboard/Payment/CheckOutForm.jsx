import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import "./CheckOutFrom.css"
const CheckOutForm = ({price,cart}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clintSecret, setClintSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const {user} = useContext(AuthContext);
    

    useEffect(()=>{
        console.log(price)
        if(price>0){
            axiosSecure.post('/create-payment-intent',{price}).then(res => {
                setClintSecret(res.data.clientSecret);
            })
        }
    },[axiosSecure,price])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log("inside did not get the stripe and element")
            return;
        }

        const card = elements.getElement(CardElement);
        console.log(card);
        if (card == null) {
            console.log('Card is null')
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setErrorMsg(error.message);
        } else {
            setErrorMsg('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true);
        const {paymentIntent, error:confrimError} = await stripe.confirmCardPayment(
            clintSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || "Unknown",
                  email: user?.email || "Unknown",
                },
              },
            },
          );
          if(confrimError){
            // setErrorMsg(confrimError);
            console.log(confrimError);
          }
          setProcessing(false)
          if(paymentIntent.status === "succeeded"){
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent.id);
            // To do in next
            const payment ={
                email:user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                status:'service pending',
                quantity: cart.length,
                cartItemsId: cart.map(item => item._id),
                menuItemsId: cart.map(item => item.menuItemId),
                itemsName: cart.map(item => item.name)
            }
            axiosSecure.post('/payments',payment).then(res => {
                console.log(res.data)
                if(res.data.insertResult.insertedId){
                    console.log('Transaction data add successfully')

                }
            })
          }
    }
    return (
        <>
            <form className='w-2/3 mx-auto space-y-5' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-info" type="submit" disabled={!stripe || !clintSecret || processing}>
                    Pay
                </button>
            </form>

           {errorMsg && <p className='text-red-500 w-2/3 mx-auto'>{errorMsg}</p>}
           {transactionId && <p className='text-green-500 w-2/3 mx-auto'>Transaction Successful</p>}

        </>
    );
};

export default CheckOutForm;