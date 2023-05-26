import "./Signin.css"
import { useState } from 'react';
import {useDispatch} from 'react-redux';
//import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

/*
<form>
  <!-- Email input -->
  <div class="form-outline mb-4">
    <input type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Email address</label>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

  <!-- Submit button -->
  <button type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
  </div>
</form>
*/


function Signin(){
    const dispatch = useDispatch();
    //const [signinStatus,setSigninStatus] = useState(false);
    const [signinMessage,setSigninMessage] = useState("");
    const option = 
    {
        //setSigninStatus: setSigninStatus,
        setSigninMessage:setSigninMessage,
        dispatch:dispatch
    };
    
    return (
        <div>
            <form className= 'registration' onSubmit = {onSigninSubmit.bind(option)}>
                <div className= 'mb-3'>
                    <h1 class = 'form-text'>Sign in</h1>
                    <div className="form-outline mb-4">
                        <input type="text" id="form2Example1" className="form-control" name = 'username' placeholder="Username"/>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" name = 'password' placeholder="Password"/>
                    </div>
                </div>
                <button className="btn btn-primary btn-block mb-4">Sign in</button>
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
        process.env.REACT_APP_SERVER_URL+'auth/signin',
        {method:"post",headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(data),
        mode: 'cors'})
    .then(res=>{return res.json()}
    ).catch(
        (error) => {
            console.error('Error:', error);
            console.log("server is down!!");
        }
    ).then(res=>{
        console.log(res);
        let username = ""
        if (res.status){
            this.setSigninMessage(res.username);
            username = res.username;
            this.dispatch({type:"UPDATE_SIGNIN_INFO",signinStatus:res.status,username:username,user_id:res.user_id});
        }
        else{
            this.setSigninMessage(res.message);
        }
    });
    event.target.reset();
    
}
export default Signin;