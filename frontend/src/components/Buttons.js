import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

function ModifyButton(props){
    return (
    <Link 
        className='btn btn-primary' 
        to={{pathname:`/tasks/update`, search:`id=${props.data.task_id}`}} 
        state={{data:props.data}}
    >
        Modify
    </Link>
)}

function DeleteButton(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function onDelete(){
        const task_id = props.task_id;
        const fetchURL=process.env.REACT_APP_SERVER_URL+'tasks/'+task_id;
        const fetchOption = {method:'DELETE',credentials: 'include'}
        const res = await fetch(fetchURL,fetchOption);
        const data = await res.json();
        dispatch({type:"READ",data:data})
        navigate('/tasks')
    }
    return (<button className='btn btn-primary' onClick={onDelete}>Delete</button>)
}

function CreateButton(props){
    return <Link className='btn btn-primary create-button' to={`/tasks/create`}>Create New Task</Link>
}

export {CreateButton,ModifyButton,DeleteButton};