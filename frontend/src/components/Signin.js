import "./Signin.css"
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

function Signin(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const [signinStatus,setSigninStatus] = useState(false);
    const [signinMessage,setSigninMessage] = useState("");
    const option = 
    {
        //setSigninStatus: setSigninStatus,
        setSigninMessage:setSigninMessage,
        dispatch:dispatch,
        navigate:navigate
    };
    
    return (
        <div className= 'form-outline'>
            <form className= 'registration' onSubmit = {onSigninSubmit.bind(option)}>
                <div className= 'mb-3'>
                    <h1 className = 'form-text'>Sign in</h1>
                    <div className="form-input mb-4">
                        <input type="text" className="form-control" name = 'username' placeholder="Username"/>
                    </div>

                    <div className="form-input mb-4">
                        <input type="password" className="form-control" name = 'password' placeholder="Password"/>
                    </div>
                </div>
                <button className="btn btn-block btn-primary submit-btn mb-4">Sign in</button>
            </form>
            <h1>{signinMessage}</h1>
        </div>
    )
}

function onSigninSubmit(event){
    event.preventDefault();
    if (event.target.username.value === '' || event.target.password.value === '') {
        console.log('empty');
        return;
    }
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
            this.setSigninMessage(res.username);
            this.dispatch({type:"UPDATE_SIGNIN_INFO",data:res});
            this.navigate("/tasks");
        }
        else{
            this.setSigninMessage(res.message);
        }
    });
    event.target.reset();
}
export default Signin;