import { Link, useMatch, useResolvedPath } from "react-router-dom"

function Nav(){
    return (
        <nav className="nav">
          <Link to="/">List</Link>
          <ul>
            <CustomLink to="/signin">Signin</CustomLink>
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