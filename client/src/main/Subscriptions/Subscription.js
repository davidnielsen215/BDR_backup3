import React from 'react';

function Subscription(props) {
    return (
        <div style={{border: '1px solid blue',margin: '3px'}}>
            <h3>Current Subscription</h3>
            <p>{props.subscription.title}</p>
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