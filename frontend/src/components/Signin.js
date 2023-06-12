import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

import UserFormTemplate from "../templates/UserFormTemplate";
import "../styles/Signin.css"

function Signin(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSigninSubmit(event){
        event.preventDefault();
        // make call to the backend
        const data = {username : event.target.username.value, password : event.target.password.value}
        fetch(
            process.env.REACT_APP_SERVER_URL+'sessions',
            {method:"post",headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        })
        .then(res=>{return res.json()}
        ).catch(
            (error) => {
                console.error('Error:', error);
                console.log("server is down!!");
            }
        ).then(res=>{
            console.log(res);
            if (res.success){
                dispatch({type:"UPDATE_SIGNIN_INFO",data:res});
                navigate("/tasks");
            }
            else{
                alert(res.message);
            }
        });
        event.target.reset();
    }

    return <UserFormTemplate onSubmit = {onSigninSubmit} title='Sign in' buttonName='Sign in'/>
}

export default Signin;