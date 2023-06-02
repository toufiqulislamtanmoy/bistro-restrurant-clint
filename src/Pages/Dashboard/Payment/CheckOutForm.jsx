import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from "react";
const CheckOutForm = ({price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState('');

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
                <button className="btn btn-info" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

           {errorMsg && <p className='text-red-500 w-2/3 mx-auto'>{errorMsg}</p>}

        </>
    );
};

export default CheckOutForm;