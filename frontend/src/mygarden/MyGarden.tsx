import './MyGarden.css';
import { SyntheticEvent, useState, useEffect } from "react"
import { gardenStatus, createGarden, getClimate, IGardenData } from '../util/fetchRequests';
import Plant from '../plant/Plant'
import NewPlant from '../newPlant/NewPlant'

interface IGardenResponse extends IGardenData {
  id: number
}

interface IMyGardenProps {
  selectPlant: Function,
}

export default function MyGarden(props: IMyGardenProps) {
    const { selectPlant } = props
    const [needsGarden, setNeedsGarden] = useState(false)
    const [error, setError] = useState('')
    const [garden, setGarden] = useState<IGardenResponse | null>(null)
    const [climate, setClimate] = useState('')
    const [plants, setPlants] = useState([])
    const [addingPlant, setAddingPlant] = useState(false)

    const fetchGardenStatus = async () => {
      const result = await gardenStatus()
      if (result.garden === null)  {
        //no garden
        setNeedsGarden(true)
      } else {
        setGarden(result)
        setPlants(result.plants)
      }
    }
  
    useEffect(() => {
      fetchGardenStatus()
    }, [])

    useEffect(() => {
      fetchClimate()
    }, [garden])

    async function fetchClimate() {
      if (garden) {
        const result = await getClimate(garden.latitude, garden.longitude)
        setClimate(result.return_values[0].zone_description)
      }
      
    }

    async function submitHandler(event: SyntheticEvent):Promise<void> {
      event.preventDefault();
      const data = {
        name: (document.querySelector('#garden-name') as HTMLInputElement).value,
        latitude: parseFloat((document.querySelector('#latitude') as HTMLInputElement).value),
        longitude: parseFloat((document.querySelector('#longitude') as HTMLInputElement).value)
      }
      const garden = await createGarden(data)
      if (garden.success) {
        setNeedsGarden(false)
        fetchGardenStatus()
      }
      if (garden.error) {
        setError(garden.error)
      }
    }

    function getCoordinates(event: SyntheticEvent) {
      event.preventDefault();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          (document.querySelector('#latitude') as HTMLInputElement).value = latitude.toString();
          (document.querySelector('#longitude') as HTMLInputElement).value = longitude.toString();
        });
      } else {
        setError("Unable to read coordinates");
      }
    }

  return (
    <div className="my-garden"> 
      {needsGarden ? (
        <div className="new-garden-form">
          <form className='login-form' action='#' method='POST' onSubmit={(event) => submitHandler(event)} >
            <h1>Create New Garden</h1>
            {error ? (<span className="error">{error}</span>) : ("")}
            <div className='form-field'>
              <label htmlFor='garden-name'>Name:</label>
              <input id='garden-name' name='garden-name' type='text' placeholder='My garden name' required />
            </div>
            <div className='form-field'>
              <label htmlFor='latitude'>Latitude:</label>
              <input id='latitude' name='latitude' type='text' placeholder='35.70' required />
            </div>
            <div className='form-field'>
              <label htmlFor='longitude'>Longitude:</label>
              <input id='longitude' name='longitude' type='text' placeholder='139.70' required />
            </div>
            <button className="button-4" onClick={(event) => { getCoordinates(event) }}>Get Coordinates</button>
            <input className="button-4" type="submit" value="Create Garden" />
          </form>

        </div>
      ) : garden ? (
        <>
          <div className="garden-card">
            <h2 className="heading">{garden.name}</h2>
            <p className="italic">{climate}</p>
          </div>
          <div className="plant-grid">
            
          {plants.map((plant, i) => {
            return (
              <div onClick={() => {selectPlant(plant)}}>
                <Plant  plant={plant} key={`plant${i}`} />
              </div>
            )
          })}
           {addingPlant ? (
          <NewPlant gardenId={garden.id} setAddingPlant={setAddingPlant} fetchGardenStatus={fetchGardenStatus} />
        ) : (
          <div className='add-plant-card' onClick={() => {setAddingPlant(true)}}><i className="fa-solid fa-plus"></i></div>
        )}
        </div>
       
      </>
      ) : ('')}    
    </div> 
  )
}


