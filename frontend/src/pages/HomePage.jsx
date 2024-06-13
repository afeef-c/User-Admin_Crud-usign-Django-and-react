import React from 'react'
import Home from '../home/Home'
import Navbar from '../navbar/Navbar'

const HomePage = ({title}) => {
  return (
    <div>
        <Navbar title={title}/>
        <Home/>

    </div>
  )
}

export default HomePage