import { useNavigate } from 'react-router-dom';
import '../styles/Signin.css'
import { useDispatch } from 'react-redux';
function Demo(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onClickDemo(){
        try{
            const fetchURL = process.env.REACT_APP_SERVER_URL+'sessions/demo';
            const fetchOption = {
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:null,
                mode: 'cors',
                credentials: 'include'
            }
            const res = await fetch(fetchURL,fetchOption);
            const res_json = await res.json();
            if (!res_json.success){
                return alert(res_json.message);
            }
            dispatch({type:"UPDATE_SIGNIN_INFO",data:res_json});
            navigate('/tasks');
        }
        catch(error){
            if (error){
                alert('An Error Occurred')
                throw (error);
            }
        }
    }
    return (
        <div className= 'form-outline mb-3'>
            <h1 className = 'form-text'>Try Demo</h1>
            <button className="btn btn-block btn-primary submit-btn mb-4" onClick={onClickDemo}>Try Demo</button>
        </div>
    )
}
export default Demo;