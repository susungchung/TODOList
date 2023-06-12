import UserInfoForm from "./UserInfoForm";
import "./Signin.css"

function Register(){
    function onRegisterSubmit(event){
        event.preventDefault();

        // make call to the backend
        const data = {username : event.target.username.value, password : event.target.password.value}
        console.log(JSON.stringify(data));
        fetch(process.env.REACT_APP_SERVER_URL+'users',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors',credentials: 'include'})
        .then(res=>{return res.json()})
        .then(res=>{
            if (res.success){
                alert('Successfully registered new account. Please sign in with new account to proceed')
            }
            else{
                alert(res.message);
            }
        })
        .catch(
            (error) => {
                console.error('Error:', error);
                console.log("server is down!!");
            })
        
        event.target.reset();
    }

    return <UserInfoForm onSubmit = {onRegisterSubmit} title='Create Account' buttonName='Register'/>
}

export default Register;