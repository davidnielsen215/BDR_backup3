import React, {Component} from 'react';
import Navbar from "./Navbar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { verify } from "../redux/auth";
import {validate} from '../redux/auth'
import '../styles/signup.css'

import ProtectedRoute from "./ProtectedRoute"
import Signup from "./Signup";
import Login from "./Login";
import SubscriptionList from "./Subscriptions";
import Profile from "./Profile";
import Validate from './Validate'

class App extends Component {

    componentDidMount(){
        this.props.verify();
        this.props.validate
    }

    render() {

        const {isAuthenticated, isValidated, loading} = this.props;

        return (
            
            <div className="app-wrapper">
                <Navbar/>
                {loading ? 
                <div><i><p>...Loading User Data</p></i></div>:
                <Switch>
                        <Route exact path="/" render={ props => isValidated ? 
                            <Redirect to="/validate"/> :
                            <Validate {...props}/>
                        }/>
                        <Route path="/login" render={ props => isAuthenticated && isValidated ?
                            <Redirect to="/profile"/> :
                            <Login {...props}/>
                        } />
                        <Route path ='/validate' render={props => isValidated ?
                            <Redirect to='/profile'/> :
                            <Validate {...props}/>
                            } />
                        <ProtectedRoute path="/subscriptions" component={SubscriptionList}/>
                        <ProtectedRoute path="/profile" component={Profile}/>
                </Switch>
                }
            </div>
            
        )
    }
}

export default withRouter(connect(state => state.auth,{verify, validate})(App));
