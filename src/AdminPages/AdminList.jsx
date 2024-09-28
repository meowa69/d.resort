import AdminSidebar from '../components/AdminSidebar';

function AdminList () {
    return (
        <div className="flex">
            <AdminSidebar />
            <div id="group" className="p-7 pl-10 flex-1 h-screen overflow-y-auto">
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
        </div>
    );
}

export default AdminList;