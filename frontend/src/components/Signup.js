import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fourth from '../images/fourth.jpg'
import Footer from './Footer'
const Signup = (props) => {
    const [credit, setCredit] = useState({ name: "", email: "", password: "", cpassword: "", image: null });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredit({ ...credit, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setCredit({ ...credit, image: e.target.files[0] });
    };

    const handleChange = async (e) => {
        e.preventDefault();
        if (credit.image==null) {
            props.showAlert("Please upload profile pic","danger");
        }else if(credit.password !== credit.cpassword)
        {
            props.showAlert("Passwords are not matching","danger");
        }
         else {
            const formData = new FormData();
            formData.append('name', credit.name);
            formData.append('email', credit.email);
            formData.append('password', credit.password);
            formData.append('image', credit.image);

            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                body: formData
            });
            const json = await response.json();
            if (json.success) {
                // Save the auth token and redirect
                // localStorage.setItem('token', json.authtoken);
                navigate("/login");
                props.showAlert("Succesfully Registered.","success");
            } else {
                props.showAlert("Already Registered","danger");
            }
        }
    };

    return (
        <>
        <div className='login-parts' style={{ backgroundImage: `url(${fourth})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}>
            <div className='login-first'></div>
            <div className='login-form signup'>
            <form onSubmit={handleChange} className='container '>

            <div className="mb-3">
                    <label htmlFor="image" className="form-label icon-wrapper">
                    
                    <input type="file" className="form-control login-input file-input" onChange={onFileChange} name='image' id="image" accept="image/*"  />
                    <div className='icon-wrapper'>
                    <i className="fa-regular fa-user user-icon"></i>
                    </div>
                    </label>
                    <div className='text-center'>Profile Image</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your name</label>
                    <input type="text" className="form-control login-input" onChange={onChange} value={credit.name} name='name' id="name" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control login-input" onChange={onChange} value={credit.email} name='email' id="email" required />
                    <div id="emailHelp" className="form-text" style={{color:"white"}}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control login-input" onChange={onChange} value={credit.password} name='password' id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control login-input" onChange={onChange} value={credit.cpassword} name='cpassword' id="cpassword" minLength={5} required />
                </div>
                
                <button type="submit" className="btn btn-dark" style={{width:"100%"}}>Sign up</button>
            </form>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Signup;
