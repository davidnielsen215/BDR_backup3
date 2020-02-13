import React, { Component } from 'react'
// import Axios from 'axios'
import {connect} from 'react-redux'
import {validate} from '../redux/auth'
import {logout} from '../redux/auth'


 class Validate extends Component {
     constructor() {
         super()
         this.state = {
             
                 username: '',
                 password: '',
                 success: ''
             
         }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        // this.props.logout()
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
                <input placeholder='email' onChange={this.handleChange('username')} className = "account-input"/>
                <br/>
                {/* <input placeholder='password' type="password" onChange={this.handleChange('password')} className = "account-input"/> */}
                <br/>
                <button onClick={this.handleSubmit} className="form-btn">validate</button>
                <p>{this.state.success}</p>
            </div>
        )
    }
}

export default connect(state => state.auth, { validate, logout })(Validate)
