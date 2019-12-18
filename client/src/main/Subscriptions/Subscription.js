import React from 'react';

function Subscription(props) {
    return (
        <div>
            <h3>{props.subscription.title}</h3>
            <input
                onChange={props.handleCompleted}
                type="checkbox"
                checked={props.subscription.completed}/>
                <br/>
            <button onClick={props.handleRemove}>Remove Subscription</button>
        </div>
    )
}

export default Subscription;