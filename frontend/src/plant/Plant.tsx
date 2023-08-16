import "./plant.css"

interface IPlant {
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
          <p>{plant.genus} {plant.species}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}