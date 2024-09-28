import AdminSidebar from '../components/AdminSidebar';

function AdminRegister () {
    return (
        <div className="flex">
            <AdminSidebar />
            <div id="add" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
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
        </div>
    );
}

export default AdminRegister;