import "./Nav.css"
import { useSelector } from "react-redux";
import { Link, useMatch, useResolvedPath } from "react-router-dom"

function Nav(){
    const current_state = useSelector(state=>state);
    var signinStatus = false;
    if (current_state && current_state.signinStatus) signinStatus = true;
    return (
        <nav className="nav">
          <Link to="/">List</Link>
          <ul>
            <CustomLink to="/signin">{signinStatus ? "Sign out" : "Sign in"}</CustomLink>
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