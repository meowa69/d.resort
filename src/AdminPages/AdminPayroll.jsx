import AdminSidebar from '../components/AdminSidebar';


function AdminPayroll () {
    return (
        <div className="flex">
            <AdminSidebar />
            <div id="report" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
                <h1 className="text-4xl font-bold mb-4">PAYROLL</h1>
                <div className="bg-white p-8 rounded-md w-full border-2 border-gray-400 mt-[50px]"></div>
            </div>
        </div>
    );
}

export default AdminPayroll;