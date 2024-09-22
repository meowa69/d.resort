import PropTypes from 'prop-types'; // Import PropTypes
import { useState, useEffect } from "react";
import Loader from '../components/Loader';

function Payment({ startDate, endDate }) {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
    });
    const [gcashPayment, setGcashPayment] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setGcashPayment(!gcashPayment);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    const formatDate = (date) => {
        return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-grow flex justify-center">
                <div className="w-full max-w-[1200px] flex">
                    <div className="w-2/3 p-4">
                        <div className="border rounded-md p-4">
                            <h2 className="text-2xl font-bold mb-4">Step 1: Personal Information</h2>
                            <form className="space-y-4">
                                {/* Existing form fields for personal information */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="firstName">First Name</label>
                                    <p className="text-sm py-1 text-gray-500">Please give us the name of one of the people staying at this property.</p>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 py-2" htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="email">Email Address</label>
                                    <p className="text-sm py-1 text-gray-500">Your confirmation email goes here</p>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="mobile">Mobile Number</label>
                                    <p className="text-sm py-1 text-gray-500">Please provide your contact phone number</p>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        required
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Step 2: Payment Details */}
                        <div className="p-4 border rounded-md mt-4">
                            <h2 className="text-2xl font-bold mb-4">Step 2: Payment Details</h2>
                            <h3 className="text-lg font-semibold">Choose Payment Method</h3>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    checked={gcashPayment}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <span className="text-sm">Pay via GCash</span>
                            </label>
                            {gcashPayment && (
                                <div className="mt-4">
                                    <p>Please send your payment to the following GCash number:</p>
                                    <p className="font-bold">+63 912 345 6789</p>
                                    <p>After payment, please take a screenshot of the confirmation and send it to us.</p>
                                </div>
                            )}
                        </div>

                        {/* Cancellation Policy */}
                        <div className="mt-4 p-4 border rounded-md">
                            <h3 className="text-lg font-semibold">Cancellation Policy</h3>
                            <p className="text-sm font-bold">Non-refundable rate</p>
                            <p className="text-sm">If you change or cancel your booking you will not get a refund or credit to use for a future stay.</p>
                        </div>

                        {/* Terms of Booking */}
                        <div className="mt-4 p-4 border rounded-md">
                            <h3 className="text-lg font-semibold">Terms of Booking</h3>
                            <p className="text-sm">By proceeding with this booking, you agree to our terms and conditions.</p>

                            {/* Book Button */}
                            <div className="mt-6 flex justify-end">
                                <button className="bg-[#1089D3] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Accommodation Details on the Right */}
                    <div className="flex">
                        <div className="w-[400px] p-4 flex flex-col ">
                            <div className="w-full border p-4 rounded-md">
                                <div>
                                    <img src="./src/assets/sample1.jpg" className="w-full h-auto rounded-md mb-4" />
                                </div>
                                
                                <div className="border p-4 rounded-md shadow-sm">
                                    <h3 className="text-xl font-bold mb-2">Cottage Name</h3>
                                    <p className="">Check-in: {formatDate(startDate)}</p>
                                    <p className="">Check-out: {formatDate(endDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// PropTypes validation
Payment.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
};

export default Payment;
