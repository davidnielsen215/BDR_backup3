import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../redux/auth";
import '../styles/signup.css'

function Navbar(props) {
    const { isAuthenticated, isValidated } = props
    return (
            
        <div className="navbar-wrapper">
            {!isAuthenticated && <div><Link to="/" className="nav-link">Sign Up</Link></div>}
            {!isAuthenticated && <div><Link to="/login" className="nav-link">Log In</Link></div>}
            {isAuthenticated && isValidated && <div><Link to="/subscriptions" className="nav-link2">Dashboard</Link></div>}
            {isAuthenticated && isValidated && <div><Link to="/profile" className="nav-link2">Profile</Link></div>}
            {isAuthenticated && !isValidated && <div><Link to="/" className="nav-link">Sign Up</Link></div>}
            {isAuthenticated && !isValidated && <div><Link to="/login" className="nav-link">Log In</Link></div>}
            <div>
            {/* <button onClick={props.logout}>Logout</button> */}

            {isAuthenticated && isValidated &&<button className='nav-btn' onClick={props.logout}>Logout</button>}
            {/* {isAuthenticated && !isValidated &&<button onClick={props.logout}>Logout</button>} */}
            </div>
        </div>
    )
}
export default connect(state => state.auth, { logout })(Navbar);
