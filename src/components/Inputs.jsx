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
    flexibleDays,
    setFlexibleDays,
    adults,
    setAdults,
    children,
    setChildren,
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
        <div className="mx-auto mt-8">
            <div className="flex justify-center mt-4">
                <div className="mr-4">
                    <form>
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
                                    <button
                                        onClick={() => setTab('flexible')}
                                        className={`px-6 py-3 font-semibold ${tab === 'flexible' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                    >
                                        Flexible
                                    </button>
                                </div>
                                {tab === 'calendar' ? (
                                    <div className="flex gap-4">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsStart
                                            inline
                                            className="border border-gray-300 rounded-md"
                                        />
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsEnd
                                            minDate={startDate}
                                            inline
                                            className="border border-gray-300 rounded-md"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-lg font-bold mb-4">How long do you want to stay?</h2>
                                        <div className="flex space-x-4">
                                            {['1 night', '2-3 nights', '4-5 nights', '6-7 nights'].map((dayOption) => (
                                                <button
                                                    key={dayOption}
                                                    onClick={() => setFlexibleDays(dayOption)}
                                                    className={`px-4 py-2 border border-gray-300 rounded-md font-semibold ${flexibleDays === dayOption ? 'bg-blue-500 text-white' : 'text-gray-900'}`}
                                                >
                                                    {dayOption}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleDone}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Guests and Rooms/Cottages Dropdown */}
                    <div className="mx-4 relative">
                        <input
                            type="text"
                            readOnly
                            onClick={() => setShowGuestDropdown((prev) => !prev)}
                            value={`${adults} Adults, ${children} Children, ${selectedOption === 'Lodge' ? rooms : (selectedOption === 'Cottage' ? cottages : 'N/A')} ${selectedOption === 'Lodge' ? (rooms > 1 ? 'Rooms' : 'Room') : (selectedOption === 'Cottage' ? (cottages > 1 ? 'Cottages' : 'Cottage') : '')}`}
                            className="bg-white border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-96 p-4 cursor-pointer"
                        />
                    {showGuestDropdown && (
                        <div ref={guestDropdownRef} className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10 w-full">
                            <div className="p-4">
                                {/* Adults */}
                                <div className="flex justify-between items-center">
                                    <span>Adults</span>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setAdults(Math.max(1, adults - 1))}
                                            className="px-2 py-1 bg-gray-200 rounded">-
                                         </button>
                                        <span>{adults}</span>
                                        <button
                                            type="button"
                                            onClick={() => setAdults(adults + 1)}
                                            className="px-2 py-1 bg-gray-200 rounded">+
                                        </button>
                                    </div>
                                </div>

                                {/* Children */}
                                <div className="flex justify-between items-center mt-4">
                                    <span>Children</span>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setChildren(Math.max(0, children - 1))}
                                            className="px-2 py-1 bg-gray-200 rounded">-
                                        </button>
                                        <span>{children}</span>
                                        <button
                                            type="button"
                                            onClick={() => setChildren(children + 1)}
                                            className="px-2 py-1 bg-gray-200 rounded">+
                                        </button>
                                    </div>
                                </div>

                                                {/* Rooms or Cottages */}
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
                </div>

                {/* Move the Search button here */}
                <div className="flex justify-center items-center w-[100px] h-[55px] rounded-md shadow-md bg-[#09B0EF] hover:bg-[#3ebae7] cursor-pointer ml">
                    <button className="text-white font-semibold" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

// Adding PropTypes for validation
Input.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    showDatePicker: PropTypes.bool.isRequired,
    setShowDatePicker: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    setTab: PropTypes.func.isRequired,
    flexibleDays: PropTypes.string,
    setFlexibleDays: PropTypes.func.isRequired,
    adults: PropTypes.number.isRequired,
    setAdults: PropTypes.func.isRequired,
    children: PropTypes.number.isRequired,
    setChildren: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
    showGuestDropdown: PropTypes.bool.isRequired,
    setShowGuestDropdown: PropTypes.func.isRequired,
    rooms: PropTypes.number.isRequired,
    setRooms: PropTypes.func.isRequired,
    cottages: PropTypes.number.isRequired,
    setCottages: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    datePickerRef: PropTypes.object,
    guestDropdownRef: PropTypes.object,
};

export default Input;
