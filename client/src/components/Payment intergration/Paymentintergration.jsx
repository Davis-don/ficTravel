import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Paymentintergration.css';
import { IoClose } from "react-icons/io5";
import usePayStore from '../../store/payStore';

function Paymentintergration() {
    const toggleStore = usePayStore((state) => state.toggleStore);
    const priceINR = usePayStore((state) => state.price);

    // Convert INR to KES using a fixed exchange rate
    const exchangeRate = 1.29; // 1 INR = 1.29 KES (you can change this rate if needed)
    const priceKES = (priceINR * exchangeRate).toFixed(2); // Convert INR to KES

    return (
        <div className='overall-payment-intergration-section'>
            <p onClick={() => toggleStore()} className='h1 clickable'><IoClose /></p>
            <div className="card-payment-image-container"></div>
            <div className="payment-text-box">
                <h1 className='text-success'>{`KSh ${priceKES}`}</h1> {/* Displaying the price in Kenyan Shillings */}
                <button className='btn btn-lg btn-outline-success'>Confirm</button>
            </div>
        </div>
    );
}

export default Paymentintergration;
