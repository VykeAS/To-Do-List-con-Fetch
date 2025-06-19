import React from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ onTarea, eliminarTarea }) {

    return (
        <ul className="task-list">
             {!onTarea || onTarea.length === 0 ? (
                <p>No hay tareas pendientes.</p>
            ) : (
                onTarea.map((toDo) => (
                    <ToDoItem 
                        key={toDo.id} 
                        tarea={toDo.label}
                        idCounter={toDo.id} 
                        deleteTask={() => eliminarTarea(toDo.id)} 
                    />
                ))
            )}
        </ul>
    );
}

export default ToDoList;