import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TaskFormTemplate from '../templates/TaskFormTemplate';
import '../styles/Forms.css'



function CreatePage(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitCreate = async (e)=>{
        e.preventDefault();
        
        // make sure inputs are valid
        const title = e.target.title.value
        if (title === null || title.match(/^ *$/) !== null){
            return alert('title can not be empty');
        }

        //fetch to create task
        const fetchData = {
            title:e.target.title.value,
            desc: e.target.desc.value,
            priority: e.target.priority.value,
            status: e.target.status.value
        } // get data from input and textbox
        console.log(fetchData)
        
        const fetchURL = process.env.REACT_APP_SERVER_URL+'tasks';
        const fetchOption = {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(fetchData),
            mode: 'cors',
            credentials: 'include'
        }
        try {
            const res = await fetch(fetchURL,fetchOption);
            const data = await res.json()
            dispatch({type:"READ",data:data});
            navigate('/tasks');
        } 
        catch(error){
         if (error) throw error;
        }
    }


    return <TaskFormTemplate submitHandler={onSubmitCreate} titlePlaceholder='Title' descPlaceholder = 'Task Description'></TaskFormTemplate>
}

export default CreatePage;