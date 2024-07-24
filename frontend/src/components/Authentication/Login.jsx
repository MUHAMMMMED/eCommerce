import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "./AxiosInstance";
import './styles.css';
  
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (userExists) {
      // Navigate to login page if user does not exist
      navigate('/dashboard');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  const [logindata, setLogindata] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleOnChange = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosInstance.post('/login/', logindata);
      const response = res.data;
      const user = {
        'full_name': response.full_name,
        'email': response.email
      };
      if (res.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token));
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful');
        await navigate('/dashboard');
 
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("بريد إلكتروني غير صالح أو كلمة السر، يرجى المحاولة مرة أخرى.");
      } else {
        toast.error('حدث خطأ غير متوقع. الرجاء معاودة المحاولة في وقت لاحق.');
      }
    }
  };

  return (
    <div className='main-wrapper' >
      <div className='Row1'>
        <div className="login-form">
          <h4 className="TitlE">تسجيل الدخول </h4>
          <div>
            <form action="" style={{padding:'0',margin:'0'}} onSubmit={handleSubmit}>
              <div className="single-form">
                <input type="email" name="email" value={logindata.email} onChange={handleOnChange} placeholder="البريد الالكتروني" />
              </div>
              <div className="single-form">
                <input type="password" value={logindata.password} name="password" onChange={handleOnChange} placeholder="كلمة السر" />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="single-form">
                <button className=" BtnPrimary" type="submit" value="Login">تسجيل الدخول</button>
               </div>
        
            </form>
          </div>
        </div>
      </div>       <ToastContainer />
    </div> 
  );
}

export default Login;
