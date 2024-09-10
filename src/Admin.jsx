import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { saveAs } from 'file-saver';
import ExcelJS from "exceljs";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';

function Admin() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [tableRows, setTableRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [date, setDate] = useState(); 
    const [modalData, setModalData] = useState({
        name: '',
        schedule: {
            monday: { startTime: null, endTime: null, duty: '', dayOff: false },
            tuesday: { startTime: null, endTime: null, duty: '', dayOff: false },
            wednesday: { startTime: null, endTime: null, duty: '', dayOff: false },
            thursday: { startTime: null, endTime: null, duty: '', dayOff: false },
            friday: { startTime: null, endTime: null, duty: '', dayOff: false },
            saturday: { startTime: null, endTime: null, duty: '', dayOff: false },
            sunday: { startTime: null, endTime: null, duty: '', dayOff: false },
        }
    });
    
    const rowsPerPage = 7;

    useEffect(() => {
        const savedMenu = localStorage.getItem("activeMenu");
        if (savedMenu) {
            setActiveMenu(savedMenu);
        } else {
            setActiveMenu("dashboard");
        }

        const handleClickOutside = (event) => {
            if (!event.target.closest('td')) {
                // If needed, any logic that was in `handleClick` can be placed here
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Update the current time every second
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            clearInterval(intervalId); // Cleanup interval on component unmount
        };
    }, []);

    const handleMenuClick = (src) => {
        setActiveMenu(src);
        localStorage.setItem("activeMenu", src);
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleTempoBtn = () => {
        navigate('/Employee');
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = currentPage * rowsPerPage;
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleModalSubmit = (e) => {
        e.preventDefault();
        const sanitizedSchedule = Object.keys(modalData.schedule).reduce((acc, day) => {
            const schedule = modalData.schedule[day];
            acc[day] = {
                ...schedule,
                startTime: schedule.startTime ? schedule.startTime : null,
                endTime: schedule.endTime ? schedule.endTime : null,
            };
            return acc;
        }, {});
    
        handleAddRow({
            ...modalData,
            schedule: sanitizedSchedule
        });
    
        setModalData({
            name: '',
            schedule: {
                monday: { startTime: null, endTime: null, duty: '', dayOff: false },
                tuesday: { startTime: null, endTime: null, duty: '', dayOff: false },
                wednesday: { startTime: null, endTime: null, duty: '', dayOff: false },
                thursday: { startTime: null, endTime: null, duty: '', dayOff: false },
                friday: { startTime: null, endTime: null, duty: '', dayOff: false },
                saturday: { startTime: null, endTime: null, duty: '', dayOff: false },
                sunday: { startTime: null, endTime: null, duty: '', dayOff: false },
            }
        });
        closeModal();
    };

    const handleAddRow = (newRow) => {
        setTableRows([...tableRows, { id: tableRows.length + 1, ...newRow }]);
        if ((tableRows.length + 1) > currentPage * rowsPerPage) {
            setCurrentPage(currentPage + 1);
        }
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

    const handleClearTable = () => {
        setTableRows([]); // Clear all rows
        setCurrentPage(1); // Reset pagination to the first page
    };

    const Menus = [
        { title: "Dashboard", src: "dashboard" },
        { title: "Register Employee", src: "add" },
        { title: "Employee List", src: "group" },
        { title: "Attendance", src: "calendar" },
        { title: "Work Schedules", src: "clock" },
        { title: "Report", src: "report" },
        { title: "Payroll", src: "money" },
    ];

    // Function to handle Excel download using ExcelJS
    const handleDownloadExcel = async () => {
        // Create a new workbook and add a worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Work Schedules');

        // Add header row
        worksheet.addRow(["#", "Name", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

        // Add data rows
        tableRows.forEach((row, index) => {
            worksheet.addRow([
                index + 1,
                row.name,
                ...['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                    const { startTime, endTime, duty, dayOff } = row.schedule[day];
                    if (dayOff) return "Day Off";
                    if (startTime && endTime) return `${startTime.format('hh:mm A')} - ${endTime.format('hh:mm A')}`;
                    return duty || "";
                })
            ]);
        });

        // Write the Excel file to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Create a Blob from the buffer and trigger the download
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'work_schedules.xlsx');
    };

    // Function to handle Word download
    const handleDownloadWord = async () => {
        try {
            console.log("Creating Word document...");
            
            // Create a new Word document
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph("Work Schedules"),
                            new Table({
                                rows: [
                                    new TableRow({
                                        children: ["#", "Name", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(text => (
                                            new TableCell({
                                                width: { size: 1000, type: WidthType.DXA },
                                                children: [new Paragraph(text)],
                                            })
                                        ))
                                    }),
                                    ...tableRows.map((row, index) => (
                                        new TableRow({
                                            children: [
                                                new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                                                new TableCell({ children: [new Paragraph(row.name)] }),
                                                ...['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                                                    const { startTime, endTime, duty, dayOff } = row.schedule[day];
                                                    let cellContent = "";
                                                    if (dayOff) cellContent = "Day Off";
                                                    else if (startTime && endTime) cellContent = `${startTime.format('hh:mm A')} - ${endTime.format('hh:mm A')}`;
                                                    else if (duty) cellContent = duty;
                                                    return new TableCell({ children: [new Paragraph(cellContent)] });
                                                })
                                            ]
                                        })
                                    ))
                                ],
                            })
                        ],
                    },
                ],
            });
    
            // Pack the document into a blob
            const blob = await Packer.toBlob(doc);
            console.log("Word document packed into blob.");
    
            // Trigger the download
            saveAs(blob, 'work_schedules.docx');
            console.log("Word document downloaded.");
    
        } catch (error) {
            console.error("Error creating or downloading the Word document:", error);
        }
    };

    // Function to handle modal download choice
    const handleDownloadChoice = (fileType) => {
        if (fileType === 'excel') {
            handleDownloadExcel();
        } else if (fileType === 'word') {
            handleDownloadWord();
        }
        setShowModal(false); 
    };
    
    return (
        <div className="min-h-screen flex flex-row bg-white">
            <div className={`${open ? "w-[330px]" : "w-[110px]"} duration-300 h-screen bg-white relative shadow-lg`}>
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
                    <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>YASAY BEACH RESORT</h1>
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
                        <div onClick={handleLogout} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-gradient-to-r from-[#1089D3] to-[#12B1D1] hover:to-[#0f8bb1] cursor-pointer">
                            <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} />
                            {open && (
                                <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">Logout</button>
                            )}
                        </div>
                    </div>

                    <div className="flex w-full justify-center relative top-[200px]">
                        <div onClick={handleTempoBtn} className="flex justify-center items-center gap-1 px-3 py-3 w-[232px] rounded-[5px] shadow-md bg-[#70b8d3] hover:bg-[#09B0EF] cursor-pointer">
                            <img src="./src/assets/logout.png" className="fill-current w-5 h-5" style={{ filter: 'invert(100%)' }} />
                            {open && (
                                <button className="rounded-md text-white font-semibold tracking-wide cursor-pointer">Tempo to Employee</button>
                            )}
                        </div>
                    </div>
                </ul>
            </div>

            <div className="p-7 pl-10 flex-1 h-screen ">
                {/* Dashboard Section */}
                <div id="dashboard" className={`menu-content ${activeMenu === "dashboard" ? "block" : "hidden"} `}>
                    <h1 className="text-4xl font-bold mb-4">DASHBOARD</h1>

                    <div className="flex justify-between">
                        <div>
                            {/* other content here */}
                        </div>

                        <div className="flex-col">
                            <div className="w-100 p-6 bg-white shadow-lg rounded-lg border border-gray-200 mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">Calendar</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    value={date} // Ensure this is a dayjs object
                                    onChange={(newValue) => setDate(newValue)} // Handle the change properly
                                />
                            </LocalizationProvider>
                            </div>

                            <div className=" w-100  p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4 border-b pb-2 border-gray-200 justify-between">
                                    <h2 className="text-2xl font-semibold text-gray-800">Attendance Tracker</h2>
                                    <div className="text-gray-600 text-xl font-mono ">{currentTime.toLocaleTimeString()}</div>
                                </div>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time In</th>
                                            <th className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time Out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example Row */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">1</td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">John Doe</td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">2024-09-10</td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">08:00 AM</td>
                                            <td className="px-5 py-5 border-b  border-r border-gray-200 bg-white text-sm">05:00 PM</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
                        <div className="flex items-center justify-around">
                            <div className="lg:ml-30 space-x-8 mr-3">
                                <button className="flex items-center gap-2 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                                onClick={() => setShowModal(true)}>
                                    <i><img src="./src/assets/download.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Download
                                </button>
                            </div>

                            <div className="lg:ml-30 space-x-8 mr-3">
                                <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                    <i><img src="./src/assets/plus.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Print
                                </button>
                            </div>

                            <div className="lg:ml-30 space-x-8 mr-3">
                                <button className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                                onClick={handleClearTable}>
                                    <i><img src="./src/assets/clear.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Clear
                                </button>
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
                                            <td className="px-5 py-5 border-b border-r bg-white text-sm text-center">{rowIndex + startIndex + 1}</td>
                                            <td className="px-5 py-5 border-b border-r bg-white text-sm text-center">{row.name}</td>
                                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                                                const { startTime, endTime, duty, dayOff } = row.schedule[day];
                                                const formattedStartTime = startTime ? startTime.format('hh:mm A') : '';
                                                const formattedEndTime = endTime ? endTime.format('hh:mm A') : '';
                                                return (
                                                    <td key={day} className="px-5 py-5 border-b border-r bg-white text-sm text-center">
                                                        <div>
                                                            {formattedStartTime && formattedEndTime ? `${formattedStartTime} - ${formattedEndTime}` : ''}
                                                        </div>
                                                        {duty && (
                                                            <div>{duty}</div>
                                                        )}
                                                        {dayOff && (
                                                            <div>Day Off</div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            <td className="px-5 py-5 border-b border-r bg-white text-sm text-center">
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            

                            <div className="add-design w-full">
                                <button
                                    onClick={openModal} // Open the modal
                                    className="w-full flex uppercase justify-center items-center gap-2 rounded-m font-semibold tracking-wide cursor-pointer"
                                >
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

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg w-80">
                        <h2 className="text-xl font-semibold mb-4">Choose Download Type</h2>
                        <div className="flex space-x-4">
                            <button
                                className=""
                                onClick={() => handleDownloadChoice('excel')}
                            >
                                <img src="./src/assets/excel2.png" className="fill-current w-8 h-8" />
                            </button>
                            <button
                                className=""
                                onClick={() => handleDownloadChoice('word')}
                            >
                               <img src="./src/assets/word.png" className="fill-current w-8 h-8" />
                            </button>
                        </div>
                        <button
                            className="bg-[#ED6565] hover:bg-[#F24E4E] text-white px-4 py-2 rounded mt-5"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Inline Modal Component */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[1600px]">
                            <h2 className="text-2xl font-bold mb-4">Add Schedule</h2>
                            <form onSubmit={handleModalSubmit}>
                                <div className="mb-3">
                                    <label className="block font-semibold text-lg mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={modalData.name}
                                        onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                                        className="border border-gray-300 p-2 w-full rounded"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(modalData.schedule).map(day => (
                                        <div key={day}>
                                            <label className="block font-semibold text-lg mb-3">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                            <div className="flex items-center mb-2">
                                                <div className="flex-col">
                                                    <div className="flex items-center mr-4">
                                                        <label className="mr-[20px]">Start Time</label>
                                                        <TimePicker
                                                            value={modalData.schedule[day].startTime}
                                                            onChange={(newValue) => setModalData({
                                                                ...modalData,
                                                                schedule: {
                                                                    ...modalData.schedule,
                                                                    [day]: { ...modalData.schedule[day], startTime: newValue }
                                                                }
                                                            })}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <label className="mr-[25px]">End Time</label>
                                                        <TimePicker
                                                            value={modalData.schedule[day].endTime}
                                                            onChange={(newValue) => setModalData({
                                                                ...modalData,
                                                                schedule: {
                                                                    ...modalData.schedule,
                                                                    [day]: { ...modalData.schedule[day], endTime: newValue }
                                                                }
                                                            })}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </div>
                                                </div>
                                            
                                                <select
                                                    value={modalData.schedule[day].duty}
                                                    onChange={(e) => setModalData({
                                                        ...modalData,
                                                        schedule: {
                                                            ...modalData.schedule,
                                                            [day]: { ...modalData.schedule[day], duty: e.target.value }
                                                        }
                                                    })}
                                                    className="border border-gray-300 p-2 w-32 rounded mr-4"
                                                >
                                                    <option value="">Select Duty</option>
                                                    <option value="Store Duty">Store Duty</option>
                                                    <option value="Cleaning Duty">Cleaning Duty</option>
                                                </select>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={modalData.schedule[day].dayOff}
                                                        onChange={(e) => setModalData({
                                                            ...modalData,
                                                            schedule: {
                                                                ...modalData.schedule,
                                                                [day]: { ...modalData.schedule[day], dayOff: e.target.checked }
                                                            }
                                                        })}
                                                        className="form-checkbox"
                                                    />
                                                    <span className="ml-2">Day Off</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-[#ED6565] hover:bg-[#F24E4E] text-white px-4 py-2 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#70b8d3] hover:bg-[#09B0EF] text-white px-4 py-2 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </LocalizationProvider>

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