import axios from "axios";

let subscriptionAxios = axios.create();

subscriptionAxios.interceptors.request.use((config)=>{  
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

///////////////////
// subscriptions Reducer //
///////////////////
const initialSubscriptions = [];

export default function subscriptionsReducer(subscriptions = initialSubscriptions, action) {
    switch (action.type) {
        case "SET_SUBSCRIPTIONS":
            return [...action.subscriptions]
        case "LOGOUT":
            return initialSubscriptions;
        default:
            return subscriptions
    }
}

const SET_SUBSCRIPTIONS = "SET_SUBSCRIPTIONS";
const subscriptionUrl = "/api/subscription/";

///////////////////////////
// Subscriptions Action Creators //
///////////////////////////
function setSubscriptions(subscriptions) {
    return {
        type: SET_SUBSCRIPTIONS,
        subscriptions
    }
}

export function loadSubscriptions() {
    return dispatch => {
        subscriptionAxios.get(subscriptionUrl)
            .then(response => {
                dispatch(setSubscriptions(response.data));
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function addSubscription(subscription) {
    return dispatch => {
        subscriptionAxios.post(subscriptionUrl, subscription)
            .then(response => {
                dispatch(loadSubscriptions());
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function editSubscription(id, subscription) {
    return dispatch => {
        subscriptionAxios.put(subscriptionUrl + id, subscription)
            .then(response => {
                dispatch(loadSubscriptions());
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function deleteSubscription(id) {
    return dispatch => {
        subscriptionAxios.delete(subscriptionUrl + id)
            .then(response => {
                dispatch(loadSubscriptions());
            })
            .catch(err => {
                console.error(err);
            })
    }
}


