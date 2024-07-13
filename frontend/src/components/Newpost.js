import React, { useState,useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import blogContext from "../context/blogs/blogContext";
import Alert from './Alert';

const Newpost = (props) => {
    let ref=useRef(null)
    let navigate=useNavigate();
    const a = useContext(blogContext);
    const {addBlog}=a
    const [credit, setCredit] = useState({ title: "", description: "", category: "", check: "false",image:null })
    const handlechange = (e) => {
        setCredit({ ...credit, [e.target.name]: e.target.value })
    }
    const onFileChange = (e) => {
        setCredit({ ...credit, image: e.target.files[0] });
    };
    const save = async(e) => {
        e.preventDefault();
        // addBlog(credit.title, credit.description, credit.category,credit.check);
        if(credit.image==null)
        {
            props.showAlert("Please upload image of blog","danger");
            return
        }
        const formData = new FormData();
            formData.append('title', credit.title);
            formData.append('description', credit.description);
            formData.append('category', credit.category);
            formData.append('check', credit.check);
            formData.append('author',localStorage.getItem('name'));
            formData.append('image',credit.image)

        const response = await fetch("http://localhost:5000/api/blogs/addbloguser", {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json",
                "auth-token":
                  localStorage.getItem('token'),
              },
            body: formData
        });
        const json = await response.json();
        if (json.success) {
           
        setCredit({ title: "", description: "", category: "",check:"false" })
        props.showAlert("Your blog is saved,Kindly visit Yourblog to post","success");
        }
        else{
            props.showAlert("Error in saving","danger");
        }
    }
    return (
        <>
            <div className="container" style={{ marginTop: "5rem" }}>
                <h2>Write your blog here</h2>
            </div>
            <div className='container my-5' >
                <form>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label icon-wrapper">
                    
                    <input type="file" className="form-control login-input file-input" onChange={onFileChange} name='image' id="image" accept="image/*" required />
                    <div className='icon-wrapper'>
                    <i class="fa-brands fa-blogger user-icon"></i>
                    </div>
                    </label>
                    <div className='text-center'>Blog Image</div>
                </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" value={credit.title} name='title' onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-floating">
                        Description
                        <label htmlFor="exampleInputEmail1" className="form-label"></label>
                        <textarea className="form-control" name='description' value={credit.description} onChange={handlechange} id="floatingTextarea2" style={{ height: "300px" }} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                        <input type="text" value={credit.category} name='category' onChange={handlechange} className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <button type="submit" onClick={save} className="btn btn-primary">Save</button>
                </form>
            </div>
        </>
    )
}

export default Newpost
