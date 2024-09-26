import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import { getEmployees, deleteEmployee } from "../api/api";
import './table.css'
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {

  // State to store the list of employees
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');


  useEffect(() => {
    if(searchKeyword && searchKeyword.trim() !== '') {
      const filtered = employees.filter(employee =>
        Object.values(employee).some(value =>
          String(value).toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
    
  }, [employees, searchKeyword]);


  useEffect(() => {
    fetchEmployees();
  }, []);


  const sortEmployees = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  
    const sorted = [...filteredEmployees].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  
    setFilteredEmployees(sorted);
  };
  


  // Function to format the date
  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  }

  const showCourse = (course) => {
    const formattedCourse = course.map(course => course);
    return formattedCourse.join(', ');
  }



  // Function to fetch the list of employees
  const fetchEmployees = async () => {
    const data = await getEmployees();
    console.log(data);
    setEmployees(data);
  };



  // Function to handle the delete button click
  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };




  // Function to handle the edit button click
  const handleEdit = (employee) => {
    console.log(employee);
    navigate('/employeeForm', { state: { employee } })

  }


  return (
    <Navbar>
      <div className="content">

        <div className="employeeTable">

          <div className="controls">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-bar"
            />
            <span className="employee-count">Total Employees: {employees.length}</span>
            <button onClick={() => navigate('/employeeForm')} className="create-button">
              Create Employee
            </button>
          </div>

          <div className="heading">Employee List</div>
          <table className="table">
              <thead>
                <tr>
                  <th className="pointer" onClick={() => sortEmployees('f_Id')}>Unique ID {sortField === 'f_Id' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th>Image</th>
                  <th className="pointer" onClick={() => sortEmployees('f_Name')}>Name {sortField === 'f_Name' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th className="pointer" onClick={() => sortEmployees('f_Email')}>Email {sortField === 'f_Email' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th>Mobile</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Courses</th>
                  <th className="pointer" onClick={() => sortEmployees('f_CreateDate')}>Create date {sortField === 'f_CreateDate' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th>Actions</th>
                </tr>
              </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.f_Id}>
                  <td>{employee.f_Id}</td>
                  <td className="image-cell">
                    <img
                      src={`http://localhost:5000/pics/${employee.f_Image}`}
                      alt={employee.f_Name}
                      width="50"
                    />
                  </td>
                  <td>{employee.f_Name}</td>
                  <td>{employee.f_Email}</td>
                  <td>{employee.f_Mobile}</td>
                  <td>{employee.f_Designation}</td>
                  <td>{employee.f_gender}</td>
                  <td>{showCourse(employee.f_Course)}</td>
                  <td>{formatDate(employee.f_CreateDate)}</td>
                  <td className="action-cell">
                    <button onClick={() => handleEdit(employee)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </Navbar>
  );
};

export default EmployeeList;

