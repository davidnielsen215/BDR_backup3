import React from 'react'
// import '../../styles/signup.css';
import '../../styles/admin.css'

function SignupForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3 >Create Account</h3>
                <input onChange={props.handleChange}
                    value={props.username}
                    name="username"
                    type="email"
                    placeholder="Email Address" 
                />
                <input onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password" 
                />
                <input onChange={props.handleChange}
                    value={props.firstname}
                    name="firstname"
                    type="name"
                    placeholder="Name" 
                />
                <input onChange={props.handleChange}
                    value={props.website}
                    name="website"
                    type="website"
                    placeholder="Website"
                />
                <input onChange={props.handleChange}
                    value={props.phone}
                    name="phone"
                    type="tel"
                    maxLength="10"
                    placeholder="Phone Number"
                />
                <button type="submit">create account</button>
                <p>{props.errMsg}</p>
            </form>
        </div>
    )
}

export default SignupForm