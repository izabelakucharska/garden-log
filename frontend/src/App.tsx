import { useState, useEffect } from 'react';
import './App.css';
import Signup from './signup/Signup';
import Login from './login/Login';
import { logout, loginStatus } from './util/fetchRequests';

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [user, setUser] = useState({ name: 'None' })
  const [signupMode, setSignupMode] = useState<boolean>(false)

  function changeSignupMode(mode: boolean) {
    setSignupMode(mode)
  }

  async function exit() {
    const logoutStatus = await logout()
    console.log(logoutStatus)
    setUser({ name: 'none'})
    setLoggedIn(false)
  }

  const fetchLogin = async () => {
    const status = await loginStatus()
    if (status.status === 'logged in')  {
      setLoggedIn(true)
      setUser(status.user)
    }
  }

  useEffect(() => {
    fetchLogin()
  }, [])


  return (
    <>
    {loggedIn ? (
      <div className='wrapper'>
        <div className="navigation"> 
          <span className="welcome">Hello { user.name }</span>
          <span className="logout"><a onClick={() => {exit()}} >Log out</a></span>
        </div> 
      </div>
    ) : signupMode ? (
      <Signup changeSignupMode={changeSignupMode} />
    ) : (
      <Login changeSignupMode={changeSignupMode} fetchLogin={fetchLogin} />
    )}
  </>
  )
}

export default App
