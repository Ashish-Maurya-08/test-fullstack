import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import { createEmployee, updateEmployee } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

const EmployeeForm = () => {

  // formData State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });
  const [edit, setEdit] = useState(false)
  const [EmployeeID, setEmployeeID] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();


  // useEffect to check if it's edit form
  useEffect(() => {
    const employeeToEdit = location.state?.employee
    
    if (employeeToEdit) {
      setEdit(true)
      setEmployeeID(employeeToEdit.f_Id)
      setFormData({
        name: employeeToEdit.f_Name,
        email: employeeToEdit.f_Email,
        phone: employeeToEdit.f_Mobile,
        designation: employeeToEdit.f_Designation,
        gender: employeeToEdit.f_gender,
        course: employeeToEdit.f_Course,
        image: null,
      })
    }
  }, [location.state])


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      let updatedCourses = [...formData.course];
      if (checked) {
        updatedCourses.push(value);
      } else {
        updatedCourses = updatedCourses.filter((course) => course !== value);
      }
      setFormData({ ...formData, course: updatedCourses })
      console.log(updatedCourses);
      
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // handle form Submition
  const handleSubmit = async (e) => {
    console.log(formData);
    
    e.preventDefault();
    if (validateForm()) {
      let success = false;
      if (edit) {
        success = await editEmployee(formData);
      } else {
        success = await newEmployee(formData);
      }
      if (success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          designation: "",
          gender: "",
          course: [],
          image: null,
        });
        e.target.reset();
        if (edit) {
          navigate('/employeeList');
        }
      }
    }
  };

  // Edit Existing Employee
  const editEmployee = async (data) => {
    console.log(data);
    const res = await updateEmployee(EmployeeID, data);
    if (res) {
      return true;
    } else {
      alert("Error updating employee");
      return false;
    }
  };

  // Add New Employee
  const newEmployee = async () => {
    const res = await createEmployee(formData)
      .catch((error) => {
        return error;
      })
    console.log(res);

    // reset on submit
    if (res) {
      alert("Employee added successfully!");
      return true;

    }
    else if (!res) {
      alert("Email already exists!");
      return false;
    }
    else {
      alert("Something went wrong!");
      return false;
    }
  }


  // Validate form
  const validateForm = () => {
    const regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    const { email, phone, course } = formData;
    const mobile = String(phone);
    if (!regex.test(email)) {
      alert("Invalid email format");
      return false;
    }

    if (mobile.length !== 10 && !mobile.match(/^[0-9]+$/)) {
      alert("Invalid mobile number");
      return false;
    }
    if (course.length === 0) {
      alert("Please select at least one course");
      return false;
    }
    return true;
  };

  return (

    <Navbar>
      <div className="content">
        <div className="form-flex">
          <div className="heading">Employee Form</div>
          <form onSubmit={handleSubmit} className="form-flex">
            <div className="form-content">
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field width-20"
                />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field width-20"
                />
              </div>
              <div className="form-field">
                <label>Mobile</label>
                <input
                  type="text"
                  name="phone"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field width-20"
                />
              </div>
              <div className="form-field">
                <label>Designation</label>
                <select
                  name="designation"
                  required
                  onChange={handleChange}
                  className="input-field width-20"
                  value={formData.designation}
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="form-field">
                <label>Gender</label>
                <div className="width-20 multi-select">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
              <div className="form-field">
                <label>Courses:</label>
                <div className="width-20 multi-select">
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="MCA"
                      checked={formData.course.includes("MCA")}
                      onChange={handleChange}

                    />{" "}
                    MCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="BCA"
                      checked={formData.course.includes("BCA")}
                      onChange={handleChange}

                    />{" "}
                    BCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="BSC"
                      checked={formData.course.includes("BSC")}
                      onChange={handleChange}

                    />{" "}
                    BSC
                  </label>
                </div>
              </div>
              {
                edit ?
                  (
                    <div className="form-field">
                      <label>Image:</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept=".jpg, .png"
                        className="input-field width-20 image-file"
                      />
                    </div>
                  ) : (
                    <div className="form-field">
                      <label>Image:</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept=".jpg, .png"
                        required
                        className="input-field width-20 image-file"
                      />
                    </div>
                  )
              }
              <div>
                <button type="submit" className="submit_button">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Navbar>
  );
};

export default EmployeeForm;
