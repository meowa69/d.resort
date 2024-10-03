import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import axios from 'axios';

function AdminList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Fetch employees from the backend
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/employees/', {
                headers: getAuthHeaders(),
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();

        // Poll for changes every 10 seconds
        const intervalId = setInterval(() => {
            fetchEmployees();
        }, 10000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <div id="group" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
                <h1 className="text-4xl font-bold mb-4">EMPLOYEE LIST</h1>
                <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]">
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
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{employee.name}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{employee.employee_id}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{employee.address}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{employee.mobile_number}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-r border-gray-200 bg-white text-sm">
                                                <div className="flex space-x-4">
                                                    <button className="px-4 py-3 text-base font-medium rounded-md shadow-md text-white bg-[#70b8d3] hover:bg-[#09B0EF]">Edit</button>
                                                    <button className="px-4 py-3 text-base font-medium rounded-md shadow-md text-white bg-[#ED6565] hover:bg-[#F24E4E]">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminList;
