import React, { useEffect, useContext, useRef, useState } from 'react'
import blogContext from "../context/blogs/blogContext";
import Blogitem from './Blogitem';
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
const Blogs = () => {
  let navigate=useNavigate();
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  let ref = useRef(null)
  const a = useContext(blogContext);
  const { blogs, allBlogs, updatecomments, getcomments, latestblogs, latestBlogs } = a;
  useEffect(() => {
    allBlogs();
    latestBlogs();
    // eslint-disable-next-line
  }, [])
  const addcomment = (e) => {
    e.preventDefault();
    const n = localStorage.getItem('name')
    const id = localStorage.getItem('id')
    updatecomments(id, n, comment);
    setComment("")
    ref.current.click();
    localStorage.removeItem('id')
  }
  const change = (e) => {
    setComment(e.target.value)
  }
  const showcomment = async () => {
    ref.current.click()
    const id = localStorage.getItem('id');
    const temp = await getcomments(id);
    // localStorage.removeItem('id')
    setComments(temp)
    // console.log(typeof(comments));
  }
  const specificblog=(t,a,d,c,dte,i)=>{
    // console.log(blog.title);
    const newCredit = {
      t,
      d, 
      c,
      a, 
      i,
      dte
    };
    // console.log(newCredit);
     navigate("/specificblog",{state:{newCredit}});
  }
  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }} ref={ref}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <h1 className="modal-title fs-5" id="exampleModalLabel">Comments</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {localStorage.getItem('token') ? <form onSubmit={addcomment}>
                <h6 style={{ color: "#3FA2F6" }}>{localStorage.getItem('name')}</h6>
                <div className="mb-3">
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Comment' onChange={change} name='comment' value={comment} />
                </div>
                <button type="submit" className="btn btn-dark">Post</button>
              </form> : "Total comments: "+comments.length}
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
            
              {comments && comments.length > 0 ? (
                comments.map((c) => (
                  <div className="card container my-2" style={{ width: "29rem" }}>
                  <div className="card-body" key={c.comment} >
                    <h6>{c.name}</h6>
                    <p>{c.comment}</p>
                  </div>
                  </div>
                ))
              ) : (
                <p>No comments available</p>
              )}
            
          </div>
        </div>
      </div>
      <div className='blogs-parts '>
        <div style={{ width: "80%" }}>
          <div className='container'>
            <h2 style={{ marginTop: "5rem",textAlign:"center",fontWeight:"bolder"}}>Blogs</h2>
          </div>
          <div className="row my-3 container d-flex justify-content-center">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.filter(blog => blog.check).map((blog) => (
                <Blogitem blog={blog} key={blog._id} showcomment={showcomment} />
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </div>
        </div>
        <div className='latest'>
          <h3 style={{ textAlign: "center" }}>Latest Blogs</h3>
          <div>
            {Array.isArray(latestblogs) && latestblogs.length > 0 ? (
              latestblogs.filter(latestblog => latestblog.check).map((latestblog) => (
                <ul className=''>
                  <li className='latest-list' key={latestblog._id} style={{cursor:"pointer"}} onClick={()=>specificblog(latestblog.title,latestblog.author,latestblog.description,latestblog.category,latestblog.date,latestblog.image)}>
                    {latestblog.title}
                  </li>
                  <figcaption className="blockquote-footer mb-0 font-italic my-1" style={{textAlign:""}}>
                    {latestblog.author}
                  </figcaption>
                </ul>

              ))
            ) : (
              <p>No blogs available</p>
            )}

          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Blogs
