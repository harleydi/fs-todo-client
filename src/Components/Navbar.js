import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to={"/"} style={{ color: 'black', margin: '0 10px'}}>Home</Link>
        <Link to={"/todo-form"} style={{ color: 'black', margin: '0 10px'}}>Create Todo</Link>
    </div>
  )
}

export default Navbar