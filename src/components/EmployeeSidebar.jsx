import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

function EmployeeSidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const sidebarRef = useRef(null);
    
    const Menus = [
        { title: "Dashboard", src: "EmployeeDash", path:"dashboard"},
        { title: "Reservation", src: "EmployeeBooking", path:"booking"},
        { title: "Product", src: "EmployeeProduct", path:"product"},
        { title: "Sales Report", src: "EmployeeReport", path:"report"},
    ];

    useEffect(() => {
        const savedMenu = localStorage.getItem("activeMenu");
        if (savedMenu) {
            setActiveMenu(savedMenu);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("activeMenu", activeMenu);
    }, [activeMenu]);

    const handleMenuClick = (src) => {
        setActiveMenu(src);
        navigate(`/${src}`); 
    };
    
    const handleLogout = () => {
        navigate('/');
    };

    const handleTempoBtn = () => {
        navigate('/AdminDash');
    };

    const handleTempoBtnToBooking = () => {
        navigate('/Booking');
    };

    return (
        <div className="min-h-screen flex flex-row bg-white">
            <div ref={sidebarRef} className={`${open ? "w-[330px]" : "w-[110px]"} duration-300 h-screen bg-white relative shadow-lg`}>
                <img
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer rounded-full right-[-13px] top-[50px] w-7 ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt="Toggle Sidebar"
                />

                <div className="flex gap-x-5 items-center bg-gradient-to-r from-[#1089D3] to-[#12B1D1] w-full p-5 shadow-md">
                    <img
                        src="./src/assets/logo.png"
                        className={`cursor-pointer duration-500 w-20 ${!open && "rotate-[360deg]"}`}
                        alt="Logo"
                    />
                    <h1 className={`text-white origin-left font-bold text-xl duration-300 ${!open && "scale-0"}`}>
                        D.YASAY BEACH RESORT
                    </h1>
                </div>

                <ul className="flex flex-col pt-6 p-8 mt-3">
                    {Menus.map((menu, index) => (
                        <li key={index} className="mb-2">
                            <a
                                className={`menu-item cursor-pointer ${activeMenu === menu.src ? "active" : "inactive"}`}
                                onClick={() => handleMenuClick(menu.src)}
                            >
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                                    <img 
                                        src={`./src/assets/${menu.path}.png`} 
                                        className={`w-5 h-5 ${!open ? "minimized-zoom" : ""}`} 
                                        alt={menu.title} 
                                    />
                                </span>
                                <span className={`text-md font-semibold ml-1 ${!open && "hidden"}`}>{menu.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="absolute bottom-10 w-full flex justify-center p-8">
                    <div onClick={handleLogout} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-gradient-to-r from-[#1089D3] to-[#12B1D1] hover:to-[#0f8bb1] cursor-pointer">
                        <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} alt="Logout" />
                        {open && (
                            <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">Logout</button>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-[160px] w-full flex justify-center p-8">
                    <div onClick={handleTempoBtnToBooking} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-[#70b8d3] hover:bg-[#09B0EF] cursor-pointer">
                        <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} alt="Logout" />
                        {open && (
                            <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">Online Booking</button>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-[100px] w-full flex justify-center p-8">
                    <div onClick={handleTempoBtn} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-[#70b8d3] hover:bg-[#09B0EF] cursor-pointer">
                        <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} alt="Logout" />
                        {open && (
                            <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">TempoBtn to Admin</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeSidebar;
