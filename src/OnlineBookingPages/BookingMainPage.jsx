import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Inputs';
import CottageSlider from '../OnlineBookingSlider/CottageSlider';
import LodgeSlider from '../OnlineBookingSlider/LodgeSlider';
import ImgSlider from '../OnlineBookingSlider/ImgSlider';
import Loader from '../components/Loader';
import MapComponent from '../components/Map';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

function BookingMainPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);
    const [persons, setPersons] = useState(0);
    const [numChildren, setNumChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [cottages, setCottages] = useState(1);
    const [flexibleDays, setFlexibleDays] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [tab, setTab] = useState('calendar'); 
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

    const handleAboutUs = () => {
        navigate('/about-us');
    };

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); 
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex-col bg-white">
            <div className="w-full relative flex justify-center mt-auto">
                <Header isMainPage={true} />
                <Swiper
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="w-full h-[820px] shadow-lg relative"
                >
                    <SwiperSlide>
                        <img src="./src/assets/sample1.jpg" alt="Slideshow Image 1" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-30" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./src/assets/sample2.jpg" alt="Slideshow Image 2" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-30" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./src/assets/sample3.jpg" alt="Slideshow Image 3" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-30" />
                    </SwiperSlide>
                </Swiper>

                {/* Overlay Text - centered over the slider */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-white font-bold text-4xl md:text-6xl px-4 py-2 rounded-lg text-center font-lemon">
                        Enjoy your stay at D.Yasay <br />
                        <a className="mt-2 block">Beach Resort</a>

                        <a className="text-[20px] font-sans font-normal">Experience the perfect blend of relaxation and adventure by the sea. <span className="font-bold">Book now!</span></a>
                    </h1>
                </div>



                <div className="absolute bottom-[-100px] bg-white border shadow mt-auto p-[70px] rounded-md z-20">
                    <Input
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        showDatePicker={showDatePicker}
                        setShowDatePicker={setShowDatePicker}
                        flexibleDays={flexibleDays}
                        setFlexibleDays={setFlexibleDays}
                        persons={persons}
                        setPersons={setPersons}
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
                        tab={tab} 
                        setTab={setTab} 
                    />
                </div>
            </div>

            <div className="mx-auto mt-40">
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

                    <div className="mt-20">
                        <ImgSlider />
                    </div>
                    
                    <LodgeSlider />
                </div>
                <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center w-full max-w-[1200px] mx-auto mt-20">
                    <div className="w-1/3">
                        <div className="">
                            <MapComponent />
                        </div>
                    </div>
                    <div className="w-2/3 ml-10">
                        <h2 className="text-2xl font-bold mb-2">Enjoy your stay at our Resort</h2>
                        <p className="text-gray-600 mb-4">
                            Experience luxurious amenities and breathtaking views at our exclusive resort.
                        </p>
                        <button href="#" className="bg-[#12B1D1] hover:bg-[#3ebae7] text-white px-4 py-2 rounded-md transition-colors font-semibold" onClick={handleAboutUs}>
                            Learn More
                        </button>
                    </div>
                </div>                    
            </div>
            <Footer />
        </div>
    );
}

export default BookingMainPage;
