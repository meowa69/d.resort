import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(null);

  const handleAdminLoginClick = (event) => {
    event.preventDefault();
    setLoginType('admin');
  };

  const handleEmployeeLoginClick = (event) => {
    event.preventDefault();
    setLoginType('employee');
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    setLoginType(null);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginType === 'admin') {
      navigate('/admin');
    } else if (loginType === 'employee') {
      navigate('/employee');
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-9/12 h-full flex justify-center items-center">
        <img src="./src/assets/login.png" alt="Logo" className="max-w-full max-h-full" />
      </div>

      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-white p-8 rounded-[5px] shadow-lg">
          {loginType ? (
            <>
              <h2 className="text-[25px] font-bold mb-4 text-center">{loginType.toUpperCase()} LOGIN</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input type="text" id="username" className="mt-1 p-2 w-full border rounded" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" className="mt-1 p-2 w-full border rounded" />
                </div>

                <button type="submit" onClick={handleLogin} className="w-full bg-[#70b8d3] text-white p-2 rounded hover:bg-[#09B0EF]">Login</button>
              </form>
              <button 
                onClick={handleGoBack} 
                className="w-full bg-gray-200 text-gray-800 p-2 rounded mt-4 hover:bg-gray-300"
              >
                Go Back
              </button>
            </>
          ) : (
            <>
              <h2 className="text-[25px] font-bold mb-4 text-center">LOGIN</h2>
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleAdminLoginClick} 
                  className="w-full bg-[#70b8d3] text-white p-2 rounded mb-4 hover:bg-[#09B0EF]"
                >
                  Admin
                </button>
                <button 
                  onClick={handleEmployeeLoginClick} 
                  className="w-full bg-[#70b8d3] text-white p-2 rounded hover:bg-[#09B0EF]"
                >
                  Employee
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
