import React, { useState, useEffect } from "react"; 


import ToDoForm from "../js/components/ToDoForm.jsx";
import ToDoList from "../js/components/ToDoList.jsx";


import "../styles/index.css"; 

const Home = () => {
    const [tarea, setTarea] = useState([]);


    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "light-mode";
    }, [darkMode]);


    const getTareas = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Angel');
            if (!response.ok) throw new Error("Algo salió mal al cargar las tareas");

            const data = await response.json();
            setTarea(data.todos); 
            console.log(data)

        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getTareas();
    }, []);



    async function añadirTarea(nuevaTarea) {
        try {

            const response = await fetch(`https://playground.4geeks.com/todo/todos/Angel`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ label: nuevaTarea, done: false }) 
            });

            if (!response.ok) throw new Error("Error al añadir la tarea");

            await getTareas(); 

        } catch (err) {
            console.log(err);
        }
    }


    async function eliminartarea(id) {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar la tarea");

            await getTareas(); 

        } catch (err) {
            console.error(err);
        }
    }

       async function vaciarTareas() {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Angel');
            if (!response.ok) throw new Error("Error al obtener la lista de tareas");

            const data = await response.json();
            const tareas = data.todos;

            for (let tarea of tareas) {
                const deleteResponse = await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
                    method: "DELETE",
                });

                if (!deleteResponse.ok) {
                    console.error(`Error al eliminar tarea con ID: ${tarea.id}`);
                }
            }

            setTarea([]);


        } catch (err) {
            console.error("Error eliminando tareas:", err);
        }
    }

    return (
        <div className="container">
            <div className="theme-toggle">
                <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "🌙" : "🌞"}
                </button>
            </div>
            <h2>Lista de Tareas</h2>
            <ToDoForm añadirTarea={añadirTarea} vaciarTareas={vaciarTareas} />
                <ToDoList onTarea={tarea} eliminarTarea={eliminartarea} />

        </div>
    );
};

export default Home;