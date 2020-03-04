import React, { Component } from 'react'
// import Axios from 'axios'
import {connect} from 'react-redux'
import {validate} from '../redux/auth'
import {logout} from '../redux/auth'
import Navbar from './Navbar'


 class Validate extends Component {
     constructor() {
         super()
         this.state = {
                 username: '',
                 token: '',
         }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
        let authErrCode = this.props.authErrCode.validate
        let errMsg = ""
        if (authErrCode < 500 && authErrCode > 399){
            errMsg = "Validation error: make sure your username and validation code are correct"
        } else if (authErrCode < 399) {
            errMsg = "Account validation success: you may log in to your account"
        }
        if (!authErrCode)
            errMsg = ""
        
        return (
            <div>
                <Navbar/>
                <h2 style={{paddingTop: '10%'}}>enter validation token to activate your account</h2>
                <input placeholder='email' onChange={this.handleChange} name='username' value={this.state.username} className = "account-input"/>
                <br/>
                <input placeholder='validation code'  onChange={this.handleChange}
                value={this.state.token} name="token" className="account-input"/>
                <br/>
                <button onClick={this.handleSubmit} className="form-btn">validate</button>
                <p>{errMsg}</p>
            </div>
        )
    }
}

export default connect(state => state.auth, { validate, logout })(Validate)
