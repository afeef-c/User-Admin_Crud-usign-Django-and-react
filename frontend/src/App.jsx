import { BrowserRouter,Routes,Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import UserProfile from "./pages/UserProfile"
import AddUser from "./admin/AddUser"
import PrivateRouter from "./utils/PrivateRouter"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<PrivateRouter/>}></Route>
        <Route exact path='/' element={<HomePage/>}>  </Route>
        <Route exact path='/profile' element={<UserProfile/>}>  </Route>
        <Route Component={LoginPage} path='/login'/>
        <Route Component={SignupPage} path='/register'/>
        <Route Component={AddUser} path='/adduser'/>



      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
