import './ConditionForm.css'
import { useState, SyntheticEvent } from 'react'
import { addCondition } from '../util/fetchRequests';



interface IConditionProps {
  plantId: number,
  setAddingCondition: Function,
  fetchConditions: Function,
}

export default function ConditionForm(props: IConditionProps) {
  const { plantId, setAddingCondition, fetchConditions} = props;
  const [waterCheck, setWaterCheck] = useState(false)
  const [bloomCheck, setBloomCheck] = useState(false)
  const [fruitCheck, setFruitCheck] = useState(false)
  const [condition, setCondition] = useState(0)
  const [error, setError] = useState('')

  // const handleChange = (e) => {
  //   setCheck(e.target.checked)
  // }
  
  async function submitHandler(event: SyntheticEvent):Promise<void> {
    event.preventDefault()
    const data = {
      temperature: parseInt((document.querySelector('#temperature') as HTMLInputElement).value),
      weather: (document.querySelector('#weather') as HTMLInputElement).value,
      fertilizer: (document.querySelector('#fertilizer') as HTMLInputElement).value,
      water: waterCheck,
      bloom: bloomCheck,
      fruit: fruitCheck,
      condition: condition,
      description: (document.querySelector('#description') as HTMLInputElement).value,
      plantId: plantId,
    }
    const response = await addCondition(data)

    if (response.error) {
      setError(response.error)
    } else {
      setAddingCondition(false)
      fetchConditions()
    }
  }

  return (
    <div>
      <form className='add-condition-form' action='#' method='POST' onSubmit={(event) => submitHandler(event)} >
        <h1>Add Condition Report</h1>
        {error ? (<span className="error">{error}</span>) : ("")}
        <div className='form-field'>
          <label htmlFor='temperature'>Temperature:</label>
          <input id='temperature' name='temperature' type='text' placeholder='28'/>
        </div>
        <div className='form-field'>
          <label htmlFor='weather'>Weather:</label>
          <input id='weather' name='weather' type='text' placeholder='Sunny'/>
        </div>
        <div className='form-field'>
          <label htmlFor='fertilizer'>Fertilizer:</label>
          <input id='fertilizer' name='fertilizer' type='text' placeholder='Nitrogen 3% and Potassium 2%'/>
        </div>
        <div className='form-field'>
          <label htmlFor='water'>Water:</label>
          <input id='water' name='water' type='checkbox' onChange={(e)=> {setWaterCheck(e.target.checked)} } />
        </div>
        <div className='form-field'>
          <label htmlFor='bloom'>Bloom:</label>
          <input id='bloom' name='bloom' type='checkbox' onChange={(e)=> {setBloomCheck(e.target.checked)} } />
        </div>
        <div className='form-field'>
          <label htmlFor='fruit'>Fruit:</label>
          <input id='fruit' name='fruit' type='checkbox' onChange={(e)=> {setFruitCheck(e.target.checked)} } />
        </div>
        <div className='form-field'>
          <label htmlFor='condition'>Condition:</label>
          <div>
            <i onClick={() => {setCondition(1)}} className={condition > 0 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
            <i onClick={() => {setCondition(2)}} className={condition > 1 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
            <i onClick={() => {setCondition(3)}} className={condition > 2 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
            <i onClick={() => {setCondition(4)}} className={condition > 3 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
            <i onClick={() => {setCondition(5)}} className={condition > 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
          </div>
        </div>
        <div className='form-field'>
          <label htmlFor='description'>Description:</label>
          <input id='description' name='description' type='text' placeholder='Add decription...'/>
        </div>
        <div className="centered">
          <input type="submit" className="button-4" value="Add Condition Report" />
        </div>
      </form>
    </div>
  )
}