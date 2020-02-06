import React from 'react';
import SubscriptionContainer from "./SubscriptionContainer";
import AddSubscriptionFormContainer from "./AddSubscriptionFormContainer";

//BORDER COLOR = RED

function SubscriptionList(props) {
    const subscriptions = props.subscriptions.map(subscription => {
        return (
            <SubscriptionContainer
                key={subscription._id}
                subscription={subscription}
            />
        )
    })

    return (
        <div style={{border: '5px solid lime'}}>
            <AddSubscriptionFormContainer/>
            {subscriptions}
        </div>
    )
}

export default SubscriptionList