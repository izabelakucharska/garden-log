import "./PlantDetail.css"
import { useState, useEffect } from 'react'
import ConditionForm from '../conditionForm/ConditionForm'
import { getConditionsForPlant } from '../util/fetchRequests'

interface IPlant {
  id: number,
  name: string, 
  gardenId: number,
  genus?: string,  
  species?: string,
  image?: string
}

interface IPlantProps {
  plant: IPlant
}

interface IPlantCondition {
  createdAt: string,
  temperature?: number, 
  weather?:     string,
  fertilizer?:  string,
  water?:       boolean,
  bloom?:       boolean,
  fruit?:       boolean,
  condition?:   number,
  description?: string,
  plantId:     number
}

export default function PlantDetail(props: IPlantProps) {
  const { plant } = props
  const [addingCondition, setAddingCondition] = useState(false)
  const [conditions, setConditions] = useState<IPlantCondition[]>([])

  useEffect(() => {
    fetchConditions()
  }, [])

  async function fetchConditions() {
    const result = await getConditionsForPlant(plant.id)
    if (result) {
      setConditions(result)
      console.log(conditions)
    }
  }

  return (
    <div className="plant-detail-card">
      <div className="plant-info">
        <img className="plant-image"src={plant.image}></img>
        <h2>{plant.name}</h2>
        <p className="italic">{plant.genus} {plant.species}</p>
      </div>
      {
        conditions.map((condition, i) => {
          return (
            <div key={`plantCondition${i}`} className="plant-condition add-condition-form">
              <div className="plant-condition-value">
                <span>Condition: </span>
                {condition.condition && (
                  <span>
                    <i className={condition.condition > 0 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
                    <i className={condition.condition > 1 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
                    <i className={condition.condition > 2 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
                    <i className={condition.condition > 3 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
                    <i className={condition.condition > 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
                  </span>
                )}    
              </div>
              <div className="plant-condition-value">
                <span>Date: </span>
                <span>{new Date(condition.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="plant-condition-value">
                <span>Temperature: </span>
                <span>{condition.temperature? condition.temperature : " -"}°C</span>
              </div>
              <div className="plant-condition-value">
                <span>Weather: </span>
                <span>{condition.weather? condition.weather : " -"}</span>
              </div>
              <div className="plant-condition-value">
                <span>Fertilizer: </span>
                <span>{condition.fertilizer ? condition.fertilizer : " -"}</span>
              </div>
              <div className="plant-condition-value">
                <span>Bloom: </span>
                <span>{condition.bloom ? "Blooming" : "Not Blooming"}</span>
              </div>
              <div className="plant-condition-value">
                <span>Fruit: </span>
                <span>{condition.bloom ? "Fruit Present" : "No Fruit"}</span>
              </div>
              <div className="plant-condition-value">
                <span>Description: </span>
                <span className="description-text">{condition.description ? condition.description  : " -"}</span>
              </div>
            </div>
          )
        })
      }

      {addingCondition ? (
        <ConditionForm plantId={plant.id} setAddingCondition={setAddingCondition} fetchConditions={fetchConditions}
        />
      ) : (
        <div><button onClick={() => {setAddingCondition(true)}} className="button-4 big-button">Add Condition Report</button></div>
      )}
    </div>
  )
}

export type { IPlant }