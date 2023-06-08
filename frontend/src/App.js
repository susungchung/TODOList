import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import {Routes, Route} from "react-router-dom"
import {useLocation} from 'react-router-dom'

import './App.css';

import Nav from './components/Nav';
import Register from './components/Register';
import Signin from './components/Signin';
import WholeList from './components/WholeList';
import TaskPage from './components/TaskPage';


const initialState = 
{
  title: 
  'task lists',
  tasks:[],
  tasks_todo:[],
  tasks_in_progress:[],
  tasks_done:[],
  update_id: null,
  next_id:0,
  temp_desc:'',
  username: '',
  user_id:0,
  signinStatus: false
}

function reducer(currentState = initialState,action){
  if (action.type === 'CREATE'){
    const newState = {...currentState,tasks:[...currentState.tasks]}
    // by default, newly created list goes to tasks_todo
    newState.tasks_todo.push({
      id:currentState.next_id,
      task_title: action.new_task,
      completed:0,
      user_id:newState.user_id
    });    
    newState.next_id++;
    return newState;
  }
  if (action.type === 'READ'){
    const newState = {...currentState,tasks:action.data.tasks,update_id:action.data.update_id};
    // sort tasks based on their state
    newState.tasks_todo = newState.tasks.filter(cur_task => cur_task.status === 'todo');
    newState.tasks_in_progress = newState.tasks.filter(cur_task => cur_task.status === 'in_progress');
    newState.tasks_done = newState.tasks.filter(cur_task => cur_task.status === 'done');
    return newState;
  }
  if (action.type === 'START_UPDATE'){
    const newState = {...currentState,update_id:action.id,temp_desc:action.desc};
    console.log(newState.temp_desc);
    return newState;
  }
  if (action.type === 'CANCEL_UPDATE'){
    const newState = {...currentState,update_id:null};
    return newState;
  }
  if (action.type === 'UPDATE_SIGNIN_INFO'){
    const newState = {...currentState,signinStatus: action.signinStatus,username: action.username,user_id:action.user_id};
    return newState;
  }
}

const store = configureStore({reducer:reducer});

function Page(){
  const location = useLocation();
  const search = location.search;
  if(search) {
    const searchParam = new URLSearchParams(search);
    if (searchParam.has('id')){
      return <TaskPage id={searchParam.get('id')}/>;
    }
    return <div>ERROR WRONG URL</div>;
  }
  return <WholeList/>
}


function App() {
  return (
    <div className="App">
      <Provider store = {store}>
      <Nav></Nav>
        <Routes>
          <Route path="/tasks" element={<div><Page /></div>} />
          <Route path="/signin" element={ <div><Register /><Signin/></div>} />
          {/* <Route path="/tasks?id=" element={<div><TaskPage/></div>}/> */}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

