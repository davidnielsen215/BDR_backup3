import React from 'react';
import SubscriptionContainer from "./SubscriptionContainer";
import SubscriptionFormContainer from "./AddSubscriptionFormContainer";

function SubscriptionList(props) {
    const subscriptions = props.subscriptions.map(subscription => {
        return (
            <SubscriptionContainer
                key={subscription._id}
                subscription={subscription}/>
        )
    })

    return (
        <div>
            <SubscriptionFormContainer/>
            {subscriptions}
        </div>
    )
}

export default SubscriptionList