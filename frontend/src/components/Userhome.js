import React from 'react'
import first from '../images/first.jpg'
import Footer from './Footer';

const Userhome = () => {
    const myStyle = {
        backgroundImage: `url(${first})`,
        width:"100vw",
        height: "100vh",
        marginTop: "0px",
        fontSize: "50px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };
  return (
    <>
    <div className="carousel-item active">
    <img src={first} className="d-block w-100" alt="..." style={myStyle} />
    <div className="carousel-caption d-none d-md-block">
      <h5 className='welcome-message'>{`Welcome ${localStorage.getItem('name')}`}</h5>
      {/* <p>Some representative placeholder content for the first slide.</p> */}
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default Userhome
