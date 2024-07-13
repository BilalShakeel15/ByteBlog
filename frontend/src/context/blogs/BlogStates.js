import React,{useState} from 'react'
import blogContext from './blogContext';
const BlogStates = (props) => {
    const host = "http://localhost:5000"
    const blogsInitial = []
    const [blogs, setBlogs] = useState(blogsInitial)
    const [latestblogs,setlatestblogs]=useState(blogsInitial)
    const getBlogs = async () => {
        // API Call
        const response = await fetch(`${host}/api/blogs/fetchalluserblog`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setBlogs(json);
    };
    const allBlogs = async () => {
        // API Call
        const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setBlogs(json);
    };
    const latestBlogs = async () => {
        // API Call
        const response = await fetch(`${host}/api/blogs/fetchlatestblogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setlatestblogs(json);
    };
    const addBlog=async(title,description,category,check) => {
        const response = await fetch(`${host}/api/blogs/addbloguser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                localStorage.getItem('token'),
            },
            body: JSON.stringify({title, description, category,check})
          });
          const blog = await response.json();
          setBlogs(blogs.concat(blog));
    };
    const updateblog = async(id,title,description,category) => {
        const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem('token'),
          },
          body: JSON.stringify({title, description, category})
        });
        const json = await response.json();
        let newBlogs = JSON.parse(JSON.stringify(blogs))
        // Logic to edit in client
        for (let index = 0; index < newBlogs.length; index++) {
          const element = newBlogs[index];
          if (element._id === id) {
            newBlogs[index].title = title;
            newBlogs[index].description = description;
            newBlogs[index].category = category; 
            break; 
          }
        }  
        setBlogs(newBlogs);
      };
      const updatelike = async(id) => {
        const response = await fetch(`${host}/api/blogs/updatelike/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const updatecheck = async(id) => {
        const response = await fetch(`${host}/api/blogs/updatecheck/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const updatecomments = async(id,name,comment) => {
        const response = await fetch(`${host}/api/blogs/updatecomments/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,comment})
        });
      }
      const getcomments = async(id) => {
        const response = await fetch(`${host}/api/blogs/getcomments/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=response.json();
        return json
      }
      const updatedislike = async(id) => {
        const response = await fetch(`${host}/api/blogs/updatedislike/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const deleteBlog= async(id) => {
        const newBlogs = blogs.filter((blog) => {
          return blog._id !== id;
        });
        setBlogs(newBlogs);
        const response = await fetch(`${host}/api/blogs/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        setBlogs(json);
      };
    return (
        <blogContext.Provider value={{blogs,latestblogs,latestBlogs,getBlogs,addBlog,updateblog,deleteBlog,allBlogs,updatelike,updatedislike,updatecomments,getcomments,updatecheck}}>
            {props.children}
        </blogContext.Provider>
    )
}

export default BlogStates
