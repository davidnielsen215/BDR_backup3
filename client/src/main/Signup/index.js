import React, { Component } from 'react';
import SignupForm from "./SignupForm";
import {connect} from "react-redux";
import {signup} from "../../redux/auth";
import Axios from 'axios';

class SignupFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                username: "",
                password: "",
                firstname: "",
                website: "",
                phone: "",
            }
        }
    }

    handleChange(e) {
        e.persist();
        this.setState(prevState => {
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
                password: "",
                firstname: "",
                // lastname: "",
                website: "",
                // company: "",
                phone: "",
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.exeEmail(this.state.inputs);
        this.props.signup(this.state.inputs);
        this.clearInputs();
        const key = '4d2b081d-ba0b-4671-9284-177c7f957f21'
        const baseUrl = `https://cors-anywhere.herokuapp.com/https://api.hubapi.com/contacts/v1/contact/?hapikey=${key}`

        Axios({
            method: 'post',
            url: baseUrl,
            data: {
                "properties": [
                    {
                      "property": "email",
                      "value": `${this.state.inputs.username}`
                    },
                    {
                      "property": "firstname",
                      "value": `${this.state.inputs.firstname}`
                    },
                    {
                      "property": "website",
                      "value": `${this.state.inputs.website}`
                    },
                    {
                      "property": "phone",
                      "value": `${this.state.inputs.phone}`
                    },
                ]   
            }
        }).then(res => {
            // (history.push('/emailMsg'))
        }).catch(err => {
            console.log('Hubspot API Post fail')
            console.log(err)
        })
    }

    render() {
        let authErrCode = this.props.authErrCode.signup
        let errMsg = ""
        if (authErrCode < 500 && authErrCode > 399){
            errMsg = "Account already in use"
        } else if (authErrCode > 499) {
            errMsg = "Invalid information, please try again"
        }
        else if (authErrCode != {}) {
        errMsg = "Thanks for signing up! Check your email to validate your account"
        }
        if (!authErrCode)
            errMsg = ""
        
        return (
            <SignupForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                errMsg={errMsg}
                {...this.state.inputs} />
        )
    }
}

export default connect(state => state.auth, { signup })(SignupFormContainer);



