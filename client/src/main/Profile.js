import React from 'react'
import {connect} from 'react-redux'
import Navbar from './Navbar'

function Profile(props) {

    return (
        <div>
            <Navbar/>
            <h2>Welcome,<p/> <i> {props.username}</i></h2>
            
        </div>
    )
}

export default connect(state => state.auth, {})(Profile)