import { useState } from 'react';
import PropTypes from 'prop-types';


const BookingModal = ({ isOpen, onClose }) => {
    const [customerName, setCustomerName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [bookingType, setBookingType] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log("Booking submitted", {
            customerName,
            mobileNumber,
            emailAddress,
            bookingType,
            checkInDate,
            checkOutDate,
        });
        onClose(); 
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white w-[95%] h-[90%] rounded-lg shadow-lg p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        &#10005; {/* Close icon */}
                    </button>

                    <div className="flex justify-around mt-5">
                        <div className="w-[25%]">
                            <div className="bg-gray-100 w-[400px] h-[500px] rounded-lg">
                                <img src="" alt="" />
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-[20px] font-bold mt-3">Type of the Cottage</h3>
                                <p><strong>Prices:</strong> 1,200 pesos</p>
                                <p><strong>Capacity:</strong>Good for 10 persons</p>
                                <p><strong>Description:</strong> A spacious, cozy cottage perfect for families and small groups.</p>
                            </div>
                        </div>

                        <div className="w-[60%]">
                            <form onSubmit={handleBookingSubmit}>
                                <div className="flex w-full space-x-4">
                                    <div className="w-full">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter customer name"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                                value={emailAddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
                                            <input
                                                type="text"
                                                placeholder="Enter mobile no."
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                            
                                    <div className="w-full">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Check-In Date</label>
                                            <input
                                                type="date"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                                value={checkInDate}
                                                onChange={(e) => setCheckInDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Check-Out Date</label>
                                            <input
                                                type="date"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                                value={checkOutDate}
                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Booking Type</label>
                                        <select
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                            value={bookingType}
                                            onChange={(e) => setBookingType(e.target.value)}
                                        >
                                            <option value="">Select type</option>
                                            <option value="Cottage">Cottage</option>
                                            <option value="Lodge">Lodge</option>
                                        </select>
                                    </div>
                                    
                                    <div className="relative shadow-md sm:rounded-lg max-h-[420px] overflow-y-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                            <thead className="sticky top-0 text-xs bg-gray-100 uppercase z-10">
                                                <tr>
                                                    <th scope="col" className="px-16 py-3">
                                                    <span className="sr-only">Image</span>
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">Name type</th>
                                                    <th scope="col" className="px-6 py-3">Capacity</th>
                                                    <th scope="col" className="px-6 py-3">Price</th>
                                                    <th scope="col" className="px-6 py-3">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <img src="./src/assets/sample4.jpg" className="w-16 md:w-32 max-w-full max-h-full" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Cottage A</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Good for 10 persons</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">$599</td>
                                                    <td className="px-6 py-4">
                                                        <a href="#" className="font-medium text-white bg-[#53db60] p-2 rounded-md">Select</a>
                                                    </td>
                                                </tr>

                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <img src="./src/assets/sample4.jpg" className="w-16 md:w-32 max-w-full max-h-full" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Cottage A</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Good for 10 persons</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">$599</td>
                                                    <td className="px-6 py-4">
                                                        <a href="#" className="font-medium text-white bg-[#53db60] p-2 rounded-md">Select</a>
                                                    </td>
                                                </tr>

                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <img src="./src/assets/sample4.jpg" className="w-16 md:w-32 max-w-full max-h-full" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Cottage A</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Good for 10 persons</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">$599</td>
                                                    <td className="px-6 py-4">
                                                        <a href="#" className="font-medium text-white bg-[#53db60] p-2 rounded-md">Select</a>
                                                    </td>
                                                </tr>

                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <img src="./src/assets/sample4.jpg" className="w-16 md:w-32 max-w-full max-h-full" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Cottage A</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Good for 10 persons</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">$599</td>
                                                    <td className="px-6 py-4">
                                                        <a href="#" className="font-medium text-white bg-[#53db60] p-2 rounded-md">Select</a>
                                                    </td>
                                                </tr>

                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <img src="./src/assets/sample4.jpg" className="w-16 md:w-32 max-w-full max-h-full" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Cottage A</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">Good for 10 persons</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">$599</td>
                                                    <td className="px-6 py-4">
                                                        <a href="#" className="font-medium text-white bg-[#53db60] p-2 rounded-md">Select</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-5 space-x-2">
                                    <button
                                        type="submit"
                                        className="bg-[#12B1D1] hover:bg-[#09B0EF] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                    >
                                        Confirm
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-[#FF6767] hover:bg-[#f35656] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

BookingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default BookingModal;
