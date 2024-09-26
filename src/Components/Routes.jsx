import  React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from '../Pages/login'
import DashBoard from '../Pages/dashboard'
import EmployeeForm from '../Pages/employeeForm'
import EmployeeList from '../Pages/employeeList'


const AllRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<DashBoard/>} />
                <Route path="/employeeForm" element={<EmployeeForm/>} />
                <Route path="/employeeList" element={<EmployeeList/>} />
            </Routes>
        </Router>
    )
}

export default AllRoutes;