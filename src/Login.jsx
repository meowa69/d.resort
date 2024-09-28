import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(null);

  const handleAdminLoginClick = (event) => {
    event.preventDefault();
    setLoginType('Admin');
  };

  const handleEmployeeLoginClick = (event) => {
    event.preventDefault();
    setLoginType('Employee');
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    setLoginType(null);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginType === 'Admin') {
      navigate('/AdminDash');
    } else if (loginType === 'Employee') {
      navigate('/EmployeeDash');
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
              <h2 className="text-2xl font-extrabold text-[#1089D3] text-center mb-6">{loginType.toUpperCase()} LOGIN</h2>
              <form className="mt-6">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full bg-white border-2 border-transparent p-3 rounded-[10px] shadow-md placeholder-gray-400 focus:border-[#12B1D1] focus:outline-none"
                    placeholder="Username"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full bg-white border-2 border-transparent p-3 rounded-[10px] shadow-md placeholder-gray-400 focus:border-[#12B1D1] focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white p-3 rounded-[10px] shadow-md hover:to-[#0f8bb1]"
                >
                  Login
                </button>
              </form>
              <button
                onClick={handleGoBack}
                className="w-full mt-4 bg-gray-200 text-gray-800 p-3 rounded-[10px] shadow-md hover:bg-gray-300"
              >
                Go Back
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center mt-6">
              <h2 className="text-2xl font-extrabold text-[#1089D3] text-center mb-6">LOGIN</h2>

              <button
                onClick={handleAdminLoginClick}
                className="w-full bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white p-3 rounded-[10px] mb-4 shadow-md hover:to-[#0f8bb1]"
              >
                Admin
              </button>
              <button
                onClick={handleEmployeeLoginClick}
                className="w-full bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white p-3 rounded-[10px] shadow-md hover:to-[#0f8bb1]"
              >
                Employee
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
