import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start" style={{marginBottom:"0rem"}}>
  <div className="text-center p-3" style={{backgroundColor: "white",color:"black"}}>
    © 2024 Copyright:
    <Link className="" to="/" style={{color:"black"}}> ByteBlog</Link>
  </div>
</footer>
  )
}

export default Footer
