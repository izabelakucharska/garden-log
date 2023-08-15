import './Signup.css';
import { useState } from 'react';
import { signup } from '../util/fetchRequests';

interface ISignupProps {
  setPage: Function
}

export default function Signup(props: ISignupProps) {
  const { setPage } = props;
  const minLength = 8;
  const maxLength = 16;
  const [error, setError] = useState('');
  
  async function submitHandler(event: React.FormEvent):Promise<void> {
    console.log(event.target);
    event.preventDefault();
    const data = {
      name: (document.querySelector('#user-name') as HTMLInputElement).value,
      email: (document.querySelector('#user-email') as HTMLInputElement).value,
      password: (document.querySelector('#user-password') as HTMLInputElement).value,
      password_confirmation: (document.querySelector('#user-password-confirmation') as HTMLInputElement).value
    }
    const result = await signup(data)
    if (result.error) {
      setError(result.error)
    } else {
      setError('')
      setPage('login')
    }   
  }

  return (
  <div className='signup-card'>
    <form className='signup-form' action='#' method='POST' onSubmit={(event) => submitHandler(event)} >
      <h1>Registration</h1>
      {error ? (<span className="error">{error}</span>) : ("")}
      <div className='form-field'>
        <label htmlFor='user-name'>Name</label>
        <input id='user-name' name='user-name' type='text' placeholder='Your Name' />
      </div>
      <div className='form-field'>
        <label htmlFor='user-email'>Email</label>
        <input id='user-email' name='user-email' type='email' placeholder='Your Email' required />
      </div>
      <fieldset className='password-fields'>
        <div className='form-field'>
          <label htmlFor='user-password'>Password</label>
          <input id='user-password' name='user-password' type='password' minLength={minLength} maxLength={maxLength} required />
        </div>
        <div className='form-field'>
          <label htmlFor='user-password-confirmation'>Confirm Password</label>
          <input id='user-password-confirmation' name='user-password-confirmation' type='password' minLength={minLength} maxLength={maxLength} required />
        </div>
      </fieldset>
      <input type="submit" value="Submit" />
      <p>Already have an account? <a onClick={() => { setPage('login') }} >Log in</a></p>
    </form>
    </div>
  )
}