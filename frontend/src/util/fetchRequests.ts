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

interface IConditionData {
  temperature?: number, 
  weather?:     string,
  fertilizer?:  string,
  water?:       boolean,
  bloom?:       boolean,
  fruit?:       boolean,
  condition?:   number,
  description?: string,
  plantId:      number
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
  const response = await fetch(`https://ummiume.mapresso.com/backend/server/climate/koeppen/?lat=${lat}&lon=${lon}`)
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

const addCondition = async (data: IConditionData) => {
  const response = await fetch ('condition', {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return response.json()
}

const getConditionsForPlant = async (plantId: number) => {
  const response = await fetch (`conditions?plantId=${plantId}`)
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
  addPlant,
  addCondition,
  getConditionsForPlant
}

export type { IGardenData }
export type { IPlantData }