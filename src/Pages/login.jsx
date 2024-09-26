import React, { useEffect } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { checkUser, setUser } from "../Components/localStorage";
import { login, checkLogin, register } from "../api/api";


const Login = () => {

  // declare state variables
  const [empty, setEmpty] = React.useState(false);
  const [action , setAction] = React.useState("Login");
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // check if login table is empty
  const checkEmpty = async () => {
    const res = await checkLogin();
    if (res) {
      setEmpty(false);
      setAction("Login");
    }
    else {
      alert("Login table is empty, please register");
      setEmpty(true);
      setAction("Register");
    }
  }


  // useEffect hook to check if user is logged in or login table is empty
  useEffect(() => {
    if(checkUser()){
      navigate('/dashboard');
    }
    else {
      checkEmpty();
    }
  }, []);



  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (empty){
      const res = await register(formData);
      if(res){
        alert('Registered successfully');
        navigate('/');
      }
      else{
        alert('Retry');
      }
    }
    else{
      const res = await login(formData)
      if(res){
        navigate('/dashboard');
        setUser(formData.username);
      }
      else{
        alert('Invalid username or password');
      }
    }

  };




  return (
    <div className="login">
      <div className="glass-container">
        <div className="form-container">
          <form className="form">
            <div className="heading">{action}</div>
            <div className="gap-1">
              <div className="width-100">
                <input
                  type="text"
                  name="username"
                  label="username"
                  required
                  onChange={(e) => handleChange(e)}
                  className="input-field"
                  placeholder="Username"
                />
              </div>
              <div className="width-100">
                <input
                  type="password"
                  name="password"
                  label="password"
                  required
                  onChange={(e) => handleChange(e)}
                  className="input-field"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="gap-1">
              <button
                className="button"
                variant="contained"
                type="submit"
                onClick={handleLogin}
              >
              {action}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
