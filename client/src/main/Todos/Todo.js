import React from 'react';

function Todo(props) {
    return (
        <div>
            <h3>{props.todo.title}</h3>
            <input
                onChange={props.handleCompleted}
                type="checkbox"
                checked={props.todo.completed}/>
                <br/>
            <button onClick={props.handleRemove}>Remove Subscription</button>
        </div>
    )
}

export default Todo;