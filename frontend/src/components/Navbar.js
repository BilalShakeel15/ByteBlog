import React,{useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  
  let ref=useRef(null);
  const close=()=>{
    ref.current.click()
  }
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('image')
        navigate("/")

    }
    return (
        <div className='container2' style={{width:"100%"}}>
            {!localStorage.getItem('token') ? <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">ByteBlog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/userhome" style={{display:"none"}}>Userhome</Link>
                            </li>
                        </ul>

                        <Link className="btn btn-dark mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-dark mx-1" to="/signup" role="button">Sign Up</Link>
                    </div>
                </div>
            </nav> : <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" ref={ref} data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">{localStorage.getItem('name')}</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className={`nav-link ${navigate==="/userhome"}?"active":""`} onClick={close} aria-current="page" to="/userhome">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${navigate==="/yourblogs"}?"active":""`} onClick={close}  aria-current="page" to="/yourblogs">Your Blogs</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${navigate==="/user-new-post"}?"active":""`} onClick={close} aria-current="page" to="/user-new-post">Create Blog</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${navigate==="/blogs"}?"active":""`} onClick={close} aria-current="page" to="/blogs">Blogs</Link>
          </li>
          <li><Link className="nav-link " to="/" onClick={logout}> Logout</Link></li>
        </ul>
      </div>
    </div>
    <div>
    <img src={localStorage.getItem('image')}className=" float-end" alt="..." style={{height:"50px",width:"65px",borderRadius:"50%"}}/>
    <Link className="navbar-brand float-end" to="#" style={{fontSize:"x-large"}}>{localStorage.getItem('name')}</Link>
    </div>
  </div>
</nav>}
        </div>
    )
}

export default Navbar
