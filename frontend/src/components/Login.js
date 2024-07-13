import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fourth from '../images/fourth.jpg'
import './about.css'
import Footer from './Footer'

const Login = (props) => {
    const [credit, setCredit] = useState({ email: "", password: "" });
    let n,i;
    let navigate=useNavigate();
    const onChange = (e) => {
        setCredit({ ...credit, [e.target.name]: e.target.value })
    }
    const handlechange = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credit.email, password: credit.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            n=json.user.name;
            i=json.user.image;
            localStorage.setItem('name',n);
            localStorage.setItem('image', `http://localhost:5000/uploads/${i}`); // Save the image URL
            navigate("/userhome");
            props.showAlert("Succesfully Loggoed in.","success");

        }
        else {
            props.showAlert("Invalid Credentials","danger");
        }
    }
    return (
        <>
        <div className='login-parts' style={{ backgroundImage: `url(${fourth})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}>
            <div className='login-first'>
            </div>
        <div className='container my-3 login-form' >
            <form onSubmit={handlechange} style={{margin:"1rem"}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={credit.email} onChange={onChange} name='email' className="form-control login-input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" style={{color:"white"}}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={credit.password} onChange={onChange} name='password' className="form-control login-input" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-dark" style={{width:"100%"}}>Login</button>
            </form>
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default Login
