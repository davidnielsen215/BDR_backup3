import axios from "axios";

const initialState = {
    subscriptions: [],
    user: {
    username: "",
    isAdmin: false,
    _id: ""
    },
    authErrCode: {
        signup: "",
        login: ""
    },
    isAuthenticated: false,
    loading: true
}


function authError(key, errCode) {
    return {
        type: "AUTH_ERROR",
        key,
        errCode,
    }
}

const profileAxios = axios.create();
profileAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export function verify() {
    return dispatch => {
        profileAxios.get("/api/profile")
            .then(response => {
                let { user } = response.data;
                dispatch(authenticate(user));
            })
            .catch(err => {
                dispatch(authError("verify", err.response.status))
            })
    }
}



export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode,
                },
                loading: false
            }

        case "AUTHENTICATE":
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode: initialState.authErrCode,
                loading: false
            }
            
            case "LOGOUT":
                return {
                    ...initialState,
                    loading: false
                }
            default:
            return state;
        }   
}

export function authenticate(user) {
    return {
        type: "AUTHENTICATE",
        user  // pass the user for storage in Redux store
    }
    
}

export function signup(userInfo) {
    return dispatch => {
        axios.post("/auth/signup", userInfo)
            .then(response => {
                const { token, user } = response.data;
                localStorage.token = token
                localStorage.user = JSON.stringify(user);
                // dispatch(authenticate(user));
            })
            .catch(err => {
                console.error(err);
                dispatch(authError("signup", err.response.status))
            })
            const port = process.env.Port || 5001

            const recipient = userInfo.username
            const sender = 'test@bestdealretailer.com'
            const subject = 'Validate your Email'
            const text = 'Thank you for signing up with Best Deal Retailer. Please click the link and follow the instructions to validate your account'
            fetch(`http://127.0.0.1:${port}/send-email?recipient=${recipient}&sender=${sender}&topic=${subject}&text=${text}`)
            .then(console.log('succesfully sent email'))
            .catch(err => console.error(err))
    }
}

export function validate(userInfo){
    return dispatch => {
        axios.post("/auth/login", userInfo)
        .then(response => {
            const { user } = response.data;
            dispatch(authenticate(user));
        })
        .catch(err => {
            console.error(err);
            dispatch(authError("signup", err.response.status))
        })
    }
}

// export function exeEmail(userInfo){
    
//     const port = process.env.Port || 5001

//     const recipient = userInfo.username
//             const sender = 'test@bestdealretailer.com'
//             const subject = 'Validate your Email'
//             const text = 'Thank you for signing up with Best Deal Retailer. Please click the link and follow the instructions to validate your account'
//             fetch(`http://127.0.0.1:${port}/send-email?recipient=${recipient}&sender=${sender}&topic=${subject}&text=${text}`)
//             .then(console.log('succesfully sent email'))
//             .catch(err => console.error(err))
    
// }

export function login(credentials) {
    return dispatch => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.token = token
                localStorage.user = JSON.stringify(user);
                dispatch(authenticate(user));
            })
            .catch((err) => {
                console.error(err);
                dispatch(authError("login", err.response.status))
            });
    }
}

export function logout() {
    delete localStorage.token;
    delete localStorage.user;
    return {
        type: "LOGOUT"
    }
}

