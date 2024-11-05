import React, {useState,useEffect} from "react";
import "./contenedor.css"
//Componente que muestra la lista de tareas

function Tasklist ({tasks,removeTask}) {
    return(

        <ul>
            {tasks.map((task,index)=>(
                <li key={index}>{task} 
                <button onClick={()=>removeTask(index)}>Quitar</button>
                    </li>
            ))}
        </ul>
    );
}
//Armado del componente principal
function TodoApp () {
    const [tasks,setTasks]= useState(()=>{
    const savedTasks=localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [task,setTask]=useState("");
    const addTask=()=>{
        setTasks([...tasks,task]);
        setTask('');
    };

    const removeTask= (index)=>{
        setTasks(tasks.filter((_,i)=>i !==index));
    };

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks]);

    return(
        <div className="contenedor">
            <h2>Todo List</h2>
            <input placeholder="Escribe la tarea que quieras agregar. (ejm: Comprar pan)" type="text" value={task} onChange={(e)=>setTask(e.target.value)}></input>
            <button onClick={addTask}>Agregar Tarea</button>
            <Tasklist tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default TodoApp;