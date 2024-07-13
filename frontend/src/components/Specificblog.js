import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer';

const Specificblog = () => {
    const location = useLocation();
    const { newCredit } = location.state || {}
    return (
        <>
            <div>
                <div className="card mb-3 container" style={{ marginTop: "5rem" }}>
                    <img src={`http://localhost:5000/uploads/${newCredit.i}`} className="card-img-top" alt="..." style={{ height: "50vh" }} />
                    <div className="card-body">
                        <h5 className="card-title">{newCredit.t}</h5>
                        <p className="card-text"><small className="text-body-secondary">Category: {newCredit.c}</small></p>
                        <p className="card-text">{newCredit.d}</p>
                        <figcaption className="blockquote-footer mb-0 font-italic">
                            {newCredit.a}
                        </figcaption>
                        <p className="card-text"><small className="text-body-secondary">Dated: {newCredit.dte.slice(0,10)}</small></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Specificblog
