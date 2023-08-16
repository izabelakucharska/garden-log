import './NewPlant.css'
import { useRef, useState, SyntheticEvent } from 'react'
import { addPlant } from '../util/fetchRequests';

interface INewPlantProps {
  gardenId: number,
  setAddingPlant: Function,
  fetchGardenStatus: Function
}

export default function NewPlant(props: INewPlantProps) {
  const { gardenId, setAddingPlant, fetchGardenStatus } = props;
  const fileInputRef = useRef(null)
  const [error, setError] = useState('')
 


  function handleImageSelect(event: SyntheticEvent) {
    event.preventDefault()
    if(fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click()
    }
  }

  function handleFileSelect(event: SyntheticEvent) {
    event.preventDefault() 
    const target = (event.target as HTMLInputElement)
    const file: File = (target.files as FileList)[0];
    // no files over 5 mb
    if (file.size / 1024/ 1024 > 5) {
      setError('file must be less than 5MB');
      if (fileInputRef.current) {
        (fileInputRef.current as HTMLInputElement).value = '';
      }
    }   
  }
  
  async function submitHandler(event: SyntheticEvent):Promise<void> {
    event.preventDefault()
    const data = {
      name: (document.querySelector('#plant-name') as HTMLInputElement).value,
      gardenId: gardenId,
      genus: (document.querySelector('#genus') as HTMLInputElement).value,
      species: (document.querySelector('#species') as HTMLInputElement).value,
      image: "https://en.wikipedia.org/wiki/Passiflora_edulis#/media/File:Passiflora_edulis_forma_flavicarpa.jpg"
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
        <input type="file" onChange={(event) => {handleFileSelect(event)}} hidden></input>
        <button className="button-4" onClick={(event) => {handleImageSelect(event)}}>Select Image</button>
        <input type="submit" value="Add Plant" />
      </form>
    </div>
  )
}