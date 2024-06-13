import React, { useEffect, useState } from 'react'
import './Profile.css'
import { jwtDecode } from 'jwt-decode'
import { getlocal } from '../helpers/auth'
import axios from 'axios'
import profile_pic from '../images/profile.jpeg'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Profile = () => {
  const { user_id } = jwtDecode(getlocal());
  const [profile_img, setProfileImage] = useState(null);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isopen,setIsopen]=useState(false)

  const [user, setUser] = useState({
      username: '',
      email: '',
      profile_img: '',
  });
  const navigate = useNavigate()

 


  useEffect(() => {
      async function getUser() {
          try {
              const response = await axios.get(`http://localhost:8000/api/user-details/${user_id}/`);
       
              setUser(response.data);

             
          } catch (error) {
              console.error('Failed to fetch user details:', error);
          }
      }
      getUser();
      console.log(isopen)
  }, [user_id, isopen, username, profile_img,email,password]);




  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('profile_img', e.target.profile_img.files[0]); 
    formData.append('is_active',true)
    

    try {
        const response = await fetch(`http://localhost:8000/api/user-update/${user_id}/`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        navigate('/profile');
        setIsopen(false)
        toast.success('User updated successfully');
        
    } catch (error) {
        console.error('Failed to update user: ', error);
        toast.error('Failed to update user');
    }
};


    

  return (
    <div className='main'>
            <div className="container my-4 py-5">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
                <div className="row justify-content-center align-items-center">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white">
                                    <img
                                        src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : profile_pic}
                                        alt="Avatar"
                                        className="img-fluid my-5"
                                        style={{ width: '80px' }}
                                    />
                                    <h5>{user.username}</h5>
                                    <button type="button" className="btn"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setIsopen(true)}>
                                        <i className="far fa-edit mb-5 btn btn-outline-dark"></i>
                                    </button>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Information</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{user.email}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isopen && 
            
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update user Profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form onSubmit={updateProfile}>
                        <input
                            type="file"
                            name="profile_img"
                            onChange={e => setProfileImage(e.target.files[0])}
                        />
                    
                    <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                    <div style={{height:'100px'}} className="mb-3 d-flex justify-content-left">
                                    <div style={{width:'100px'}} className='h-100'>
                                        {
                                        profile_img?
                                            <img className='w-100' src={URL.createObjectURL(profile_img)} ></img>
                                        :
                                            <img className='w-100' src={user.profile_img ? user.profile_img : ""} ></img>
                                        }
                                    </div>
                                </div>

                    
                        <div className='form-contain' >
                            
                            
                                <input className='add-user-input' type="text" name='username' placeholder='username' defaultValue={user.username} 
                                    onChange={e => setUsername(e.target.value)}
                                />
 
                                <input className='add-user-input' type="email" name='email' placeholder='email' defaultValue={user.email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            
                                <input className='add-user-input' type="password" name='password' defaultValue={user.password} placeholder='password'
                                    onChange={e => setPassword(e.target.value)}
                                />
                            
                                <input className='add-user-button' type="submit" value='Update' />
                            
                        </div>
                    </form>
 
                </div>
                
                </div>
            </div>
            
            }
          

        </div>
  )
}

export default Profile