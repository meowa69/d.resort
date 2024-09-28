import { useState, useEffect} from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Sidebar from '../components/EmployeeSidebar';

function EmployeeDash () {
    const [currentView, setCurrentView] = useState('cottage');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [date, setDate] = useState();

    const switchView = (view) => {
        setCurrentView(view);
    };

    const cottagesData = [
        { id: 1, image: "https://via.placeholder.com/64", type: "Cottage A", status: "Available" },
        { id: 2, image: "https://via.placeholder.com/64", type: "Cottage B", status: "Booked" },
        { id: 3, image: "https://via.placeholder.com/64", type: "Cottage C", status: "Available" },
        { id: 4, image: "https://via.placeholder.com/64", type: "Cottage D", status: "Available" },
        { id: 5, image: "https://via.placeholder.com/64", type: "Cottage A", status: "Available" },
        { id: 6, image: "https://via.placeholder.com/64", type: "Cottage B", status: "Booked" },
        { id: 7, image: "https://via.placeholder.com/64", type: "Cottage C", status: "Available" },
        { id: 8, image: "https://via.placeholder.com/64", type: "Cottage D", status: "Available" },
        { id: 9, image: "https://via.placeholder.com/64", type: "Cottage A", status: "Available" },
        { id: 10, image: "https://via.placeholder.com/64", type: "Cottage B", status: "Booked" },
        { id: 11, image: "https://via.placeholder.com/64", type: "Cottage C", status: "Available" },
        { id: 12, image: "https://via.placeholder.com/64", type: "Cottage D", status: "Available" },
    ];

    const lodgesData = [
        { id: 1, image: "https://via.placeholder.com/64", type: "Lodge A", status: "Available" },
        { id: 2, image: "https://via.placeholder.com/64", type: "Lodge B", status: "Booked" },
        { id: 3, image: "https://via.placeholder.com/64", type: "Lodge C", status: "Available" },
        { id: 4, image: "https://via.placeholder.com/64", type: "Lodge D", status: "Available" },
        { id: 5, image: "https://via.placeholder.com/64", type: "Lodge A", status: "Available" },
        { id: 6, image: "https://via.placeholder.com/64", type: "Lodge B", status: "Booked" },
        { id: 7, image: "https://via.placeholder.com/64", type: "Lodge C", status: "Available" },
        { id: 8, image: "https://via.placeholder.com/64", type: "Lodge D", status: "Available" },
        { id: 9, image: "https://via.placeholder.com/64", type: "Lodge A", status: "Available" },
        { id: 10, image: "https://via.placeholder.com/64", type: "Lodge B", status: "Booked" },
        { id: 11, image: "https://via.placeholder.com/64", type: "Lodge C", status: "Available" },
        { id: 12, image: "https://via.placeholder.com/64", type: "Lodge D", status: "Available" },
    ];
    
    // Get the data and heading based on current view
    const tableData = currentView === 'cottage' ? cottagesData : lodgesData;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="flex">
            <Sidebar />
            <div id="dashboard" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
                <h1 className="text-4xl font-bold mb-4">DASHBOARD</h1>
                <div className="flex justify-between">
                    <div className="flex-row w-full mr-5">
                        <div className="flex space-x-10 h-[200px]">
                            <div 
                                className="relative rounded-lg shadow-xl w-[470px] cursor-pointer"
                                style={{ backgroundImage: "url('./src/assets/cottagebg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000] to-[#12B1D1] opacity-50 rounded-lg"></div>
                                <div className="relative flex h-full items-center gap-2 p-4">
                                    <div className="flex flex-col p-2">
                                        <h1 className="text-white font-bold text-[20px]">Cottage</h1>
                                        <p className="text-white font-semibold line-clamp-3">Total of Lodges:</p>
                                        <p className="text-white font-semibold line-clamp-3">Availability:</p>
                                        <p className="text-white font-semibold line-clamp-3">Booked:</p>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="relative rounded-lg shadow-xl w-[470px] cursor-pointer"
                                style={{ backgroundImage: "url(./src/assets/lodgebg.jpg)", backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000] to-[#12B1D1] opacity-50 rounded-lg"></div>
                                <div className="relative flex h-full w-full items-center gap-2 p-4">
                                    <div className="flex flex-col">
                                        <h1 className="text-white font-bold text-[20px]">Lodge</h1>
                                        <p className="text-white font-semibold line-clamp-3">Total of Lodges:</p>
                                        <p className="text-white font-semibold line-clamp-3">Availability:</p>
                                        <p className="text-white font-semibold line-clamp-3">Booked:</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex-row w-full h-[615px] mt-8 p-6 mx-auto bg-white shadow-lg rounded-lg border-gray-200">
                            <div className="flex justify-between mb-5">
                                <h1 className="text-2xl font-bold">Booking Summary</h1>
                                <div>
                                    <button
                                        onClick={() => switchView('cottage')}
                                        className={`text-sm p-2 w-[100px] mr-3 text-white cursor-pointer rounded-[5px] shadow-md ${
                                            currentView === 'cottage' ? 'bg-[#09B0EF]' : 'bg-[#70b8d3]'
                                        } hover:bg-[#09B0EF]`}
                                    >
                                        Cottage
                                    </button>
                                    <button
                                        onClick={() => switchView('lodge')}
                                        className={`text-sm p-2 w-[100px] text-white cursor-pointer rounded-[5px] shadow-md ${
                                            currentView === 'lodge' ? 'bg-[#09B0EF]' : 'bg-[#70b8d3]'
                                        } hover:bg-[#09B0EF]`}
                                    >
                                        Lodge
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="relative">
                                    <div className="max-h-[500px] overflow-y-auto">
                                        <table className="w-full">
                                            <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-100">
                                                <tr className="text-center">
                                                    <th className="px-3 py-3 text-sm font-bold uppercase tracking-wider">#</th>
                                                    <th className="px-3 py-3 text-sm font-bold uppercase tracking-wider">Type</th>
                                                    <th className="px-3 py-3 text-sm font-bold uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map((item, index) => (
                                                    <tr key={index} className="text-center items-center">
                                                        <td className="px-3 py-3 border-b bg-white text-sm">{item.id}</td>
                                                        <td className="px-3 py-3 border-b bg-white text-sm">
                                                            <div className="flex items-center justify-center">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.type}
                                                                    className="w-16 h-16 object-cover rounded mr-3"
                                                                />
                                                                {item.type}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-3 border-b bg-white text-sm">{item.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-col mr-2 ml-4">
                        <div className="p-4 bg-white shadow-lg rounded-lg border-gray-200 mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">Calendar</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    value={date} 
                                    onChange={(newValue) => setDate(newValue)} 
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="p-6 w-[500px] min-h-[430px] bg-white shadow-lg rounded-lg border-gray-200">
                            <div className="flex justify-between items-center">
                                <hi className="text-2xl font-semibold text-gray-800">Notification</hi>
                                <div className="text-gray-600 text-xl font-mono">
                                    {currentTime.toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDash;