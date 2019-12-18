import React from 'react'
import '../../styles/signup.css'

function AddTodoForm(props) {
    return (
        <div className='sub-form'>
            <form onSubmit={props.handleSubmit}>
                <h4>Select Your Subcription Plan</h4>

                <input
                    className = "account-input"
                    name="title"
                    value={props.title}
                    onChange={props.handleChange}
                    type="text"
                    placeholder="Title"/>
                    <br/>

                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddTodoForm;