import {useDispatch, useSelector} from 'react-redux';

function UpdateButton(props){
    const dispatch = useDispatch();
    const update_id = useSelector((state)=>state.update_id);
    const new_props = {...props,dispatch:dispatch,update_id:update_id}
    return (
        <form className = 'update_task task_forms' onClick = {onClickUpdate.bind(new_props)}>
            <span className = 'fa fa-edit'></span>
        </form>
    )
}

function onClickUpdate(event){
    event.preventDefault();
    if (this.update_id === this.data.id){
        this.dispatch({type:"CANCEL_UPDATE"})
    }
    else{
        this.dispatch({type:"START_UPDATE",id:this.data.id,desc:this.data.task_desc})
    }
}


function CompleteButton(props){
    let icon = props.data.completed 
                    ? <i className = 'fa fa-check-square-o'></i>
                    : <i className = 'fa fa-square-o'></i>
    const dispatch = useDispatch();
    const props_clone = {...props,dispatch:dispatch}
    return (
        <form className = 'task_forms completed_button' onSubmit = {onCompleteSubmit.bind(props_clone)}>
            <input type = 'hidden' name = 'task_id' value = {props.data.id}/>
            <input type = 'hidden' name = 'completed' value = {props.data.completed}/>
            <button>
                {icon}
            </button>
        </form>
    )
}

function onCompleteSubmit(event){
    event.preventDefault();
    const data = {task_id:event.target.task_id.value, completed:event.target.completed.value}
    console.log("data:",data);
    fetch(
        process.env.REACT_APP_SERVER_URL+'list/set_complete',
        {method:"post",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(data),
        mode: 'cors'})
    .then(res=>{
            return res.json()
        })
    .then(data=>{
            this.dispatch({type:"READ",data:data})
        });
}

function DeleteButton(props) {
    const dispatch = useDispatch();
    const props_clone = {...props,dispatch:dispatch}
    return (
        <form className = 'task_forms' onSubmit = {onDeleteSubmit.bind(props_clone)}>
            <input type = 'hidden' name = 'task_id' value = {props.id}/>
            <button>
                <i className = 'fa fa-remove'></i>
            </button>
        </form>
    )
}


function onDeleteSubmit(event){
    event.preventDefault();
    // if (event.target.new_task.value === '') {
    //     console.log('empty');
    //     return;
    // }
    // make call to the backend
    const data = {task_id : event.target.task_id.value}
    console.log("data:",data);
    fetch(process.env.REACT_APP_SERVER_URL+'list/delete',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors'})
    .then(res=>{return res.json()}).then(data=>{this.dispatch({type:"READ",data:data})});
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