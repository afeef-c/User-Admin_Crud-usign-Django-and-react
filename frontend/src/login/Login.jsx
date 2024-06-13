import './Login.css'
import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import login, { getlocal } from '../helpers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { updateAuthToken, updateUser } from '../redux/AuthContext'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  const navigate= useNavigate()
  const response=getlocal()

  const {user,authToken}=useSelector((state)=>state.auth)
  const dispatch= useDispatch()

  useEffect(()=>{
    // console.log(response);
    if (response) {
      navigate('/')
    }
  })

  const handleSubmit= async(e) =>{ 
    e.preventDefault()
    if (e.target.email.value.trim()===""){
      toast.error("Please enter email field!")
    }
    
    
    try{
      const response= await login(e)
      const decoded=jwtDecode(response.access)
  
      dispatch(updateUser(decoded))
      dispatch(updateAuthToken(response))
      console.log("successfull")
      navigate('/')
      
      
    }catch(err){
      // toast.error(err)
      console.log("Error occured:",err);
    }

  }

  return (
    <div>
    <Toaster position='top-left' reverseOrder='false' ></Toaster>
    <div className='logindiv bg-white'>

      <div class="container p-5">
        <h1 class="text-dark">Login page</h1>
        <br/>
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name='email' className='inputsize'class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"/>
           
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name='password' class="form-control" id="exampleInputPassword1"/>
        </div>
        
        <button type="submit" class="loginbtn">Login</button>
       

        </form>
        <br/>
        <p>Don't have an account?</p>
        <h6><Link to="/register">Register Free here!</Link></h6>
      </div>
    </div>

    </div>
  )
}

export default Login