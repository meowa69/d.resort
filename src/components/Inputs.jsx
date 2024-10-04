import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

const Input = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    showDatePicker,
    setShowDatePicker,
    tab,
    setTab,
    persons,
    setPersons,
    selectedOption,
    setSelectedOption,
    showGuestDropdown,
    setShowGuestDropdown,
    rooms,
    setRooms,
    cottages,
    setCottages,
    handleSearch,
    datePickerRef,
    guestDropdownRef,
}) => {

    const formatSelectedDates = (start, end) => {
        if (!start) return '';
        const options = { month: 'short', day: 'numeric' };
        const startFormatted = start.toLocaleDateString('en-US', options);
        const endFormatted = end ? end.toLocaleDateString('en-US', options) : '';
        return `${startFormatted} - ${endFormatted}`;
    };

    const handleDone = () => {
        setShowDatePicker(false);
    };

    return (
        <div className="mx-auto">
            <div className="flex justify-center">
                <div className="mr-4">
                    <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                        <div className="relative">
                            <select
                                className="bg-white border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-96 ps-4 p-4 pr-10 appearance-none"
                                onChange={(e) => setSelectedOption(e.target.value)}
                                value={selectedOption}
                            >
                                <option value="">Select option</option>
                                <option value="Cottage">Cottage</option>
                                <option value="Lodge">Lodge</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <img src="./src/assets/down.png" alt="Dropdown Icon" className="w-5 h-5 text-gray-500" />
                            </span>
                        </div>
                    </form>
                </div>

                {/* Check-in and People inputs */}
                <div className="flex items-center">
                    {/* Check-in input */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Check in - Check out"
                            value={startDate && endDate ? formatSelectedDates(startDate, endDate) : ''}
                            readOnly
                            onClick={() => setShowDatePicker((prev) => !prev)}
                            className="bg-white border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-72 p-4 cursor-pointer"
                        />
                        {/* Date Picker Popup */}
                        {showDatePicker && (
                            <div ref={datePickerRef} className="absolute top-full mt-2 p-4 border rounded-lg shadow-md bg-white z-10">
                                <div className="flex border-b border-gray-300 mb-4">
                                    <button
                                        onClick={() => setTab('calendar')}
                                        className={`px-6 py-3 font-semibold ${tab === 'calendar' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                    >
                                        Calendar
                                    </button>
                                </div>
                                {tab === 'calendar' ? (
                                    <div className="flex flex-col">
                                        <div className="flex gap-4">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => {
                                                    setStartDate(date);
                                                    if (date && endDate && date >= endDate) {
                                                        setEndDate(null);
                                                    }
                                                }}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsStart
                                                inline
                                            />
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsEnd
                                                minDate={startDate}
                                                inline
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    // Removed this section
                                    null
                                    // Removed this section
                                )}

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleDone}
                                        className="bg-[#12B1D1] text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Guests and Rooms/Cottages Dropdown */}
                    <div className="mx-3 relative">
                        <input
                            type="text"
                            readOnly
                            onClick={() => setShowGuestDropdown((prev) => !prev)}
                            value={`${persons} Persons, ${selectedOption === 'Lodge' ? `${rooms} Rooms` : (selectedOption === 'Cottage' ? `${cottages} Cottages` : '')}`}
                            className="bg-white border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-96 p-4 cursor-pointer"
                        />
                        {showGuestDropdown && (
                            <div ref={guestDropdownRef} className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10 w-full">
                                <div className="p-4">
                                    {/* Persons */}
                                    <div className="flex justify-between items-center">
                                        <span>Persons</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setPersons(Math.max(1, persons - 1))}
                                                className="px-2 py-1 bg-gray-200 rounded">-
                                            </button>
                                            <span>{persons}</span>
                                            <button
                                                type="button"
                                                onClick={() => setPersons(persons + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded">+ 
                                            </button>
                                        </div>
                                    </div>

                                    {/* Rooms/Cottages */}
                                    {selectedOption === 'Lodge' && (
                                        <div className="flex justify-between items-center mt-4">
                                            <span>Rooms</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                                                    className="px-2 py-1 bg-gray-200 rounded">-
                                                </button>
                                                <span>{rooms}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setRooms(rooms + 1)}
                                                    className="px-2 py-1 bg-gray-200 rounded">+ 
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {selectedOption === 'Cottage' && (
                                        <div className="flex justify-between items-center mt-4">
                                            <span>Cottages</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setCottages(Math.max(1, cottages - 1))}
                                                    className="px-2 py-1 bg-gray-200 rounded">-
                                                </button>
                                                <span>{cottages}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setCottages(cottages + 1)}
                                                    className="px-2 py-1 bg-gray-200 rounded">+ 
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="">
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="bg-[#12B1D1] text-white px-8 py-4 rounded-md hover:bg-[#3ebae7]"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Input.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    showDatePicker: PropTypes.bool.isRequired,
    setShowDatePicker: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    setTab: PropTypes.func.isRequired,
    flexibleDays: PropTypes.string.isRequired,
    setFlexibleDays: PropTypes.func.isRequired,
    persons: PropTypes.number.isRequired,
    setPersons: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
    showGuestDropdown: PropTypes.bool.isRequired,
    setShowGuestDropdown: PropTypes.func.isRequired,
    rooms: PropTypes.number.isRequired,
    setRooms: PropTypes.func.isRequired,
    cottages: PropTypes.number.isRequired,
    setCottages: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    datePickerRef: PropTypes.object.isRequired,
    guestDropdownRef: PropTypes.object.isRequired,
};

export default Input;
