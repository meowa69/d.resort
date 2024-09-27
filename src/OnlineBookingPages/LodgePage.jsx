import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Inputs";
import Loader from '../components/Loader';


function LodgePage() {
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
        }, 2000); // Adjust the duration of the loader here
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

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

export default LodgePage;
