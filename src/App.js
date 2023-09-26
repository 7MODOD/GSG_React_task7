import "./App.css";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const App = () => {


  const [task, setTask] = useState({
    id: uuidv4(),
    name: "",
    done: false

  });
  const [updatedText, setUpdatedText] = useState('')
  const [todos, setTodos] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [open, setOpen] = useState(false);

  function handleAddtask(e) {

    e.preventDefault();
    let tasks = [...todos, task]
          setTodos(tasks);
          setTask({...task, name: ''});
          localStorage.setItem("tasks",JSON.stringify(tasks));

  }

  const deleteTask = (id) => {
      const newTasks = todos.filter((t) => t.id !== id);
      setTodos(newTasks);
      localStorage.setItem( "tasks",JSON.stringify(newTasks));
  }


  function handleInputChange(e) {
    setTask({
      id: uuidv4(),
      name: e.target.value,
      done: false
    });

  }

  function handleEditButton(id){
    setSelectedTaskId(id);
    
    
    setOpen(true);

  }

  useEffect(()=>{
    const storedItems = JSON.parse(localStorage.getItem("tasks"))
    setTodos(storedItems);
  },[]);

  function handleTaskProgress (id){
    const updatedTodos = todos.map((item)=> {
      if(item.id == id){
        return {...item , done: !item.done};

      }
      return item;
    } );
    setTodos(updatedTodos)



  }

  function handleClose(){
    setUpdatedText('');
    setSelectedTaskId('');
    setOpen(false);
  }

  function EditTask(){
    const updatedItems = todos.map((item)=>{
      if(item.id === selectedTaskId){
        return {...item, name: updatedText};
      }
      return item;
    })
    setTodos(updatedItems);
    localStorage.setItem("tasks",JSON.stringify(updatedItems));
    handleClose();
    setUpdatedText('');
    setSelectedTaskId('');

  }

  function handleUpdatedTextChange(e){
    setUpdatedText(e.target.value)
  }
  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form onSubmit={(e)=>handleAddtask(e)}> 
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          value={task.name}
          onChange= {(e)=>handleInputChange(e)}
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
      <div>
      {todos.map((todo) =>{
        return(
        <div key={todo.id} className={ todo.done? "done": "todo"}>
          <div className="todo-text">
            <input className="checkbox" type="checkbox" id="isCompleted" checked = {todo.done} onChange={()=>handleTaskProgress(todo.id)} />
          </div>
          <div>{todo.name}</div>

          <div className="todo-actions">
            <button className="submit-edits" onClick={() => handleEditButton(todo.id)}>Edit</button>
            <button className="submit-edits" onClick={()=> deleteTask(todo.id)}>Delete</button>
          </div>
        </div>

  )})}
  </div>

  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task"
            type="text"
            fullWidth
            variant="standard"
            value={updatedText}
            onChange={(e)=>handleUpdatedTextChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={EditTask}>Edit</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
export default App;
