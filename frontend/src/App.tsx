import { useState, useEffect } from 'react';
// import {Cloudinary} from "@cloudinary/url-gen";
// import {AdvancedImage} from '@cloudinary/react';
// import {fill} from "@cloudinary/url-gen/actions/resize";
import './App.css';
import Signup from './signup/Signup';
import Login from './login/Login';
import Nav from './navigation/Nav';
import MyGarden from './mygarden/MyGarden';
import Home from './home/Home'
import { logout, loginStatus } from './util/fetchRequests';


function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [user, setUser] = useState({ name: 'None', email: 'none@null.com', id: 0 })
  const [page, setPage] = useState("home")

  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'demo'
  //   }
  // })

  async function exit() {
    const logoutStatus = await logout()
    console.log(logoutStatus)
    setUser({ name: 'None', email: 'none@null.com', id: 0 })
    setLoggedIn(false)
    setPage('home')
  }
  
  const fetchLogin = async () => {
    const status = await loginStatus()
    if (status.status === 'logged in')  {
      setLoggedIn(true)
      setUser(status.user)
      setPage('home')
    }
  }

  useEffect(() => {
    fetchLogin()
  }, [])

  function renderPage() {
    switch(page) {
      case 'home':
        return <Home />
      case 'signup':
        return <Signup setPage={setPage} />
      case 'login' :
        return <Login setPage={setPage} fetchLogin={fetchLogin} />
      case 'mygarden':
        return <MyGarden />
    }
  }


  return (
    <div>
      <Nav page={page} setPage={setPage} user={user} exit={exit} loggedIn={loggedIn} />
      {renderPage()} 
   </div>
  )
}

export default App
