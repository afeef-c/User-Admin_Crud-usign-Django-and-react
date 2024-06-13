
import './AdminPanel.css'


import React, { useEffect, useState } from 'react'
import axios from 'axios'


import { toast } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Swal from 'sweetalert2'





function AdminPanel() {
    const [userList, setUserList] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { user_id } = useParams();

    const [isopen, setIsopen] = useState(false)

    
    
    const [singleUser, setUser] = useState({
        username: '',
        email: ''
    })

    useEffect(() => {

        async function getUserList() {
            const response = await axios.get('http://localhost:8000/api/class-userlist/')
            setUserList(response.data)
            setUser(response.data)
        }
        getUserList();
        
    }, [userList])
    
    const userUpdateForm = async (index,e) => {
        e.preventDefault();
        console.log(userList);
        const result= userList.find((userList,i)=>i === index)
        console.log(result);
        const data=[e.target.username.value,e.target.email.value,e.target.password.value]
        const id = result.id;
        const response= await fetch(`http://localhost:8000/api/user-update/${id}/`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                username:data[0],
                email:data[1],
                password:result.password
            })
        })
        if (response.status===400){
            console.error('Failed to update user:', error);
            toast.error('Failed to update user');
            
        }else{
            toast.success('User updated successfully');
            setIsopen(false)
            navigate('/');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const user = axios.delete(`http://localhost:8000/api/user-delete/${id}/`).then(
                    async function getUserList() {
                        const request = await axios.get('http://localhost:8000/api/user-list/')

                        setUserList(request.data)
                    }
                )

            }
        })
    }

    async function serachUser(keyword) {
        const request = await axios.get(`http://localhost:8000/api/class-userlist/?search=${keyword}`)
        console.log(request.data);
        if (request.data.length === 0) {

        }
        setUserList(request.data)
    }


  return (
    <div>
        <div class="admin-container">
            <div class="admin-sidebar">
                <div class="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <ul class="sidebar-menu">
                    <li><Link to='adduser'>Add User</Link></li>

                </ul>
            </div>
            <div class="admin-content">
                <div class="admin-table">
                    <Toaster position='top-center' reverseOrder='false' ></Toaster>
                    <div class="search-bar">
                        <input onChange={e => serachUser(e.target.value)} type="search" class="search-input" id="datatable-search-input" placeholder="Search..." />
                        <button class="search-button" type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <table class="table table-bordered my-4 " >
                        <caption></caption>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th className='action-col'>Delete/Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user,index) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#exampleModal${index}`} onClick={()=>setIsopen(true)}>
                                        <i class="fas fa-edit"></i>
                                    </button>
                                        <p className='delete  mx-4' onClick={() => handleDelete(user.id)}> <i class="fa fa-trash" aria-hidden="true"></i></p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
        
        {isopen && userList.map((user,index) => (
        <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" role="dialog" aria-labelledby="#exampleModal$" aria-hidden="false">
            <div className="modal-dialog" role="document">
                <form className="add-user-form" onSubmit={(e)=>userUpdateForm(index,e)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' className="form-control" id="username" placeholder="Enter username"
                                    defaultValue={user.username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name='email' id="
                            email" placeholder="Enter email"
                                    defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' className="form-control" id="password" placeholder="Enter password"
                                    defaultValue={user.password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                            <button type="submit" className="btn btn-warning">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        ))}
    </div>










    )
}
  
export default AdminPanel