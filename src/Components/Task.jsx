import React, { useState } from 'react'
import "../App.css";
import { v4 as uuidv4 } from 'uuid';
import { Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';


function Task() {
    const [task, setTask] = useState({
      id: uuidv4(),
      name: "",
      done: false

    });
    const [todos, setTodos] = useState([]);
    const [selectedTask , setSelectedTask] = useState();

    const addTask =()=> {
        if(task.trim()!== ' '){
            let tasks = ([...todos], task);
            setTodos(tasks);
            setTask('')
            localStorage.setItem("tasks", tasks)

        }
    }

    // const deleteTask = (task) => {
    //     const newTasks = todos.filter((_,t) => t !== task);
    //     setTodos(newTasks);
    //     localStorage.setItem(newTasks);
    // }

    // const editTask = (task)=>{
    //     const taskToEdit = todos.find(t => t == task)
        
    // }

    const handleInputChange = (e)=> {
      setTask({
        id: uuidv4(),
        name: e.target.value,
        done: false
      });

    }

    
    return (
        <div>
          <h1>Todo List</h1>
          <TextField
            label="Task"
            variant="outlined"
            value={task.name}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={addTask}>
            Add Task
          </Button>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} >
                <ListItemText primary={todo.name}  />
                
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      );
}

export default Task