import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../redux/auth";
import '../styles/signup.css'

function Navbar(props) {
    const { isAuthenticated } = props
    return (
            
        <div className="navbar-wrapper">
            {!isAuthenticated && <div><Link to="/" className="nav-link">Sign Up</Link></div>}
            {!isAuthenticated && <div><Link to="/login" className="nav-link">Log In</Link></div>}
            {isAuthenticated && <div><Link to="/todos" className="nav-link">Subscription</Link></div>}
            {isAuthenticated &&<div><Link to="/profile" className="nav-link">Profile</Link></div>}
            <div>
            {/* <button onClick={props.logout}>Logout</button> */}

            {isAuthenticated &&<button onClick={props.logout}>Logout</button>}
            </div>
        </div>
    )
}
export default connect(state => state.auth, { logout })(Navbar);
