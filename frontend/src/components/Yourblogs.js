import React, { useEffect, useContext, useRef, useState } from 'react'
import blogContext from "../context/blogs/blogContext";
import Yourblogitem from './Yourblogitem';
import Footer from './Footer';

const Yourblogs = (props) => {
  const ref = useRef(null);
  const [blog, setBlog] = useState({ id: "", etitle: "", edescription: "", ecategory: "" });
  const editblog = (currentBlog) => {
    ref.current.click();
    setBlog({ id: currentBlog._id, etitle: currentBlog.title, edescription: currentBlog.description, ecategory: currentBlog.category })
  }
  const handlechange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
}

  const a = useContext(blogContext);
  const { blogs, getBlogs, updateblog} = a;
  useEffect(() => {
    getBlogs();

    // eslint-disable-next-line
  }, [])
  const sendtoupdate=(e)=>{
    e.preventDefault();
    ref.current.click();
    updateblog(blog.id,blog.etitle,blog.edescription,blog.ecategory)
    setBlog({ id: "", etitle: "", edescription: "", ecategory: ""});
  }
  return (
    <>
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog ">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="container" style={{ marginTop: "5rem" }}>
                <h2>Update your blog here</h2>
            </div>
      <div className='container my-5' >
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" value={blog.etitle} name='etitle' onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-floating">
                        Description
                        <label htmlFor="exampleInputEmail1" className="form-label"></label>
                        <textarea className="form-control" name='edescription' value={blog.edescription} onChange={handlechange} id="floatingTextarea2" style={{ height: "300px" }} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                        <input type="text" value={blog.ecategory} name='ecategory' onChange={handlechange} className="form-control" id="exampleInputPassword1" required />
                    </div>
                </form>
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={sendtoupdate}>Update</button>
      </div>
    </div>
  </div>
</div>
      <div className='container my-5'>
        <h2 style={{ marginTop: "5rem" }}>Your Blogs</h2>
      </div>
      <div className="row my-3 " >
        {Array.isArray(blogs) ? (
          blogs.map((blog) => {
            return <Yourblogitem blog={blog} key={blog._id} editblog={editblog}  showAlert={props.showAlert}/>;
          })
        ) : (
          <p>No blogs available</p>
        )}

      </div>
      <Footer/>
    </>
  )
}

export default Yourblogs
