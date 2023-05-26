//import { useState } from 'react';
import "./Signin.css"
import {useNavigate} from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    return (
        <div className= 'form-outline'>
            <form className= 'registration' onSubmit = {onRegisterSubmit.bind({navigate:navigate})}>
                <div className = 'mb-3'>
                    <h1 className = 'form-text'>Create Account</h1>
                    <div className="form-input mb-4">
                        <input type="text" id="form2Example1" className="form-control" name = 'username' placeholder="Username"/>
                    </div>
                    <div className="form-input mb-4">
                        <input type="password" id="form2Example2" className="form-control" name = 'password' placeholder="Password"/>
                        
                    </div>
                </div>
                <button className="btn btn-primary btn-block submit-btn mb-4">register</button>
            </form>
        </div>
    )
}

function onRegisterSubmit(event){
    event.preventDefault();
    if (event.target.username.value === '' || event.target.password.value === '') {
        console.log('empty');
        return;
    }
    // make call to the backend
    const data = {username : event.target.username.value, password : event.target.password.value}
    console.log(JSON.stringify(data));
    fetch(process.env.REACT_APP_SERVER_URL+'auth/register',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors'})
    .then(res=>{return res.json()}).catch(
        (error) => {
            console.error('Error:', error);
            console.log("server is down!!");
        }).then(this.navigate('/tasks'))
    
    event.target.reset();
}




export default Register;