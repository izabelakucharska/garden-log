import { SyntheticEvent, useState } from 'react';
import './Login.css';
import { login } from '../util/fetchRequests';

interface ILoginProps {
  setPage: Function,
  fetchLogin: Function
}

export default function Login(props: ILoginProps) {
  const { setPage, fetchLogin } = props
  const minLength = 8;
  const maxLength = 16;
  const [error, setError] = useState('');
  
  async function submitHandler(event: SyntheticEvent):Promise<void> {
    event.preventDefault();
    const data = {
      email: (document.querySelector('#user-email') as HTMLInputElement).value,
      password: (document.querySelector('#user-password') as HTMLInputElement).value
    }
    const result = await login(data)
    if (result.error) {
      setError(result.error)
    } else {
      setError('')
      fetchLogin()
    }
  }

  return (
    <div className='login-card'>
    <form className='login-form' action='#' method='POST' onSubmit={(event) => submitHandler(event)} >
      <h1>Log In</h1>
      {error ? (<span className="error">{error}</span>) : ("")}
      <div className='form-field'>
        <label htmlFor='user-email'>Email:</label>
        <input id='user-email' name='user-email' type='email' placeholder='Your Email' required />
      </div>
      <div className='form-field'>
        <label htmlFor='user-password'>Password:</label>
        <input id='user-password' name='user-password' type='password' minLength={minLength} maxLength={maxLength} required />
      </div>
      <input type="submit" value="Log in" />
      <p>Need to register a new account? <a onClick={() => { setPage('signup') }} >Register</a></p>
    </form>
    </div>
  )
}