import React, { useState } from "react";

function ToDoForm({ añadirTarea, vaciarTareas }) {

    const [formData, setFormData] = useState({ tarea: "" });

    function handleChange(e) {
        setFormData({ tarea: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.tarea.trim() === "") return;
        añadirTarea(formData.tarea);
        setFormData({ tarea: "" });
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Escribe tu tarea..."
                value={formData.tarea}
                onChange={handleChange}
            />
            <button type="submit">Añadir tarea</button>
            <button type="button" onClick={vaciarTareas}>Vaciar tareas</button> 
        </form>
    );
}

export default ToDoForm;