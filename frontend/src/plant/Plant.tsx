import "./Plant.css"

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

export default function Plant(props: IPlantProps) {
  const { plant } = props
  return (
    <div className="plant-card">
      {plant ? (
        <div>
          <img className="plant-image"src={plant.image}></img>
          <h2>{plant.name}</h2>
          <p className="italic" >{plant.genus} {plant.species}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export type { IPlant }