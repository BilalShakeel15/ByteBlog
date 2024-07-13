import React from 'react'
import first from '../images/first.jpg'
import second from '../images/second.jpg'
import third from '../images/third.jpeg'
import fourth from '../images/fourth.jpg'
import Footer from './Footer'

const Home = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner " style={{marginTop:"3rem"}}>
          <div className="carousel-item active">
            <img src={first} className="d-block w-100" alt="..." style={{ height: "93vh" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Welcome to ByteBlog</h5>
              {/* <p>Some representative placeholder content for the first slide.</p> */}
            </div>
          </div>
          <div className="carousel-item">
            <img src={second} className="d-block w-100" alt="..." style={{ height: "93vh", style: "black" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Write your own Blog</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img src={third} className="d-block w-100" alt="..." style={{ height: "93vh", color: "black" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Read different Blogs</h5>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <div className='container'>
      <img src={fourth} className="d-block w-100" alt="..." style={{ height: "60vh", color: "black" }} />
      </div> */}
      <Footer/>
    </>
  )
}

export default Home
