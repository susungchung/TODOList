import {useDispatch} from 'react-redux';

export default function CreateTask(props){
    const dispatch = useDispatch();
    const props_clone = {...props,dispatch:dispatch}
    return  (
        <li className = 'create_task todo_component'>
            <form className = 'task_forms'  onSubmit = {onCreateSubmit.bind(props_clone)}>
                <input type = 'text' name = 'new_task' placeholder = 'new task'/>
                <button><i className = 'fa fa-plus-square-o' ></i></button>
            </form>
        </li>
    )
}

function onCreateSubmit(event){
    var username = ""
    if (this.props_clone.state) username = this.props_clone.state.username;
    event.preventDefault();
    if (event.target.new_task.value === '') {
        console.log('empty');
        return;
    }
    // make call to the backend
    const data = {new_task:event.target.new_task.value,username:username}
    console.log(JSON.stringify(data));
    fetch(process.env.REACT_APP_SERVER_URL+'list/create',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors'})
    .then(res=>{return res.json()}).then(data=>{this.dispatch({type:"READ",data:data})})
    event.target.reset();
}

