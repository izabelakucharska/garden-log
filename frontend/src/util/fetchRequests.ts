interface ILoginData {
  email: string,
  password: string
}

interface ISignupData {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}


const logout = async () => {
  const response = await fetch('/logout')
  return response.json()
}

const loginStatus = async () => {
  const response = await fetch('/login-status')
  return response.json()
}


const login = async (data: ILoginData) => {
  const response = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return response.json()
}

const signup = async (data: ISignupData) => {
  const response = await fetch('/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return response.json()
}

export {
  logout,
  loginStatus,
  login,
  signup,
}

