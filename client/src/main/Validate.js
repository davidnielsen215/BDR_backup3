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
         }
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleUser = this.handleUser.bind(this)
        // this.handlePass = this.handlePass.bind(this)
        this.handleChange= this.handleChange.bind(this)
    }

    componentDidMount(){
        this.props.logout()
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
          ...this.state,
          [evt.target.name]: value
        });
      }

    handleSubmit(e){
        e.preventDefault(e)
        this.props.validate(this.state)
    }

    render() {
        
        return (
            <div>
                <h2>enter email to validate your account</h2>
                <input placeholder='email' onChange={this.handleChange} name='username' value={this.state.username} className = "account-input"/>
                <br/>
                <input placeholder='password' type="password" onChange={this.handleChange}
                value={this.state.password} name="password" className="account-input"/>
                <br/>
                <button onClick={this.handleSubmit} className="form-btn">validate</button>
            {/* <p>{this.state.success}</p> */}
            </div>
        )
    }
}

export default connect(state => state.auth, { validate, logout })(Validate)
