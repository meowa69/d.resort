import PropTypes from "prop-types";

const ViewModal = ({ isOpen, onClose, booking }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-semibold">Booking Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mt-4">
                    <img src={booking.image} alt="Property" className="w-full h-[400px] object-cover rounded-lg" />
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">{booking.propertyName}</h3>
                    <p className="text-gray-600">{booking.capacity}</p>
                    <p className="text-gray-600">{booking.price}</p>
                </div>

                <div className="mt-6 space-y-2">
                    <h4 className="text-lg font-semibold">Customer Information</h4>
                    <p className="text-gray-600"><strong>Name:</strong> {booking.customer.name}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {booking.customer.email}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {booking.customer.phone}</p>
                    <p className="text-gray-600"><strong>Check-in:</strong> {booking.customer.checkIn}</p>
                    <p className="text-gray-600"><strong>Check-out:</strong> {booking.customer.checkOut}</p>
                </div>

                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for the component
ViewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    booking: PropTypes.shape({
        image: PropTypes.string.isRequired,
        propertyName: PropTypes.string.isRequired,
        capacity: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        customer: PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ViewModal;
