import "./WholeList.css"
import {useDispatch} from 'react-redux';

export default function CreateTask(props){
    const dispatch = useDispatch();
    const props_clone = {...props,dispatch:dispatch}
    return  (
        <li className = 'create_task todo_component list-group-item'>
            <form className = 'task_forms'  onSubmit = {onCreateSubmit.bind(props_clone)}>
                <input className= "task_input" type = 'text' name = 'new_task' placeholder = 'new task'/>
                <button><i className = 'fa fa-plus-square-o' ></i></button>
            </form>
        </li>
    )
}

function onCreateSubmit(event){
    var username = ""
    if (this.state) username = this.state.username;
    event.preventDefault();
    if (event.target.new_task.value === '') {
        console.log('empty');
        return;
    }
    // make call to the backend
    const data = {new_task:event.target.new_task.value,username:username}
    //console.log('onCreateSubmit',JSON.stringify(data));
    fetch(process.env.REACT_APP_SERVER_URL+'tasks/create',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors',credentials: 'include'})
    .then(res=>{return res.json()}).then(data=>{this.dispatch({type:"READ",data:data})})
    event.target.reset();
}

