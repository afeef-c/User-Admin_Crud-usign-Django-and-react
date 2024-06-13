import React from 'react'
import AdminPanel from '../admin/AdminPanel'
import Navbar from '../navbar/Navbar'

const AdminPanelPage = ({title}) => {
  return (
    <div>
        <Navbar title={title}/>
        <AdminPanel/>
    </div>
  )
}

export default AdminPanelPage