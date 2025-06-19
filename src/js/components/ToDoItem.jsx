import React, { useState } from "react";

function ToDoItem({ tarea, idCounter, deleteTask }) {

    const [mostrarBoton, setMostrarBoton] = useState(false);

    return (
        <li 
            className="task-item"
            onMouseEnter={() => setMostrarBoton(true)}
            onMouseLeave={() => setMostrarBoton(false)}
        >
            <h4>{tarea}</h4>
            <h6>Id: {idCounter}</h6>
            
            {mostrarBoton && (
                <button className="delete-btn" onClick={deleteTask}>✖</button>
            )}
        </li>
    );
}

export default ToDoItem;