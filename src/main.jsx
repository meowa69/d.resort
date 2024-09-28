import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import AdminSidebar from './components/AdminSidebar.jsx';
import AdminDash from './AdminPages/AdminDash.jsx';
import AdminRegister from './AdminPages/AdminRegister.jsx';
import AdminList from './AdminPages/AdminList.jsx';
import AdminAttendance from './AdminPages/AdminAttendance.jsx';
import AdminSchedule from './AdminPages/AdminSchedule.jsx';
import AdminReport from './AdminPages/AdminReport.jsx';
import AdminPayroll from './AdminPages/AdminPayroll.jsx';
import EmployeeSidebar from './components/EmployeeSidebar.jsx';
import EmployeeDash from './EmployeePages/EmployeeDash.jsx';
import EmployeeBooking from './EmployeePages/EmployeeBooking.jsx';
import EmployeeProduct from './EmployeePages/EmployeeProduct.jsx';
import EmployeeReport from './EmployeePages/EmployeeReport.jsx';
import Booking from './Booking.jsx';
import Cottage from './OnlineBookingPages/CottagePage.jsx'
import Lodge from './OnlineBookingPages/LodgePage.jsx'
import SignIn from './OnlineBookingPages/LoginForm.jsx'
import Register from './OnlineBookingPages/RegisterForm.jsx'
import Payment from './OnlineBookingPages/PaymentPage.jsx'
import About from './OnlineBookingPages/AboutUsPage.jsx'
import Terms from './OnlineBookingPages/TermsAndConditionPage.jsx'
import './index.css';
const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/adminSidebar" element={<AdminSidebar/>}/>
        <Route path="/AdminDash" element={<AdminDash/>}/>
        <Route path="/AdminRegister" element={<AdminRegister/>}/>
        <Route path="/AdminList" element={<AdminList/>}/>
        <Route path="/AdminAttendance" element={<AdminAttendance/>}/>
        <Route path="/AdminSchedule" element={<AdminSchedule/>}/>
        <Route path="/AdminReport" element={<AdminReport/>}/>
        <Route path="/AdminPayroll" element={<AdminPayroll/>}/>
        <Route path="/employeeSidebar" element={<EmployeeSidebar />}/>
        <Route path="/EmployeeDash" element={<EmployeeDash />}/>
        <Route path="/EmployeeBooking" element={<EmployeeBooking />}/>
        <Route path="/EmployeeProduct" element={<EmployeeProduct />}/>
        <Route path="/EmployeeReport" element={<EmployeeReport />}/>
        <Route path="/booking" element={<Booking />}/>
        <Route path="/cottage" element={<Cottage />}/>
        <Route path="/lodge" element={<Lodge />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/about-us" element={<About />}/>
        <Route path="/terms" element={<Terms />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
