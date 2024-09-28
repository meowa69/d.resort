import { useState} from 'react';
import DatePicker from 'react-datepicker';
import Sidebar from '../components/EmployeeSidebar';

function EmployeeProduct () {
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
    return (
        <div className="flex">
            <Sidebar />
            <div id="dashboard" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
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
        </div>
    );
}

export default EmployeeProduct;