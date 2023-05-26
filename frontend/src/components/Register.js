//import { useState } from 'react';
import "./Signin.css"

function Register(){
    return (
        <form className= 'registration' onSubmit = {onRegisterSubmit}>
            <div className = 'mb-3'>
                <h1 class = 'form-text'>Create Account</h1>
                <div className="form-outline mb-4">
                    <input type="text" id="form2Example1" className="form-control" name = 'username' placeholder="Username"/>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name = 'password' placeholder="Password"/>
                    
                </div>
            </div>
            <button className="btn btn-primary btn-block mb-4">register</button>
        </form>
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
        })
    event.target.reset();
}




export default Register;