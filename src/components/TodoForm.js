import React,{useState, useEffect, useRef} from 'react'

function TodoForm(props) {

    console.log(props);

const [input, setInput] = useState(props.edit ? props.edit.value : ''); //Lleva el valor del texto/tarea que se quiere editar

const inputRef = useRef(null)

useEffect(() => {
    inputRef.current.focus()
})

const handleChange = event =>{      //Recoge el evento que disparo el onChange //Aqui se pueden hacer validaciones de lo que mete el usuario
    setInput(event.target.value); //El target es el formulario, el valor en el formulario
}                                 //Permite tomar en cuenta cada cambio a un Todo

const handleSubmit = event =>{
    event.preventDefault();      //Paro el submit para que no recargue la pagina y pueda hacer cosas
                                 //Aqui podria ir un fetch                            

    props.onSubmit({
         id: Math.floor(Math.random()*10000),
         text: input
    });

    setInput('');               //Limpia el campo "Add ToDo"

};

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? ( 
            <>
                <input                  
                    type="text" 
                    placeholder="Update your item"
                    value={input}
                    name="text" 
                    className="todo-input edit"                
                    onChange={handleChange} //Me permite modificar el valor del target (input) //Va recibiendo cada cambio para renderizarlo
                    /* Recibe el evento que la disparó para hacer una validación. Esto modificaría algo en el estado para que el render vuelva a pintar lo que haya que poner */
                    ref={inputRef}
                />
                <button className="todo-button edit">Update</button>
            </>
            ) : (
            <>
                <input                  
                    type="text" 
                    placeholder="Add a ToDo"
                    value={input}
                    name="text" 
                    className="todo-input"                
                    onChange={handleChange} //Me permite modificar el valor del target (input) //Va recibiendo cada cambio para renderizarlo
                    /* Recibe el evento que la disparó para hacer una validación. Esto modificaría algo en el estado para que el render vuelva a pintar lo que haya que poner */
                    ref={inputRef}
                />
                <button className="todo-button">Add ToDo</button>
            </>
            )}
            
        </form>
    );
}

export default TodoForm
