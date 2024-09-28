import Sidebar from '../components/EmployeeSidebar';

function EmployeeSale () {
    return (
        <div className="flex">
            <Sidebar />
            <div id="dashboard" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
                <h1 className="text-4xl font-bold mb-4">SALES REPORT</h1>
                
            </div>
        </div>
    );
}

export default EmployeeSale;