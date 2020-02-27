import React, {Component} from 'react';
import AddSubscriptionForm from "./AddSubscriptionForm";
import {connect} from "react-redux";
import {addSubscription} from "../../redux/subscription";
import Recurly from '../Recurly'

class AddSubscriptionFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                title: ""
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
                title: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addSubscription(this.state.inputs);
        this.clearInputs()
    }

    render() {
        return (
            <div>
            <AddSubscriptionForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                {...this.state.inputs} />
                <div style={{minWidth: '250px', maxWidth: '400px', margin: 'auto', border: '1px solid orange'}}>
                
                <Recurly/>
                </div>
            </div>
        )
    }
}

export default connect(null, {addSubscription})(AddSubscriptionFormContainer);
