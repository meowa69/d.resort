import PropTypes from 'prop-types';

const CalendarEventModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; 

    const cottages = [
        { number: 1, type: 'Cottage A', },
        { number: 2, type: 'Cottage B', },
        { number: 3, type: 'Cottage C', },
        { number: 4, type: 'Cottage A', },
        { number: 5, type: 'Cottage B', },
        { number: 6, type: 'Cottage C', },
        { number: 7, type: 'Cottage A', },
        { number: 8, type: 'Cottage B', },
        { number: 9, type: 'Cottage C', },
        { number: 10, type: 'Cottage C',},

    ];

    const lodges = [
        { number: 1, type: 'Lodge A', },
        { number: 2, type: 'Lodge B', },
        { number: 3, type: 'Lodge C', },
        { number: 4, type: 'Lodge A', },
        { number: 5, type: 'Lodge B', },
        { number: 6, type: 'Lodge C', },
        { number: 7, type: 'Lodge A', },
        { number: 8, type: 'Lodge B', },
        { number: 9, type: 'Lodge C', },
        { number: 10, type: 'Lodge C',},
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6  w-[90%] h-[]">
                <h2 className="text-[25px] font-semibold mb-4">CALENDAR EVENTS</h2>

                <div className="flex justify-between">
                    <div className="w-1/2 mr-2 ">
                        <div className="mb-2">
                            <h3 className="text-md font-semibold mb-2">Cottages</h3>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                       <div className="w-full text-sm text-center text-gray-500">
                            <table className="min-w-full border-collapse text-gray-700 uppercase bg-white">
                                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-100 z-10">
                                    <tr>
                                        <th className="border p-2">No.</th>
                                        <th className="border p-2">Cottage Type</th>
                                        <th className="border p-2">Availability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cottages.map((cottage) => (
                                        <tr key={cottage.number}>
                                            <td className="border p-2 text-center">{cottage.number}</td>
                                            <td className="border p-2 text-center">{cottage.type}</td>
                                            <td className="border p-2 text-center">
                                                <button className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded">
                                                    Check
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                       </div> 
                    </div>

                    {/* Lodges Table */}
                    <div className="w-1/2 ml-2">
                        <div className="mb-2">
                            <h3 className="text-md font-semibold mb-2">Lodges</h3>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                        <div className="w-full text-sm text-center text-gray-500">
                            <table className="min-w-full border-collapse">
                                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-100 z-10">
                                    <tr>
                                        <th className="border p-2">No.</th>
                                        <th className="border p-2">Lodge Type</th>
                                        <th className="border p-2">Availability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lodges.map((lodge) => (
                                        <tr key={lodge.number}>
                                            <td className="border p-2 text-center">{lodge.number}</td>
                                            <td className="border p-2 text-center">{lodge.type}</td>
                                            <td className="border p-2 text-center">
                                                <button className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded">
                                                    Check
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end mt-5">
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div> 
            </div>
        </div>
    );
};

CalendarEventModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CalendarEventModal;
