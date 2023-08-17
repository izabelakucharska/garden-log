import './NewPlant.css'
import { useState, SyntheticEvent } from 'react'
import { addPlant } from '../util/fetchRequests';

interface INewPlantProps {
  gardenId: number,
  setAddingPlant: Function,
  fetchGardenStatus: Function
}

export default function NewPlant(props: INewPlantProps) {
  const { gardenId, setAddingPlant, fetchGardenStatus } = props;
  const [error, setError] = useState('')

  
  async function submitHandler(event: SyntheticEvent):Promise<void> {
    event.preventDefault()
    const data = {
      name: (document.querySelector('#plant-name') as HTMLInputElement).value,
      gardenId: gardenId,
      genus: (document.querySelector('#genus') as HTMLInputElement).value,
      species: (document.querySelector('#species') as HTMLInputElement).value,
      image: (document.querySelector('#image') as HTMLInputElement).value,
    }
    const plant = await addPlant(data)

    if (plant.error) {
      setError(plant.error)
    } else {
      fetchGardenStatus()
      setAddingPlant(false)
    }
  }

  return (
    <div className="new-plant-form">
      <form className='add-plant-form' action='#' method='POST' onSubmit={(event) => submitHandler(event)} >
        <h1>Create New Plant</h1>
        {error ? (<span className="error">{error}</span>) : ("")}
        <div className='form-field'>
          <label htmlFor='plant-name'>Name:</label>
          <input id='plant-name' name='plant-name' type='text' placeholder='My plant name'/>
        </div>
        <div className='form-field'>
          <label htmlFor='genus'>Genus:</label>
          <input id='genus' name='genus' type='text' placeholder='Passiflora'/>
        </div>
        <div className='form-field'>
          <label htmlFor='species'>Species:</label>
          <input id='species' name='species' type='text' placeholder='edulis'/>
        </div>
        <div className='form-field'>
          <label htmlFor='image'>Image:</label>
          <input id='image' name='image' type='text' placeholder='https://i.imgur.com/V9HS1ac.jpeg'/>
        </div>
        <input className="button-4" type="submit" value="Add Plant" />
      </form>
    </div>
  )
}