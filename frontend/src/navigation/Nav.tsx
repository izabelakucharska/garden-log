import './Nav.css';

interface INavProps {
  page: string,
  setPage: Function,
  user: IUser,
  exit: Function,
  loggedIn: Boolean
}

interface IUser {
  name: string,
  email: string,
  id: number
}

export default function Nav(props: INavProps) {
  const { page, setPage, user, exit, loggedIn } = props;

  console.log(page, user)

  return (
    <div className="navigation"> 
      <span className="home-button"><a onClick={() => setPage('home')}><i className="fa-brands fa-pagelines green"></i>Garden Log</a></span>
      <div className="right-buttons">
        <span className="nav-item">
          <input className="search" type="text" placeholder='search for plants' />
         
          <button className="button-4 search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
        </span>
        {loggedIn ? (
          <>
            <span className="my-garden nav-item"><a onClick={() => {setPage('mygarden')}} >My Garden</a></span>
            <span className="logout nav-item"><a onClick={() => {exit()}} >Log out</a></span>
          </>
        ) : (
          <span className="login"><a onClick={() => {setPage('login')}} >Log in</a></span>
        )}
      </div>
      
    </div> 
  )
}