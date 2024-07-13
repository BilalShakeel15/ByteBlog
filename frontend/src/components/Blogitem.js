import React, { useContext, useState } from 'react'
import blogContext from "../context/blogs/blogContext";
import Specificblog from './Specificblog';
import { useNavigate } from 'react-router-dom';
const Blogitem = (props) => {
  let navigate=useNavigate();
  const [heart, setHeart] = useState("fa-regular")
  const a = useContext(blogContext);
  const { deleteBlog, updatelike, updatedislike } = a
  const { blog, showcomment } = props;
  const temp=()=>{
    localStorage.setItem('id',blog._id);
    showcomment();
  }
  const like = () => {
    if (heart === "fa-regular") {
      setHeart("fa-solid");
      updatelike(blog._id);
    }
    else {
      setHeart("fa-regular");
      updatedislike(blog._id)
    }
  }
  const specific=()=>{
    // console.log(blog.title);
    const newCredit = {
      t: blog.title,
      d: blog.description,
      c: blog.category,
      a: blog.author,
      i: blog.image,
      dte: blog.date
    };
     navigate("/specificblog",{state:{newCredit}});
  }
  return (
    <>
      <div className="col-md-4">
        <div className="card my-3 d-flex justify-content-center temp" >
        <img src={`http://localhost:5000/uploads/${blog.image}`}className="card-img-top" alt="..." style={{height:"20rem"}}/>
          <div className="card-body " style={{cursor:"pointer"}} onClick={specific}>
            <div className="d-flex flex-row  align-items-center">
              <h5 className="card-title">{blog.title}</h5>
            </div>
            <p className="card-text">{blog.description.slice(0,175)}...</p>
            <figcaption className="blockquote-footer mb-0 font-italic">
            {blog.author}
          </figcaption>
          </div>
          <div className="d-flex ">
            <div className="p-2 flex-fill d-flex justify-content-center align-items-center"><i className={`${heart} fa-heart`} onClick={like} style={{ cursor: "pointer" }}></i></div>
            <div className="p-2 flex-fill" style={{ cursor: "pointer" }} onClick={temp}>Comments</div>
            {/* <div className="p-2 flex-fill">Flex item</div> */}
          </div>
          
        </div>

      </div>
    </>
  )
}

export default Blogitem
