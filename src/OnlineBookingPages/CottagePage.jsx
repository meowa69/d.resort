import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Inputs";
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function CottagePage() {
    const navigate = useNavigate();
    
    // Simulate user authentication state (null means not logged in)
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tab, setTab] = useState('calendar');
    const [flexibleDays, setFlexibleDays] = useState('');
    const [persons, setPersons] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [cottages, setCottages] = useState(1);

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

    const handleBook = () => {
        navigate('/payment');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
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
                persons={persons}
                setPersons={setPersons}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                showGuestDropdown={showGuestDropdown}
                setShowGuestDropdown={setShowGuestDropdown}
                rooms={rooms}
                setRooms={setRooms}
                cottages={cottages}
                setCottages={setCottages}
                handleSearch={() => console.log('Search initiated')}
            />
            <div className="flex-grow">
                <div className="w-full max-w-[1200px] mx-auto mt-10 flex justify-end">
                    <div className="w-1/3 relative">
                        <select 
                            id="sort-by" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 appearance-none"
                            style={{ paddingTop: '20px', paddingLeft: '10px' }}  
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price-low-high">Price: low to high</option>
                            <option value="price-high-low">Price: high to low</option>
                        </select>

                        <span className="absolute left-3 top-0 font-bold pt-1 text-gray-500 text-xs pointer-events-none">
                            Sort by
                        </span>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <img src="./src/assets/down.png" alt="Dropdown Icon" className="w-5 h-5 text-gray-500" />
                        </span>
                    </div>
                </div>

                <div className="w-full max-w-[1200px] flex items-start mx-auto mt-5 space-x-4">
                    {/* Sidebar for filters */}
                    <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Filter by</h3>
                       
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Price Range</h4>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" name="price" className="mr-2" />
                                    Under $100 per night
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" name="price" className="mr-2" />
                                    $100 - $200 per night
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" name="price" className="mr-2" />
                                    $200 and above
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Availability</h4>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Available on selected dates
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="w-3/4 flex flex-col space-y-4">
                        <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center mx-auto">
                            <div className="w-1/3">
                                <img src="./src/assets/sample6.jpg" alt="Resort" className="rounded-lg" />
                            </div>
                            <div className="w-2/3 ml-10">
                                <h2 className="text-2xl font-bold mb-2">Enjoy your stay at our Resort</h2>
                                <p className="text-gray-600 mb-4">
                                    Experience luxurious amenities and breathtaking views at our exclusive resort.
                                </p>
                                <p className="text-lg font-semibold mb-2">$199 per night</p>
                                <div className="flex space-x-2">
                                    <button onClick={handleBook} className="bg-[#09B0EF] hover:bg-[#3ebae7] text-white px-4 py-2 rounded-md transition-colors font-semibold">
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center mx-auto">
                            <div className="w-1/3">
                                <img src="./src/assets/sample6.jpg" alt="Resort" className="rounded-lg" />
                            </div>
                            <div className="w-2/3 ml-10">
                                <h2 className="text-2xl font-bold mb-2">Enjoy your stay at our Resort</h2>
                                <p className="text-gray-600 mb-4">
                                    Experience luxurious amenities and breathtaking views at our exclusive resort.
                                </p>
                                <p className="text-lg font-semibold mb-2">$199 per night</p>
                                <div className="flex space-x-2">
                                    <button onClick={handleBook} className="bg-[#09B0EF] hover:bg-[#3ebae7] text-white px-4 py-2 rounded-md transition-colors font-semibold">
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center mx-auto">
                            <div className="w-1/3">
                                <img src="./src/assets/sample6.jpg" alt="Resort" className="rounded-lg" />
                            </div>
                            <div className="w-2/3 ml-10">
                                <h2 className="text-2xl font-bold mb-2">Enjoy your stay at our Resort</h2>
                                <p className="text-gray-600 mb-4">
                                    Experience luxurious amenities and breathtaking views at our exclusive resort.
                                </p>
                                <p className="text-lg font-semibold mb-2">$199 per night</p>
                                <div className="flex space-x-2">
                                    <button onClick={handleBook} className="bg-[#09B0EF] hover:bg-[#3ebae7] text-white px-4 py-2 rounded-md transition-colors font-semibold">
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CottagePage;
