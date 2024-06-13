import React from 'react'
import './Navbar.css'
import { jwtDecode } from 'jwt-decode'
import { getlocal } from '../helpers/auth'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({title}) => {
  let {username,is_admin}=jwtDecode(getlocal())
  const navigate=useNavigate()



  const logout=()=>{
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  
  return (
    <div>
      <nav class="navbar bg-secondary">
        
        <div class="container-fluid">
          <h3 class="text-light m-2 ">{title} </h3>
            <div class="d-flex">
              {!is_admin && 
                  <>
                    <a class="navbar-brand"><Link to="/">Home</Link></a>
                    <a class="navbar-brand"><Link to='/profile'>Profile</Link></a>
                  </>
               }
               
               
                <a class="navbar-brand text-warning">Hello,{username}</a>
                <button className='bttn' onClick={logout}>logout</button>
            </div>
        </div>
      </nav>  
    </div>
  )
}

export default Navbar