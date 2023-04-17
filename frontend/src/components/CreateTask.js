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
    event.preventDefault();
    if (event.target.new_task.value === '') {
        console.log('empty');
        return;
    }
    // make call to the backend
    const data = {new_task : event.target.new_task.value}
    console.log(JSON.stringify(data));
    fetch(REACT_APP_SERVER_URL+'list/create',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors'})
    .then(res=>{return res.json()}).then(data=>{console.log(data)})
    //this.dispatch({type : 'CREATE', new_task : event.target.new_task.value})
    event.target.reset();
    window.location.reload(false); // should use state instead to refresh the page
}

