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
    isValidated: false,
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

export function checkValid() {
    return dispatch => {
        profileAxios.get("/api/profile")
    .then(response => {
        let { user } = response.data;        
        if(user.isValidated === true){
            dispatch(validation(user))
        }else(console.log('missing requirement: email validation'))
    })
    .catch(err => {
        console.error(err);
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

        case "VALIDATE":
            return{
                ...state,
                ...action.user,
                isValidated: true,
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

function validation(user){
    return{
        type: "VALIDATE",
        user
    }
}

export function signup(userInfo) {
    return dispatch => {
        axios.post("/auth/signup", userInfo)
            .then(response => {
                const { token, user } = response.data;
                localStorage.token = token
                localStorage.user = JSON.stringify(user);
                dispatch(authenticate(user));
            })
            .catch(err => {
                console.error(err);
                dispatch(authError("signup", err.response.status))
            })
            const port = process.env.Port || 5001
            const validationUrl = 'http://localhost:3000/validate'
            const recipient = userInfo.username
            const sender = 'test@bestdealretailer.com'
            const subject = 'Validate your Email'
            const text = `Thank you for signing up with Best Deal Retailer. Please click the link and follow the instructions to validate your account: ${validationUrl}`
            fetch(`http://127.0.0.1:${port}/send-email?recipient=${recipient}&sender=${sender}&topic=${subject}&text=${text}`)
            .then(console.log('succesfully sent email'))
            .catch(err => console.error(err))
    }
}

export function validate(credentials) {
    console.log(credentials)
    return dispatch => {
        axios.put("/auth/validate", credentials)
        .then(response => {
            const { token, user } = response.data;
            localStorage.token = token
            localStorage.user = JSON.stringify(user);
            // dispatch(authenticate(user))
            console.log('redux validation success')
            dispatch(validation(user));
        })
        .catch(err => {
            console.error(err);
            dispatch(authError("signup", err.response.status))
        })
    }
}

export function login(credentials) {
    console.log(credentials)
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

