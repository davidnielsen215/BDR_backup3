import React from 'react'
import '../../styles/signup.css';


function LoginForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3>Log in using existing account</h3>
                <input
                    className = "account-input"
                    onChange={props.handleChange}
                    value={props.username}
                    name="username"
                    type="email"
                    placeholder="Email Address"/>
                    <br/>
                <input
                    className = "account-input"
                    onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password"/>
                    <br/>
                <button className="form-btn" type="submit">Submit</button>
                <p>{props.errMsg}</p>
            </form>
        </div>
    )
}

export default LoginForm;