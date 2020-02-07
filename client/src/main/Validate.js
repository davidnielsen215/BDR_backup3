import React, { Component } from 'react'
// import Axios from 'axios'
import {connect} from 'react-redux'
import {validate} from '../redux/auth'


 class Validate extends Component {
     constructor() {
         super()
         this.state = {
             username: ''
         }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault(e)
        this.props.validate(this.state.username)
    }

    render() {
        return (
            <div>
                
                <h2>enter email to validate your account</h2>
                <input label='email' onChange={this.handleChange('username')}></input>
                <br/>
                <button onClick={this.handleSubmit}>validate</button>
            </div>
        )
    }
}

export default connect(state => state.auth, { validate })(Validate)
