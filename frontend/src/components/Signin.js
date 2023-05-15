import { useState } from 'react';
import {useDispatch} from 'react-redux';

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
                <h1>Sign in</h1>
                <label>Username</label>
                <input type = "text" name = 'username'/>
                <label>Password</label>
                <input type = "password" name = 'password'/>
                <button>register</button>
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
    console.log(JSON.stringify(data));
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
            username = res.username
            this.dispatch({type:"UPDATE_SIGNIN_INFO",signinStatus:res.status,username:username});
        }
        else{
            this.setSigninMessage(res.message);
        }
    });
    event.target.reset();
    
}
export default Signin;