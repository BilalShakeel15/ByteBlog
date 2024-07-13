import React,{useContext} from 'react'
import blogContext from "../context/blogs/blogContext";
import { useNavigate } from 'react-router-dom';
const Yourblogitem = (props) => {
    let navigate=useNavigate();
    const a = useContext(blogContext);
    const {deleteBlog,updatecheck}=a
    const { blog,editblog} = props;
    const check=()=>{
      props.showAlert("Your blog hass published.","success");
      navigate("/blogs");
      updatecheck(blog._id);
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
    
    <div className="col-md-4 ">
    <div className="card my-3" >
    <img src={`http://localhost:5000/uploads/${blog.image}`}className="card-img-top" alt="..." style={{height:"20rem"}}/>
      <div className="card-body ">
      <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${blog.check===true?"bg-primary":"bg-danger"}`} style={{marginLeft:"-2rem"}}>
    {blog.check===true?"Posted":"Pending"}
    <span className="visually-hidden">unread messages</span>
    </span>
        <div className="d-flex flex-row  align-items-center">
            <h5 className="card-title">{blog.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editblog(blog)}}></i>
            <i className="fa-solid fa-trash " style={{cursor:"pointer"}} onClick={() => {
  deleteBlog(blog._id);
  props.showAlert("Deleted successfully", "success");
}}></i>
            {/* <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editnote(note)}}></i> */}
        </div>
        <p className="card-text">{blog.description.slice(0,175)}...</p>
      </div>
      <div className='d-flex'>
      {blog.check==false?<button className="btn btn-dark mx-2 my-2" style={{width:"5rem"}} onClick={check}>Post</button>:""}
      <button className="btn btn-dark my-2" style={{width:"5rem"}} onClick={specific}>Preview</button>
      </div>
    </div>
    </div>
  )
}

export default Yourblogitem
