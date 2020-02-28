import React from 'react'
// import '../../styles/signup.css';
import '../../styles/admin.css'


function LoginForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h1 style={{marginTop: '120px'}}>Sign in</h1>
                <input  onChange={props.handleChange}
                    value={props.username}
                    name="username"
                    type="email"
                    placeholder="Email Address"/> 
                <input onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password" />
                <button type="submit">Sign In</button>
                {/* <input
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
                <button className="form-btn" type="submit">Submit</button> */}
                <p>{props.errMsg}</p>
                <p>{props.validationErr}</p>
            </form>
        </div>
    )
}

export default LoginForm;