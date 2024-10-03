import AdminSidebar from '../components/AdminSidebar';
import { useState} from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { handleDownloadExcel, handleDownloadWord } from '../AdminUtils';

function AdminSchedule () {
    const [tableRows, setTableRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleDownloadChoice = (fileType) => {
        if (fileType === 'excel') {
            handleDownloadExcel(tableRows); // Pass tableRows to the function
        } else if (fileType === 'word') {
            handleDownloadWord(tableRows); // Pass tableRows to the function
        }
        setShowModal(false);
    };
    return (
        <div className="flex">
            <AdminSidebar />
            <div id="clock" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
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
        </div>
    );
}

export default AdminSchedule;