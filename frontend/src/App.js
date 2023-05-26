import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import './App.css';

import Nav from './components/Nav';
import Register from './components/Register';
import Signin from './components/Signin';
import WholeList from './components/WholeList';

const initialState = 
{
  title: 
  'task lists',
  tasks:[],
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
    newState.tasks.push({
      id:currentState.next_id,
      task_desc: action.new_task,
      completed:0,
      user_id:newState.user_id
    });
    newState.next_id++;
    return newState;
  }
  if (action.type === 'READ'){
    const newState = {...currentState,tasks:action.data.tasks,update_id:action.data.update_id};
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

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Provider store = {store}>
        <Nav></Nav>
        <WholeList></WholeList>
        <Register></Register>
        <Signin></Signin>
      </Provider>
    </div>
  );
}

export default App;

