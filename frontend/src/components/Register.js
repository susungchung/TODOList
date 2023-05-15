//import { useState } from 'react';

function Register(){
    return (
        <form className= 'registration' onSubmit = {onRegisterSubmit}>
            <h1>Create Account</h1>
            <label>Username</label>
            <input type = "text" name = 'username'/>
            <label>Password</label>
            <input type = "password" name = 'password'/>
            <button>register</button>
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