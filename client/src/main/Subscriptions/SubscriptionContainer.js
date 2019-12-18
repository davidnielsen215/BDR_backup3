import React, { Component } from 'react';
import Subscription from "./Subscription";
import { connect } from "react-redux";
import { editSubscription, deleteSubscription } from "../../redux/subscription";

class SubscriptionContainer extends Component {

    handleCompleted(e) {
        this.props.editSubscription(this.props.subscription._id, { completed: e.target.checked })
    }

    handleRemove() {
        this.props.deleteSubscription(this.props.subscription._id);
    }

    render() {
        return (
            <Subscription
                handleCompleted={this.handleCompleted.bind(this)}
                handleRemove={this.handleRemove.bind(this)}
                subscription={this.props.subscription}
            />
        )
    }
}

export default connect(null, { editSubscription, deleteSubscription })(SubscriptionContainer);
