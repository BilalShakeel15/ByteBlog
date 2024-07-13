import React from 'react'
import Footer from './Footer'
import './about.css'

const Home = () => {
  return (
    <>
    <div className='about-body' style={{marginTop:"4rem"}}>
      <div className='container '>
        <h2>About us</h2>
        <p >Welcome to ByteBlog, your go-to platform for all things coding and technology! Whether you're a seasoned developer, a coding enthusiast, or just starting your journey in the world of programming, our blog app is designed to inspire, educate, and connect you with like-minded individuals.</p>
      </div>
      <div className='container' style={{ borderRadius: "2rem", border: "2px solid white" }}>
        <h2>Our Mission</h2>
        <p>At ByteBlog, our mission is to foster a vibrant community where knowledge sharing and collaboration thrive. We believe that coding is not just a skill but an art form, and through our platform, we aim to empower coders of all levels to share their stories, insights, and innovations. Our commitment is to provide a space where creativity meets technology, enabling every user to grow and contribute meaningfully to the coding community.</p>
      </div>
        <h2 style={{ textAlign: "center" }}>What we offer</h2>
      <div className='container  about-container'>
        <div className="card mx-4 cardbdy" style={{width: "18rem"}}>
          <div className="card-body cardbg ">
            <h5 className="card-title">Personal Dashboard</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">User </h6>
            <p className="card-text"> Our personal dashboard empowers users with complete control over their blogging experience. Users can manage their blogs seamlessly by adding new posts, editing existing ones, and deleting blogs when necessary. Additionally, users can engage with the community by commenting on any blog, liking posts, and marking blogs as their favorites. This personalized space ensures that users can keep track of their activities, stay organized, and interact with the content that matters most to them.</p>
          </div>
        </div>
        <div className="card mx-4 cardbdy" style={{width: "18rem"}}>
          <div className="card-body cardbg ">
            <h5 className="card-title">User-Generated Content</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Usefull content</h6>
            <p className="card-text">  At ByteBlog, we believe everyone has a story to tell. Whether you want to share your latest project, offer tips and tricks, or discuss industry trends, our platform allows you to write and publish your own blogs easily. Our intuitive writing tools and supportive editorial team ensure that your content shines, helping you reach a broader audience and make a significant impact.</p>
          </div>
        </div>
        <div className="card mx-4 cardbdy" style={{width: "18rem"}}>
          <div className="card-body cardbg ">
            <h5 className="card-title">Insightful Blog Posts</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Tips and Tricks</h6>
            <p className="card-text">  Dive into a vast collection of articles written by experts and enthusiasts alike. From in-depth tutorials and coding tips to the latest trends in technology, our blog covers a wide range of topics to help you stay updated and expand your knowledge. Whether you're interested in web development, data science, artificial intelligence, or any other tech-related field, you'll find valuable content tailored to your interests and skill level.</p>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home
