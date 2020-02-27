import React from 'react'
import '../../styles/signup.css'

function AddSubscriptionForm(props) {
    return (
        <div className='sub-form'>
            <form onSubmit={props.handleSubmit}
            style={{border: '1px solid magenta',margin: '1px'}}>
                <h4>Select Your Subcription Plan</h4>

                <input
                    className = "account-input"
                    name="title"
                    value={props.title}
                    onChange={props.handleChange}
                    type="text"
                    placeholder="Type"/>
                    <br/>

                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddSubscriptionForm;