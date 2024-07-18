import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

function Employee() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard"); 
    const [bookingsOpen, setBookingsOpen] = useState(false); 
    const sidebarRef = useRef(null);
    const submenuRef = useRef(null);

    const Menus = [
        { title: "Dashboard", src: "dashboard" },
        { title: "Bookings", src: "booking", submenus: [{ title: "Cottage", src: "cottage" }, { title: "Lodge", src: "lodge" }] },
        { title: "Product", src: "product" },
        { title: "Sales Transaction", src: "report" },
    ];

    useEffect(() => {
        const savedMenu = localStorage.getItem("activeMenu");
        if (savedMenu) {
            setActiveMenu(savedMenu);
        } else {
            setActiveMenu("dashboard");
        }
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                    setBookingsOpen(false); 
                }
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);

    useEffect(() => {
        // Save active menu to localStorage whenever it changes
        localStorage.setItem("activeMenu", activeMenu);
    }, [activeMenu]);

    const handleMenuClick = (src) => {
        if (src === "booking") {
            setBookingsOpen(!bookingsOpen);
        } else {
            setActiveMenu(src);
            setBookingsOpen(false);
        }
    };

    const handleSubMenuClick = (src) => {
        setActiveMenu(src);
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleTempoBtn = () => {
        navigate('/admin');
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

                <div className="flex gap-x-5 items-center bg-[#72BAD5] w-full p-5 shadow-md">
                    <img
                        src="./src/assets/logo.png"
                        className={`cursor-pointer duration-500 w-20 ${!open && "rotate-[360deg]"}`}
                        alt="Logo"
                    />
                    <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>
                        YASAY'S BEACH RESORT
                    </h1>
                </div>

                <ul className="flex flex-col pt-6 p-8 mt-3">
                    {Menus.map((menu, index) => (
                        <li key={index} className="mb-2">
                            <div>
                                <a
                                    href={`#${menu.src}`}
                                    className={`menu-item ${activeMenu === menu.src ? "active" : "inactive"}`}
                                    onClick={() => handleMenuClick(menu.src)}
                                >
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                                        <img
                                            src={`./src/assets/${menu.src}.png`}
                                            className={`w-5 h-5 ${!open ? "minimized-zoom" : ""}`}
                                            alt={menu.title}
                                        />
                                    </span>
                                    <span className={`text-md font-medium ml-2 ${!open && "hidden"}`}>{menu.title}</span>
                                </a>
                                {menu.submenus && bookingsOpen && (
                                    <ul ref={submenuRef} className={`ml-5 transition-all duration-300 ${open ? 'relative' : 'absolute left-[110px] top-[230px]'} bg-gray-100 rounded-lg w-[250px]`}>
                                        {menu.submenus.map((submenu, subIndex) => (
                                            <li key={subIndex}>
                                                <a
                                                    href={`#${submenu.src}`}
                                                    className={`submenu-item ${activeMenu === submenu.src ? "active" : "inactive"}`}
                                                    onClick={() => handleSubMenuClick(submenu.src)}
                                                >
                                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                                                        <img
                                                            src={`./src/assets/${submenu.src}.png`}
                                                            className={`w-5 h-5 ${!open ? "minimized-zoom" : ""}`}
                                                            alt={submenu.title}
                                                        />
                                                    </span>
                                                    <span className="text-md font-medium ml-2">{submenu.title}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="absolute bottom-10 w-full flex justify-center p-8">
                    <div onClick={handleLogout} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-[#70b8d3] hover:bg-[#09B0EF] cursor-pointer">
                        <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} alt="Logout" />
                        {open && (
                            <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">Logout</button>
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

            <div className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
                {/* Dashboard Section */}
                <div id="dashboard" className={`menu-content ${activeMenu === "dashboard" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">DASHBOARD</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
                </div>

                {/* Booking Cottage Section */}
                <div id="booking_cottage" className={`menu-content ${activeMenu === "cottage" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">BOOKING COTTAGE</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
                </div>

                {/* Booking Lodge Section */}
                <div id="booking_lodge" className={`menu-content ${activeMenu === "lodge" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">BOOKING LODGE</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
                </div>

                {/* Product Section */}
                <div id="product" className={`menu-content ${activeMenu === "product" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">PRODUCT</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
                        <div className="lg:ml-30 mb-5 space-x-8">
                                <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                <i><img src="./src/assets/plus.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Add Product</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs xs:text-sm text-gray-900">
                                <span className="text-[13px] font-semibold text-gray-600 uppercase">Show</span>
                                <div className="relative inline-block">
                                    <select className="appearance-none border border-gray-300 bg-white py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option value="1">1</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <img src="./src/assets/down.png" className="fill-current w-4 h-4"/>
                                    </div>
                                </div>
                                <span className="text-[13px] font-semibold text-gray-600 uppercase">entries</span>
                            </div>

                            <div className="flex items-center justify-around">
                                <div className="flex bg-white items-center p-2 rounded-md border">
                                    <img src="./src/assets/search.png" className="fill-current w-5 h-5"/>
                                    <input className="bg-white outline-none ml-1 block" type="text" placeholder="search..." />
                                </div>
                                <div className="lg:ml-30 ml-5 space-x-8">
                                    <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                    <i><img src="./src/assets/upload.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Upload</button>
                                </div>
                            </div>
                        </div>

                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">AVG Price</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">Shampoo</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">10</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">8</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">80</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-3 text-base font-medium rounded-md shadow-md text-white bg-[#70b8d3] hover:bg-[#09B0EF]">
                                                        <img src="./src/assets/edit.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} />
                                                    </button>
                                                    <button className="px-4 py-3 text-base font-medium rounded-md shadow-md text-white bg-[#ED6565] hover:bg-[#F24E4E]">
                                                        <img src="./src/assets/delete.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>    
                                    </tbody>
                                </table>

                                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-end xs:justify-between">
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button className="text-sm text-indigo-50 transition duration-150 hover:bg-[#09B0EF] bg-[#70b8d3] font-semibold py-2 px-4 rounded-l">
                                            Prev
                                        </button>
                                        &nbsp; &nbsp;
                                        <button className="text-sm text-indigo-50 transition duration-150 hover:bg-[#09B0EF] bg-[#70b8d3] font-semibold py-2 px-4 rounded-r">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Transaction Section */}
                <div id="report" className={`menu-content ${activeMenu === "report" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">SALES TRANSACTION</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
                </div>
            </div>
        </div>
    );
}

export default Employee;
