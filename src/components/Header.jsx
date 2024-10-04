import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Header({ isMainPage }) {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/booking');
    };

    const handleAboutUs = () => {
        navigate('/about-us');
    };

    const handleCottage = () => {
        navigate('/cottage');
    };

    const handleLodge = () => {
        navigate('/lodge');
    };

    return (
        <header className={`w-full ${isMainPage ? 'absolute' : 'relative'} z-20 ${isMainPage ? 'bg-transparent' : 'bg-gradient-to-r from-[#1089D3] to-[#12B1D1] mb-10'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center p-3 px-8">
                <div className="flex items-center space-x-3">
                    <img src="./src/assets/logo.png" alt="logo" className="w-16 h-16" />
                    <h1 className="text-[35px] font-bold font-lemon cursor-pointer text-white">
                        <Link to="/booking">D.Yasay Resort</Link>
                    </h1>
                </div>
                <div className="space-x-4 flex items-center">
                    <button onClick={handleHome} className="shadow-sm border hover:bg-gray-100 hover:text-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
                        Home
                    </button>
                    <button onClick={handleAboutUs} className="shadow-sm border hover:bg-gray-100 hover:text-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
                        About Us
                    </button>
                    {isMainPage && (
                        <>
                            <button onClick={handleCottage} className="shadow-sm border hover:bg-gray-100 hover:text-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
                                Cottage
                            </button>
                            <button onClick={handleLodge} className="shadow-sm border hover:bg-gray-100 hover:text-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
                                Lodge
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
