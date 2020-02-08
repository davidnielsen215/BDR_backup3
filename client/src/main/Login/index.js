import React, { Component } from 'react';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/auth";

class LoginFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                username: "",
                password: "",
                validationErr: ''
            }
        }
    }

    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        let isValidated = this.props.isValidated
        let isAuthenticated = this.props.isAuthenticated

        e.preventDefault();
        this.props.login(this.state.inputs);
        this.clearInputs();
        if (isAuthenticated&&!isValidated) {
            this.setState({validationErr : "Please validate email before accessing account"})
        } 
    }

    render() {
        let authErrCode = this.props.authErrCode.login
        let errMsg = ""
        const {validationErr} = this.state
        if (authErrCode < 500 && authErrCode > 399) {
            errMsg = "Username and Password do not match";
        } else if (authErrCode > 499) {
            errMsg = "Server error";
        }
        return (
            <LoginForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                errMsg={errMsg}
                validationErr={validationErr}
                {...this.state.inputs} />
            

        )
    }
}

export default connect(state => state.auth, { login })(LoginFormContainer);
