import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Input from './components/Inputs';
import CottageSlider from './OnlineBookingSlider/CottageSlider';
import LodgeSlider from './OnlineBookingSlider/LodgeSlider';
import ImgSlider from './OnlineBookingSlider/ImgSlider';

function Booking() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);
    const [tab, setTab] = useState('calendar');
    const [adults, setAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [cottages, setCottages] = useState(1);
    const [flexibleDays, setFlexibleDays] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const datePickerRef = useRef(null);
    const guestDropdownRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (
            datePickerRef.current &&
            !datePickerRef.current.contains(e.target) &&
            !guestDropdownRef.current.contains(e.target)
        ) {
            setShowDatePicker(false);
            setShowGuestDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSearch = () => {
        if (selectedOption === 'Cottage') {
            navigate('/cottage');
        } else if (selectedOption === 'Lodge') {
            navigate('/lodge');
        } else {
            alert('Please select an option');
        }
    };

    return (
        <div className="min-h-screen flex-col bg-white">
            <Header />
            <Input
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                tab={tab}
                setTab={setTab}
                flexibleDays={flexibleDays}
                setFlexibleDays={setFlexibleDays}
                adults={adults}
                setAdults={setAdults}
                numChildren={numChildren} 
                setNumChildren={setNumChildren}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                showGuestDropdown={showGuestDropdown}
                setShowGuestDropdown={setShowGuestDropdown}
                rooms={rooms}
                setRooms={setRooms}
                cottages={cottages}
                setCottages={setCottages}
                handleSearch={handleSearch}
                datePickerRef={datePickerRef}
                guestDropdownRef={guestDropdownRef}
            />
            <div className="mx-auto mt-8">
                <div className="bg-gradient-to-r from-[#1089D3] to-[#12B1D1] p-6 rounded-lg flex space-x-6 items-center justify-between w-full max-w-[1200px] mx-auto mt-16">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-white font-semibold font-lemon text-xl">
                            Find and book your perfect stay
                        </h2>
                    </div>
                    <div>
                        <div className="bg-[#ebf6f8] p-4 rounded-lg flex items-center space-x-2 h-[80px]">
                            <img src="./src/assets/calendar.png" className="w-10 h-10" />
                            <p className="text-black text-[15px] p-2">Free cancellation options if plans change</p>
                        </div>
                    </div>
                </div>
                <div>
                    <CottageSlider />
                    <LodgeSlider />
                </div>
                <div className="mt-20">
                    <ImgSlider />
                </div>
                <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center w-full max-w-[1200px] mx-auto mt-20">
                    <div className="w-1/3">
                        <img src="./src/assets/sample6.jpg" alt="Resort" className="rounded-lg" />
                    </div>
                    <div className="w-2/3 ml-10">
                        <h2 className="text-2xl font-bold mb-2">Enjoy your stay at our Resort</h2>
                        <p className="text-gray-600 mb-4">
                            Experience luxurious amenities and breathtaking views at our exclusive resort.
                        </p>
                        <button href="#" className="bg-[#09B0EF] hover:bg-[#3ebae7] text-white px-4 py-2 rounded-md transition-colors font-semibold">
                            Learn More
                        </button>
                    </div>
                </div> 
            </div>
            <Footer />
        </div>
    );
}

export default Booking;
