import "./Nav.css"
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate , useMatch, useResolvedPath } from "react-router-dom"

function Nav(){
  const current_state = useSelector(state=>state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var signinStatus = false;
  var username = '';
  if (current_state && current_state.signinStatus) {
    signinStatus = true;
    username = current_state.username;
  }

    
  async function handleAuth(){
    if (!signinStatus){
      return navigate("/signin");
    }
    console.log('signout clicked')
    const fetchURL= process.env.REACT_APP_SERVER_URL+'auth/signout';
    const fetchOption = {
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      mode: 'cors',
      credentials: 'include'
    }
    try{
      const res = await fetch(fetchURL, fetchOption)
      const data = await res.json();
      if (data.success){
        dispatch({type:'SIGNOUT'})
      }
      navigate("/signin");
    }
    catch(error){
      console.log(error)
      if (error) throw error;
    }
  }

  return (
      <nav className="nav">
        <Link to="/">List</Link>
        <ul>
          {signinStatus?<div className='nav-username'>{username}</div>:null}
          <li className='nav-auth' onClick = {handleAuth}>
            {signinStatus ? "Sign out" : "Sign in"}
          </li>
          <CustomLink to="/tasks">Tasks</CustomLink>
        </ul>
      </nav>
    ) 
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Nav;