import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function Employee() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '', avgPrice: '', amount: '' });
    const [editProductId, setEditProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [receiptProducts, setReceiptProducts] = useState([]);
    const [receiptDate, setReceiptDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [salesReportData, setSalesReportData] = useState([]);
    const [expandedReports, setExpandedReports] = useState(salesReportData.map(() => false));
    const [optionMenuVisible, setOptionMenuVisible] = useState(Array(salesReportData.length).fill(false));
    const [currentView, setCurrentView] = useState('cottage');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [date, setDate] = useState(); 

    const sidebarRef = useRef(null);
    
    const Menus = [
        { title: "Dashboard", src: "dashboard" },
        { title: "Bookings", src: "booking"},
        { title: "Product", src: "product" },
        { title: "Sales Report", src: "report" },
    ];

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

    const switchView = (view) => {
        setCurrentView(view);
    };

    // Get the data and heading based on current view
    const tableData = currentView === 'cottage' ? cottagesData : lodgesData;
    const heading = currentView === 'cottage' ? 'Cottage' : 'Lodge';

    useEffect(() => {
        const savedMenu = localStorage.getItem("activeMenu");
        if (savedMenu) {
            setActiveMenu(savedMenu);
        }
    }, []);

    useEffect(() => {
        const savedMenu = localStorage.getItem("activeMenu");
        if (savedMenu) {
            setActiveMenu(savedMenu);
        } else {
            setActiveMenu("dashboard");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("activeMenu", activeMenu);
    }, [activeMenu]);

    const handleMenuClick = (src) => {
        console.log('Clicked menu:', src); // Check what menu is clicked
        setActiveMenu(src);
    };
    

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    const handleTempoBtn = () => {
        navigate('/Admin');
    };

    const handleTempoBtnToBooking = () => {
        navigate('/Booking');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewProduct({ name: '', quantity: '', avgPrice: '', amount: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => {
            const updatedProduct = { ...prevState, [name]: value };
            if (name === 'quantity' || name === 'avgPrice') {
                const quantity = parseFloat(updatedProduct.quantity) || 0;
                const avgPrice = parseFloat(updatedProduct.avgPrice) || 0;
                updatedProduct.amount = (quantity * avgPrice).toFixed(2);
            }
            return updatedProduct;
        });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
        const newProductWithId = { ...newProduct, id: maxId + 1 };
        setProducts([...products, newProductWithId]);
        closeModal();
    };
    

    const handleDeleteProduct = (id) => {
        const filteredProducts = products.filter(product => product.id !== id);
        const reSequencedProducts = filteredProducts.map((product, index) => ({
            ...product,
            id: index + 1
        }));
        setProducts(reSequencedProducts);
    };

    const handleEditClick = (product) => {
        setEditProductId(product.id);
        setEditedProduct({ ...product });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => {
            const updatedProduct = { ...prevState, [name]: value };
            if (name === 'quantity' || name === 'avgPrice') {
                const quantity = parseFloat(updatedProduct.quantity) || 0;
                const avgPrice = parseFloat(updatedProduct.avgPrice) || 0;
                updatedProduct.amount = (quantity * avgPrice).toFixed(2);
            }
            return updatedProduct;
        });
    };

    const handleSaveClick = () => {
        setProducts(products.map(product =>
            product.id === editProductId ? editedProduct : product
        ));
        setEditProductId(null);
    };

    const openReceiptModal = () => {
        const totalAmount = products.reduce((total, product) => total + (product.quantity * product.avgPrice), 0);
        setReceiptProducts({ products, totalAmount }); 
        setIsReceiptModalOpen(true);
    };
    

    const closeReceiptModal = () => {
        setIsReceiptModalOpen(false);
    };

    const handleDateChange = (date) => {
        setReceiptDate(date);
        setIsDatePickerOpen(false);
    };

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleConfirm = () => {
        const newSalesData = {
            date: receiptDate.toLocaleDateString(),
            products: receiptProducts.products.map(product => ({
                id: product.id,
                name: product.name,
                quantity: product.quantity,
                avgPrice: product.avgPrice,
                amount: (product.quantity * product.avgPrice).toFixed(2),
            })),
            totalAmount: receiptProducts.totalAmount.toFixed(2)
        };
    
        setSalesReportData([...salesReportData, newSalesData]);
        closeReceiptModal();
    };

    const toggleReportVisibility = (index) => {
        setExpandedReports(prevState => {
            const newExpandedReports = [...prevState];
            newExpandedReports[index] = !newExpandedReports[index];
            return newExpandedReports;
        });
    };

    const toggleOptionMenu = (index) => {
        setOptionMenuVisible(prevState => {
            const newOptionMenuVisible = [...prevState];
            newOptionMenuVisible[index] = !newOptionMenuVisible[index];
            return newOptionMenuVisible;
        });
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
                        YASAY BEACH RESORT
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
                                            <h1 className="text-white font-bold text-[20px]">Lodge</h1>
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
                                    <h1 className="text-2xl font-bold">{heading}</h1>
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

                {/* Booking Section */}
                <div id="booking" className={`menu-content ${activeMenu === "booking" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">BOOKING</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">

                    <button className="rounded-md bg-blue-300 text-white font-semibold tracking-wide cursor-pointer" onClick={handleTempoBtnToBooking}>TempoBTN to Online Booking</button>
                    </div>

                </div>

                {/* Product Section */}
                <div id="product" className={`menu-content ${activeMenu === "product" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">PRODUCT</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
                        <div className="lg:ml-30 mb-5 space-x-8">
                            <button
                                className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                                onClick={openModal}
                            >
                                <i><img src="./src/assets/plus.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Add Product
                            </button>
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
                                    <button onClick={openReceiptModal} className="flex items-center gap-1 bg-[#70b8d3] hover:bg-[#09B0EF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                        <i><img src="./src/assets/upload.png" className="fill-current w-4 h-4" style={{ filter: 'invert(100%)' }} /></i>Upload
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="thDesign">ID</th>
                                            <th className="thDesign">Product Name</th>
                                            <th className="thDesign">Quantity</th>
                                            <th className="thDesign">Average Price</th>
                                            <th className="thDesign">Amount</th>
                                            <th className="thDesign">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.id}</td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                    {editProductId === product.id ? (
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={editedProduct.name}
                                                            onChange={handleEditChange}
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                        />
                                                    ) : (
                                                        product.name
                                                    )}
                                                </td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                    {editProductId === product.id ? (
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            value={editedProduct.quantity}
                                                            onChange={handleEditChange}
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                        />
                                                    ) : (
                                                        product.quantity
                                                    )}
                                                </td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                    {editProductId === product.id ? (
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name="avgPrice"
                                                            value={editedProduct.avgPrice}
                                                            onChange={handleEditChange}
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                        />
                                                    ) : (
                                                        product.avgPrice
                                                    )}
                                                </td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                    {editProductId === product.id ? (
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name="amount"
                                                            value={editedProduct.amount}
                                                            readOnly
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                        />
                                                    ) : (
                                                        product.amount
                                                    )}
                                                </td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                    <div className="space-x-2">
                                                        {editProductId === product.id ? (
                                                            <button
                                                                className="px-3 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#70b8d3] hover:bg-[#09B0EF]"
                                                                onClick={handleSaveClick}
                                                            >
                                                                Save
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="px-3 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#70b8d3] hover:bg-[#09B0EF]"
                                                                onClick={() => handleEditClick(product)}
                                                            >
                                                                <img
                                                                    src="./src/assets/edit.png"
                                                                    className="fill-current w-4 h-4"
                                                                    style={{ filter: 'invert(100%)' }}
                                                                    alt="Edit"
                                                                />
                                                            </button>
                                                        )}
                                                        <button
                                                            className="px-3 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#ED6565] hover:bg-[#F24E4E]"
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                        >
                                                            <img
                                                                src="./src/assets/delete.png"
                                                                className="fill-current w-4 h-4"
                                                                style={{ filter: 'invert(100%)' }}
                                                                alt="Delete"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-md w-[900px] ">
                                <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                                <form onSubmit={handleAddProduct}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newProduct.name}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={newProduct.quantity}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Average Price</label>
                                        <input
                                            type="number"
                                            name="avgPrice"
                                            value={newProduct.avgPrice}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="text-white px-4 py-2 rounded-md mr-2 bg-[#ED6565] hover:bg-[#F24E4E]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white px-4 py-2 rounded-md bg-[#70b8d3] hover:bg-[#09B0EF]"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {isReceiptModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                            <div className="w-[800px] bg-white p-6 rounded-lg shadow-lg ">
                                <h2 className="text-xl font-bold mb-4">Report</h2>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <div className="absolute">
                                        <button
                                            type="button"
                                            onClick={toggleDatePicker}
                                            className="flex items-center space-x-2 border border-gray-300 rounded-md p-2"
                                        >
                                            <img src="./src/assets/calendar.png" alt="Select Date" className="w-5 h-5"/>
                                            <span>{receiptDate.toLocaleDateString()}</span>
                                        </button>
                                        {isDatePickerOpen && (
                                            <DatePicker
                                                selected={receiptDate}
                                                onChange={handleDateChange}
                                                dateFormat="MMMM d, yyyy"
                                                className=" mt-2 border border-gray-300 rounded-md shadow-sm"
                                                inline
                                            />
                                        )}
                                    </div>
                                </div>
                                        
                                <table className="w-full border-collapse border border-gray-200 shadow rounded-lg mt-[50px]">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="thDesign">Product Name</th>
                                            <th className="thDesign">Quantity</th>
                                            <th className="thDesign">Average Price</th>
                                            <th className="thDesign">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receiptProducts.products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.name}</td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.quantity}</td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.avgPrice}</td>
                                                <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{(product.quantity * product.avgPrice).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="border border-gray-300 p-2 text-right font-bold">Total</td>
                                            <td className="border border-gray-300 p-2 text-right font-bold">{receiptProducts.totalAmount.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="flex justify-end py-2">
                                    <button onClick={closeReceiptModal} className="text-white px-4 py-2 rounded-md mr-2 bg-[#ED6565] hover:bg-[#F24E4E]">Cancel</button>
                                    <button onClick={handleConfirm} className="text-white px-4 py-2 rounded-md bg-[#70b8d3] hover:bg-[#09B0EF]">Confirm</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sales Section */}
                <div id="report" className={`menu-content ${activeMenu === "report" ? "block" : "hidden"}`}>
                    <h1 className="text-4xl font-bold mb-4">SALES REPORT</h1>
                    <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
                        {salesReportData.length === 0 ? (
                            <div className="text-center p-6 text-gray-500">
                                <h2 className="text-xl font-semibold">NO REPORT</h2>
                            </div>
                        ) : (
                            salesReportData.map((report, index) => (
                                <div key={index} className="mb-4 border-gray-300 border-2 p-5 rounded-lg">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleReportVisibility(index)}>
                                            <img src="./src/assets/down.png" className="fill-current w-5 h-5" />
                                            <h2 className="text-[20px] font-semibold">Report for {report.date}</h2>
                                        </div>
                                        <div className="relative flex">
                                            <img src="./src/assets/option.png" className="fill-current w-5 h-5 cursor-pointer" onClick={() => toggleOptionMenu(index)} />
                                            {optionMenuVisible[index] && (
                                                <div className="absolute right-6 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                    <ul className="p-3">
                                                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                            <img src="./src/assets/printer.png" className="w-4 h-4 mr-2" alt="Print" />
                                                            Print
                                                        </li>
                                                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                            <img src="./src/assets/download.png" className="w-4 h-4 mr-2" alt="Download" />
                                                            Download
                                                        </li>
                                                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                            <img src="./src/assets/excel.png" className="w-4 h-4 mr-2" alt="Excel" />
                                                            Excel
                                                        </li>
                                                        <li className="flex items-center px-4 py-2 border-t-2 hover:bg-gray-100 cursor-pointer">
                                                            <img src="./src/assets/delete.png" className="w-4 h-4 mr-2" alt="Delete" />
                                                            Delete
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {expandedReports[index] && (
                                        <div className="border-2 p-5 rounded-md mt-2">
                                            <div className="flex justify-center items-center mb-2 gap-2">
                                                <div className="inline">
                                                    <h2 className="text-[18px] font-bold">SALES BY PRODUCT</h2>
                                                    <h3 className="text-center mt-2 mb-2">{report.date}</h3>
                                                </div>
                                            </div>
                                            <table className="w-full border-collapse border border-gray-200 rounded-sm">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="thDesign">Product Name</th>
                                                        <th className="thDesign">Quantity</th>
                                                        <th className="thDesign">Average Price</th>
                                                        <th className="thDesign">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {report.products.map((product) => (
                                                        <tr key={product.id}>
                                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.name}</td>
                                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.quantity}</td>
                                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.avgPrice}</td>
                                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">{product.amount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan="3" className="border border-gray-200 p-2 text-right font-bold">Total</td>
                                                        <td className="border border-gray-200 p-2 text-right font-bold">{report.totalAmount}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employee;
