import {useState} from 'react';
import logo from './raylogo.png';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootsrap.min.css';

import './App.css';

function App() {

  //TASKS STATE
  const [toDo, setToDo] = useState([ ]);

  //TEMP STATE
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //ADD TASK
  //////////////////////////////////////////////
  const addTask = () =>{
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = {id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  //DELETE TASK
  //////////////////////////////////////////////
  const deleteTask = (id) =>{
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
  }

  //MARK TASK AS COMPLETED/DONE
  //////////////////////////////////////////////
  const markDone = (id) =>{
    let newTask = toDo.map( task => {
      if( task.id === id) {
        return({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask);
  }

  //CANCEL UPDATE
  //////////////////////////////////////////////
  const cancelUpdate = () =>{
    setUpdateData('');
  }

  //CHANGE TASK FOR UPDATE
  //////////////////////////////////////////////
  const changeTask = (e) =>{
    let newEntry ={
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry)
  }

  //UPDATE TASK
  //////////////////////////////////////////////
  const updateTask = () =>{
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <img src={logo} className="App-logo" alt="logo"/>

      <br /><br />
      <h2> HONRAY To Do List </h2>
      <br /><br />

      {/*Update Task*/}
      {updateData && updateData ? (
        <UpdateForm
        updateData={updateData} 
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm 
          newTask={newTask}
          setNewTask={setNewTask} 
          addTask={addTask}
        />
      )}

      {/* DISPLAY TO-DOS */}

      {toDo && toDo.length ? '' : 'No Tasks...'}

      <ToDo
        toDo={toDo} 
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />

    </div>
  );
}

export default App;
