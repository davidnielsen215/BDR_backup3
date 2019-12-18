import React, {Component} from 'react';
import SubscriptionList from "./SubscriptionList";
import {connect} from "react-redux";
import {loadSubscriptions} from "../../redux/subscription";

class SubscriptionListContainer extends Component {

    componentDidMount() {
        this.props.loadSubscriptions();
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
            <SubscriptionList
            subscriptions={this.props.subscriptions}/>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {loadSubscriptions})(SubscriptionListContainer)
