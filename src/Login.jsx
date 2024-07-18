import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-9/12 h-full flex justify-center items-center">
        <img src="./src/assets/login.png" alt="Logo" className="max-w-full max-h-full" />
      </div>

      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-white p-8 rounded-[5px] shadow-lg">
          <h2 className="text-[25px] font-bold mb-4 text-center">LOGIN</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" className="mt-1 p-2 w-full border rounded" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" className="mt-1 p-2 w-full border rounded" />
            </div>

            <div className="mb-4 text-right">
              <p href="#" className="text-sm text-gray-800 hover:text-blue-600 cursor-pointer">Forgot Password?</p>
            </div>

            <button type="submit" onClick={handleLogin} className="w-full bg-[#70b8d3] text-white p-2 rounded hover:bg-[#09B0EF]">Login</button>

            <div className="mb-4 text-center relative top-20">
              <p href="#" className="text-sm text-gray-800">You don't have an account? <a href="#" className="text-[#70b8d3] cursor-pointer hover:bg-[#09B0EF]">Sign up here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
