import React from 'react'
import Profile from '../home/Profile'
import Navbar from '../navbar/Navbar'

const UserProfile = () => {
  return (
    <div>
      <Navbar title={'Profile page'}/>

      <br />
      <Profile/>
    </div>
  )
}

export default UserProfile