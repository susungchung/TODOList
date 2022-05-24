import {useDispatch} from 'react-redux';

function UpdateButton(props){
    const dispatch = useDispatch();
    const new_props = {...props,dispatch:dispatch}
    return (
        <a href = {'/list/update/' + props.data.id} className = 'update_task task_forms' onClick = {onClickUpdate.bind(new_props)}>
            <span className = 'fa fa-edit'></span>
        </a>
    )
}

function onClickUpdate(event){
    event.preventDefault();
    this.dispatch({type:"UPDATE",id:this.data.id})
}


function CompleteButton(props){
    let icon = props.data.completed 
                    ? <i className = 'fa fa-check-square-o'></i>
                    : <i className = 'fa fa-square-o'></i>
    return (
        <form action ='/list/set_complete' method = 'post' className = 'task_forms completed_button'>
            <input type = 'hidden' name = 'task_id' value = {props.data.id}/>
            <input type = 'hidden' name = 'completed' value = {props.completed}/>
            <button>
                {icon}
            </button>
        </form>
    )
}
function DeleteButton(props) {
    return (
        <form action = '/list/delete' method = 'post' className = 'task_forms'>
            <input type = 'hidden' name = 'task_id' value = {props.id}/>
            <button>
                <i className = 'fa fa-remove'></i>
            </button>
        </form>
    )
}

function Buttons(props){
    return (
        <span className = 'task_buttons'>
            <UpdateButton data = {props.data}></UpdateButton>
            <CompleteButton data = {props.data}></CompleteButton>
            <DeleteButton id = {props.data.id}></DeleteButton>
        </span>
    )
}

export default Buttons;