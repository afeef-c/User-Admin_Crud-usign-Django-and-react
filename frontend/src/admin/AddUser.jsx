import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddUser.css'
import toast, { Toaster } from 'react-hot-toast'

const AddUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')

    const navigate=useNavigate()

    const handleSubmit= async (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (username.trim()==""){
            toast.error("Please enter username")
            return 
        }else if (!emailRegex.test(email)){
            toast.error("Enter a valid Email Id")
            return 
        }else if (password!==password1){
            toast.error("Password didn't match!")
            return
        }else if (password.length<6){
            toast.error("Password should contain atleast six characters!")
            return 
        }




        try{

            const user = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            if (user.status === 400){
                toast.error("Username or Email already exists!")

            }else{

                navigate('/')
                toast.success("User created successfully!")
            }
        }catch(err){
            console.log('1');
            toast.error('Error occured!')
            navigate('/adduser')
        }

    }
  return (
      <div>

            <Toaster position='top-left' reverseOrder='false' ></Toaster>
        <div className="regfrm  bg-white">
            <div  class='container p-5'>
                <form onSubmit={handleSubmit}>
                    <h2>Add new user</h2>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text" class="form-control" name='username' id="exampleInputEmail1" aria-describedby="emailHelp" value={username}
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="exampleInputPassword1" value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" name="password1" class="form-control" id="exampleInputPassword1" value={password1}
                        onChange={(e)=>setPassword1(e.target.value)}/>
                    </div>
                    
                    
                    <button type="submit" class="loginbtn">Create user</button>
        

                </form>
                
            </div>
        </div>
      </div>
   )
}

export default AddUser