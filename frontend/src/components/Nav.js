import "./Nav.css"
import getSigninStatus from "../lib/getSigninStatus";
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

  async function handleMain(){
    const data = await getSigninStatus();
    // if signed in redirect to tasks
    if(data.success) {
      dispatch({type:'UPDATE_SIGNIN_INFO',data:data});
      navigate('/tasks');
      return
    }
    // else redirect to signin page
    dispatch({type:'SIGNOUT'})
    navigate('/signin');
  }

  return (
      <nav className="nav">
        
        <div className='nav-main' onClick = {handleMain}>To Main</div>
        <ul>
          {signinStatus?<div className='nav-username'>Current User: {username}</div>:null}
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