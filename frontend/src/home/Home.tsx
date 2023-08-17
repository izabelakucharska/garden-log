import './Home.css';
import gardenerUrl from '../assets/gardener2.jpg';
import gardenerUrl2 from '../assets/happy-gardener.jpg'

export default function Home() {
  return (
    <div  className="home-page">
      <h3>Welcome to Garden Log!</h3>
      <p>You can create your own garden here</p>
      <p>You can track the condition of your plants and watch how others manage their garden</p>
      <div className='user-story'>
        <div className="speech-bubble">
          <span>"Thanks to Garden Log my plants are looking better than ever!"</span>
          <span className='italic'>-Elena</span>
        </div>
        <div className='rounded'> 
          <img className="rounded-img" src={gardenerUrl} />
        </div>
      </div>
      <div className='user-story'>
        <div className='rounded'> 
          <img className="rounded-img2" src={gardenerUrl2} />
        </div>
        <div className="speech-bubble">
          <span>"Before I discovered Garden Log, all of my plants rotted away from overwatering. Thanks to Garden Log, those dark days are far behind me!"</span>
          <span className='italic'>-Gregory</span>
        </div>     
      </div>
    </div>
  )
}
