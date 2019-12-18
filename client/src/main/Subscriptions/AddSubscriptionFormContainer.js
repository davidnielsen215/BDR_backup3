import React, {Component} from 'react';
import AddSubscriptionForm from "./AddSubscriptionForm";
import {connect} from "react-redux";
import {addSubscription} from "../../redux/subscription";

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
            <AddSubscriptionForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                {...this.state.inputs} />
        )
    }
}

export default connect(null, {addSubscription})(AddSubscriptionFormContainer);
