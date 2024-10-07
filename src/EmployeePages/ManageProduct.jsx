import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Sidebar from '../components/EmployeeSidebar';

function ManageProduct({ products = [] }) { 
    const [ setProducts ] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    const handleEditClick = (product) => {
        setEditProductId(product.id);
        setEditedProduct({ ...product });
    };

    const handleSaveClick = () => {
        setProducts(products.map(product =>
            product.id === editProductId ? editedProduct : product
        ));
        setEditProductId(null);
    };

    const handleDeleteProduct = (id) => {
        const filteredProducts = products.filter(product => product.id !== id);
        setProducts(filteredProducts.map((product, index) => ({
            ...product,
            id: index + 1 // Re-sequence IDs after deletion
        })));
    };

    useEffect(() => {
        // Log the updated products
        console.log('Products updated:', products);
    }, [products]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
                <h1 className="text-4xl font-bold mb-4">MANAGE PRODUCT</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-black bg-white">
                        <thead className="text-xs text-black uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="thDesign">ID</th>
                                <th scope="col" className="thDesign">Product name</th>
                                <th scope="col" className="thDesign">Date of Product added</th>
                                <th scope="col" className="thDesign">Quantity</th>
                                <th scope="col" className="thDesign">AVG PRICE</th>
                                <th scope="col" className="thDesign">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{product.id}</td>
                                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap">{product.name}</td>
                                        <td className="px-6 py-4">{product.dateAdded}</td>
                                        <td className="px-6 py-4">{product.quantity}</td>
                                        <td className="px-6 py-4">{product.avgPrice}</td>
                                        <div className="space-x-2">
                                            {editProductId === product.id ? (
                                                <button
                                                    className="px-3 py-2 text-base font-medium rounded-md shadow-md text-white bg-[#1089D3] hover:bg-[#3d9fdb]"
                                                    onClick={handleSaveClick}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-[#1089D3] hover:bg-[#3d9fdb] p-2 rounded-full"
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
                                                className="bg-[#FF6767] hover:bg-[#f35656] p-2 rounded-full"
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
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Define PropTypes for the component
ManageProduct.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            dateAdded: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            avgPrice: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ManageProduct;
