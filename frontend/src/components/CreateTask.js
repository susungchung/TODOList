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
        console.log('empty')
        return;
    }
    console.log('data: '+event.target.new_task.value);
    // make call to the backend
    //fetch('http://localhost:5000/list',{method:"post",body:})
    this.dispatch({type : 'CREATE', new_task : event.target.new_task.value})
    event.target.reset();
}

