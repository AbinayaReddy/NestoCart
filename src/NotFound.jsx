import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  let navigate=useNavigate();
  // setTimeout(()=>{navigate("/Home")},5000);
  return (
    <section>
    <h1>404-Page NotFound</h1>
    <p>The Page you are looking for does not exist.</p>
    </section>
  )
}

export default NotFound;
