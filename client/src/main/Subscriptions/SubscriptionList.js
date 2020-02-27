import React from 'react';
import SubscriptionContainer from "./SubscriptionContainer";
import AddSubscriptionFormContainer from "./AddSubscriptionFormContainer";

//BORDER COLOR = RED

//The subscription container will return a component called subscription and will have edit
//and delete functions that are called in the redux store
function SubscriptionList(props) {
    const subscriptions = props.subscriptions.map(subscription => {
        return (
            <SubscriptionContainer
                key={subscription._id}
                subscription={subscription}
            />
        )
    })

   // The addSubscriptionFormContainer is what is wrapped around all of the components
   // within this component is the AddSubscription component
   //this is where the subscriptions are created in the redux store and then sent to the DB
    return (
        <div style={{border: '1px solid lime'}}>
            <AddSubscriptionFormContainer/>
            {subscriptions}
        </div>
    )
}

export default SubscriptionList