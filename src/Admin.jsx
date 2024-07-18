import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Admin() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tableRows, setTableRows] = useState([]);
    const [clickedCell, setClickedCell] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const handleAddRow = () => {
        const newRow = {
            id: tableRows.length + 1,
            name: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
        };
        setTableRows([...tableRows, newRow]);

        if ((tableRows.length + 1) > currentPage * rowsPerPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClick = (rowIndex, colIndex) => {
        setClickedCell({ rowIndex, colIndex });
    };

    const handleDeleteRow = (rowId) => {
        const updatedRows = tableRows.filter(row => row.id !== rowId).map((row, index) => ({
            ...row,
            id: index + 1
        }));
        setTableRows(updatedRows);

        if (updatedRows.length <= (currentPage - 1) * rowsPerPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (updatedRows.length === 0) {
            setCurrentPage(1);
        }
    };

    const Menus = [
        { title: "Dashboard", src: "dashboard" },
        { title: "Register Employee", src: "add" },
        { title: "Employee List", src: "group" },
        { title: "Attendance", src: "calendar" },
        { title: "Work Schedules", src: "clock" },
        { title: "Sales Report", src: "report" },
        { title: "Payroll", src: "money" },
    ];

    useEffect(() => {
        const savedMenu = localStorage.getItem("activeMenu");
        if (savedMenu) {
            setActiveMenu(savedMenu);
        } else {
            setActiveMenu("dashboard");
        }

        const handleClickOutside = (event) => {
            if (!event.target.closest('td')) {
                setClickedCell(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleMenuClick = (src) => {
        setActiveMenu(src);
        localStorage.setItem("activeMenu", src);
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleTempoNav = () => {
        navigate('/employee');
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = currentPage * rowsPerPage;
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);

    return (
        <div className="min-h-screen flex flex-row bg-white">
            <div className={`${open ? "w-[330px]" : "w-[110px]"} duration-300 h-screen bg-white relative shadow-lg`}>
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
                        </li>
                    ))}

                    <div className="flex w-full justify-center relative top-[325px]">
                        <div onClick={handleLogout} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-[#70b8d3] hover:bg-[#09B0EF] cursor-pointer">
                            <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} />
                            {open && (
                                <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">Logout</button>
                            )}
                        </div>
                    </div>


                    <div className="flex w-full justify-center relative top-[200px]">
                        <div onClick={handleTempoNav} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-[#70b8d3] hover:bg-[#09B0EF] cursor-pointer">
                            <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} alt="Navigate"/>
                            {open && (
                                <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">TempoBtn to Employee</button>
                            )}
                        </div>
                    </div>
                </ul>
            </div>

            <div className="p-7 pl-10 flex-1 h-screen ">
                {/* Dashboard Section */}
                <div id="dashboard" className={`menu-content ${activeMenu === "dashboard" ? "block" : "hidden"} `}>
                    <h1 className="text-4xl font-bold mb-4">DASHBOARD</h1>
                    <p>This is the dashboard section content.</p>
                </div>

                {/* Rigester Employee Section */}
                <div id="add" className={`menu-content ${activeMenu === "add" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">REGISTER EMPLOYEE</h1>
                    <div className="mt-[50px] h-[770px] border-2 border-gray-400 rounded-[10px] flex justify-around p-[85px] ">
                        <div className="w-[550px] h-[590px] border border-black rounded-[10px] bg-white">
                            <p className="absolute top-[170px] text-black font-semibold text-[17px]">Place your finger on the scanner</p>
                            <p className="absolute bottom-[150px] text-black font-semibold text-[17px]">Please give fingerprint sample</p>
                        </div>

                        <div className="flex-col">
                            <div className="w-[700px] h-[450px] border border-black rounded-[10px] bg-white p-8">
                                <h2 className="text-2xl font-bold mb-4">Employee Information</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" id="name" name="name" className="mt-1 p-2 w-full border border-black rounded bg-white" />
                                    </div>
                                    <div>
                                        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID</label>
                                        <input type="text" id="employeeId" name="employeeId" className="mt-1 p-2 w-full border border-black rounded bg-white" />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <input type="text" id="address" name="address" className="mt-1 p-2 w-full border border-black rounded bg-white" />
                                    </div>
                                    <div>
                                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                        <input type="text" id="mobileNumber" name="mobileNumber" className="mt-1 p-3 w-full border border-black rounded bg-white" />
                                    </div>
                                </form>
                            </div>

                            <div className="mt-5 w-full flex justify-end gap-5">
                                <button type="submit" className="px-5 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#70b8d3] hover:bg-[#09B0EF]">
                                    Register
                                </button>

                                <button type="submit" className="px-5 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#ED6565] hover:bg-[#F24E4E]">
                                    Cancel
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>

                {/* Employee List Section */}
                <div id="group" className={`menu-content ${activeMenu === "group" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">EMPLOYEE LIST</h1>   
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
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
                                <div className="lg:ml-30 ml-10 space-x-8">
                                    <button className="bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">+ New</button>
                                </div>
                            </div>
                        </div>

                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee ID</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile Number</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">Angelo Y. Yasay</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">293d1</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">Opol</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">09727892101</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <div className="flex space-x-4">
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

                {/* Attendance Section */}
                <div id="calendar" className={`menu-content ${activeMenu === "calendar" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">ATTENDANCE</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-around">
                                <div className="lg:ml-30 space-x-8 mr-3">
                                    <button className="flex items-center gap-2 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                    <i><img src="./src/assets/download.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Download</button>
                                </div>

                                <div className="lg:ml-30 space-x-8 mr-3">
                                    <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                    <i><img src="./src/assets/plus.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Print</button>
                                </div>
                            </div>
                        </div>

                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee ID</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time in</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time out</th>
                                            <th className="px-5 py-3 border-b-2  border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">1</p>
                                            </td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">Angelo Y. Yasay</p>
                                            </td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">293d1</p>
                                            </td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">07/06/2024</p>
                                            </td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">10:30 am</p>
                                            </td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">3:00 pm</p>
                                            </td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">
                                                <div className="flex space-x-4">
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

                {/* Work Schedule Section */}
                <div id="clock" className={`menu-content ${activeMenu === "clock" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">WORK SCHEDULES</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
                        <div className="flex items-center justify-between">
                            {/* Buttons for Download, Print, Clear */}
                            <div className="flex items-center justify-around">
                                <div className="lg:ml-30 space-x-8 mr-3">
                                    <button className="flex items-center gap-2 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                        <i><img src="./src/assets/download.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Download
                                    </button>
                                </div>

                                <div className="lg:ml-30 space-x-8 mr-3">
                                    <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                        <i><img src="./src/assets/plus.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Print
                                    </button>
                                </div>

                                <div className="lg:ml-30 space-x-8 mr-3">
                                    <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                        <i><img src="./src/assets/clear.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Clear
                                    </button>
                                </div>
                            </div>

                            {/* Date Pickers */}
                            <div className="flex space-x-3">
                                <div>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="border-2 border-gray-300 p-2 rounded-md"
                                        id="startDate"
                                        placeholderText="Select Start Date"
                                    />
                                </div>

                                <div>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className="border-2 border-gray-300 p-2 rounded-md"
                                        id="endDate"
                                        placeholderText="Select End Date"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="clmn">#</th>
                                            <th className="clmn">Name</th>
                                            <th className="clmn">Monday</th>
                                            <th className="clmn">Tuesday</th>
                                            <th className="clmn">Wednesday</th>
                                            <th className="clmn">Thursday</th>
                                            <th className="clmn">Friday</th>
                                            <th className="clmn">Saturday</th>
                                            <th className="clmn">Sunday</th>
                                            <th className="clmn">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableRows.slice(startIndex, endIndex).map((row, rowIndex) => (
                                            <tr key={row.id}>
                                                {['index', 'name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'status'].map((col, colIndex) => (
                                                    <td
                                                        key={col}
                                                        className={`px-5 py-5 border-b border-r bg-white text-sm cursor-pointer ${clickedCell && clickedCell.rowIndex === rowIndex && clickedCell.colIndex === colIndex ? 'border-blue-500' : ''}`}
                                                        onClick={() => handleClick(rowIndex, colIndex)}
                                                    >
                                                        {col === 'index' ? (
                                                            <p className="text-center text-gray-900 whitespace-no-wrap">{rowIndex + startIndex + 1}</p>
                                                        ) : col === 'status' ? (
                                                            <div className="flex justify-center space-x-2">
                                                                <button className="px-3 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#70b8d3] hover:bg-[#09B0EF]">
                                                                    <img src="./src/assets/edit.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} />
                                                                </button>
                                                                <button
                                                                    className="px-3 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#ED6565] hover:bg-[#F24E4E]"
                                                                    onClick={() => handleDeleteRow(row.id)}
                                                                >
                                                                    <img src="./src/assets/delete.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <p className="text-center text-gray-900 whitespace-no-wrap">{row[col]}</p>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            
                            <div className="add-design w-fulll">
                                <button onClick={handleAddRow} className="w-full flex uppercase justify-center items-center gap-2 rounded-m font-semibold tracking-wide cursor-pointer">
                                    <i><img src="./src/assets/tab.png" className="fill-current w-4 h-4" /></i>Add
                                </button>
                            </div>
                        </div>

                            {/* Pagination buttons */}
                            <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-end xs:justify-between">
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className={`text-sm text-indigo-50 transition duration-150 hover:bg-[#09B0EF] bg-[#70b8d3] font-semibold py-2 px-4 rounded-l cursor-pointer`}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index + 1}
                                                className={`text-sm ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-gray-100'} transition duration-150 hover:bg-gray-400 font-semibold py-2 px-4 cursor-pointer`}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                    <button
                                        className={`text-sm text-indigo-50 transition duration-150 hover:bg-[#09B0EF] bg-[#70b8d3] font-semibold py-2 px-4 rounded-r cursor-pointer`}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={endIndex >= tableRows.length}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Sales Report Section */}
                <div id="report" className={`menu-content ${activeMenu === "report" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">SALES REPORT</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
                </div>

                  {/* Payroll */}
                <div id="report" className={`menu-content ${activeMenu === "money" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">PAYROLL</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
