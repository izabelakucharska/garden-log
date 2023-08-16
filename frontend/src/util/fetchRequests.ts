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

interface IGardenData {
  name: string,
  latitude: number,
  longitude: number
}

interface IPlantData {
  name: string,
  gardenId: number,
  genus?: string,  
  species?: string,
  image?: string
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

const gardenStatus = async () => {
  const response = await fetch('/garden-status')
  return response.json()
}
const createGarden = async (data: IGardenData) => {
  const response = await fetch('create-garden', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return response.json()
}

const getClimate = async (lat: number, lon: number) => {
  const response = await fetch(`http://climateapi.scottpinkelman.com/api/v1/location/${lat}/${lon}`)
  return response.json()
}

const addPlant = async (data: IPlantData) => {
  const response = await fetch ('add-plant', {
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
  gardenStatus,
  createGarden,
  getClimate,
  addPlant
}

export type { IGardenData }
export type { IPlantData }