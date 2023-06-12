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
        const fetchURL=process.env.REACT_APP_SERVER_URL+'list/task/'+task_id;
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


// function OldUpdateButton(props){
//     const dispatch = useDispatch();

//     function onClickUpdate(event){
//         event.preventDefault();
//         if (this.update_id === this.data.id){
//             dispatch({type:"CANCEL_UPDATE"})
//         }
//         else{
//             dispatch({type:"START_UPDATE",id:this.data.id,desc:this.data.task_title})
//         }
//     }

//     return (
//         <form className = 'update_task task_forms' onClick = {onClickUpdate}>
//             <span className = 'fa fa-edit'></span>
//         </form>
//     )
// }


// function CompleteButton(props){
//     let icon = props.data.completed 
//                     ? <i className = 'fa fa-check-square-o'></i>
//                     : <i className = 'fa fa-square-o'></i>
//     const dispatch = useDispatch();
//     const props_clone = {...props,dispatch:dispatch}
//     return (
//         <form className = 'task_forms completed_button' onSubmit = {onCompleteSubmit.bind(props_clone)}>
//             <input type = 'hidden' name = 'task_id' value = {props.data.id}/>
//             <input type = 'hidden' name = 'completed' value = {props.data.completed}/>
//             <button>
//                 {icon}
//             </button>
//         </form>
//     )
// }

// async function onCompleteSubmit(event){
//     event.preventDefault();
//     const data = {task_id:event.target.task_id.value, completed:event.target.completed.value}
//     console.log("data:",data);
//     const res = await fetch( process.env.REACT_APP_SERVER_URL+'list/set_done',{
//         method:"POST",
//         headers:{'Content-Type': 'application/json'},
//         body:JSON.stringify(data),
//         mode: 'cors',
//         credentials: 'include'
//     })
    
//     const res_json = res.json();
//     this.dispatch({type:"READ",data:res_json})
// }

// function OldDeleteButton(props) {
//     const dispatch = useDispatch();
//     const props_clone = {...props,dispatch:dispatch}
//     return (
//         <form className = 'task_forms' onSubmit = {onDeleteSubmit.bind(props_clone)}>
//             <input type = 'hidden' name = 'task_id' value = {props.id}/>
//             <button>
//                 <i className = 'fa fa-remove'></i>
//             </button>
//         </form>
//     )
// }


// function onDeleteSubmit(event){
//     event.preventDefault();
//     // if (event.target.new_task.value === '') {
//     //     console.log('empty');
//     //     return;
//     // }
//     // make call to the backend
//     const data = {task_id : event.target.task_id.value}
//     console.log("data:",data);
//     fetch(process.env.REACT_APP_SERVER_URL+'list/delete',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors',credentials: 'include'})
//     .then(res=>{return res.json()}).then(data=>{this.dispatch({type:"READ",data:data})});
// }

// function Buttons(props){
//     return (
//         <span className = 'task_buttons'>
//             <OldUpdateButton data = {props.data}></OldUpdateButton>
//             <CompleteButton data = {props.data}></CompleteButton>
//             <OldDeleteButton id = {props.data.id}></OldDeleteButton>
//         </span>
//     )
// }

export {CreateButton,ModifyButton,DeleteButton};