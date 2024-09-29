import PropTypes from 'prop-types';

const ConfirmModal = ({ isOpen, customerName, checkInDate, checkOutDate, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg relative">
                <h2 className="text-[18px] font-bold mb-4">Booking Confirmation </h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-blue-500">
                                    Detail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Information
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-blue-600 border-b border-blue-400">
                                <th scope="row" className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    Customer Name
                                </th>
                                <td className="px-6 py-4">
                                    {customerName || "N/A"}
                                </td>
                            </tr>
                            <tr className="bg-blue-600 border-b border-blue-400">
                                <th scope="row" className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    Type
                                </th>
                                <td className="px-6 py-4">
                                    Cottage
                                </td>
                            </tr>
                            <tr className="bg-blue-600 border-b border-blue-400">
                                <th scope="row" className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    Check-In
                                </th>
                                <td className="px-6 py-4">
                                    {checkInDate}
                                </td>
                            </tr>
                            <tr className="bg-blue-600 border-b border-blue-400">
                                <th scope="row" className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    Check-Out
                                </th>
                                <td className="px-6 py-4">
                                    {checkOutDate}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                        <label className="block text-gray-700 text-[18px] font-bold">Advance Payment</label>
                        <a className="block text-gray-500 text-sm  mb-2">For walk in only.</a>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            required
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            
                        />
                    </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Payment & Submit
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-4 bg-[#FF6767] hover:bg-[#f35656] text-white py-2 px-4 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    customerName: PropTypes.string.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ConfirmModal;
