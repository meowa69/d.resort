import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Inputs";

function LodgePage(props) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <div className="flex-grow">
                <Input {...props} />
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
