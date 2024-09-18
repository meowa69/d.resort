import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gradient-to-r from-[#1089D3] to-[#12B1D1] w-full h-full shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-3 px-8">
                <div className="flex items-center space-x-3">
                    <img src="./src/assets/logo.png" alt="logo" className="w-16 h-16" />
                    <h1 className="bg-clip-text text-transparent bg-white text-[35px] font-bold font-lemon cursor-pointer">
                        <Link to="/">D.Yasay Resort</Link>
                    </h1>
                </div>
                <div className="space-x-4 flex items-center">
                    <button className="shadow-sm border hover:bg-gray-100 hover:text-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
                        Register
                    </button>
                    <button className="shadow-sm border hover:bg-gray-100 hover:text-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
                        Sign in
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
