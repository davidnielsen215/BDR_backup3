import React, {Component} from 'react';
import Navbar from "./Navbar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { verify } from "../redux/auth";
import {checkValid} from '../redux/auth'
// import {isValidated} from '../redux/auth'
import '../styles/signup.css'

import Admin from './Admin'
import ProtectedRoute from "./ProtectedRoute"
import Signup from "./Signup";
import Login from "./Login";
import SubscriptionList from "./Subscriptions";
import Profile from "./Profile";
import Validate from './Validate'
import Recurly from './Recurly'
import EmailMsg from './Signup/EmailMsg'

class App extends Component {

    componentDidMount(){
        this.props.verify();
        this.props.checkValid()
    }

    render() {

        const {isAuthenticated, isValidated, loading} = this.props;

        return (
            
            <div className="app-wrapper">
                <Route path='/admin'  component={Admin}/>
                {/* <Navbar/> */}
                {loading ? 
                <div><i><p>...Loading User Data</p></i></div>:
                <Switch>
                        <Route exact path="/" render={ props => isAuthenticated&&isValidated ? 
                            <Redirect to="/profile"/> :
                            <Admin {...props} />
                        }/>

                        {/* <Route exact path="/admin" render={ props => isAuthenticated&&isValidated ? 
                            <Redirect to="/profile"/> :
                            <Admin {...props} />
                        }/> */}
                        
                        <Route path="/login" render={ props => isAuthenticated&&isValidated ?
                            <Redirect to="/profile"/> :
                            <Admin {...props}/> 
                        } />
                        <Route path ='/validate' render={props => isValidated&&isAuthenticated ?
                            <Redirect to='/profile'/> :
                            <Validate {...props} />
                            } />
                        <Route path ='/emailMsg' render={ props => isValidated&&isAuthenticated ?
                            <Redirect to='/profile'/> :
                            <EmailMsg {...props}/>
                            } />
                        <ProtectedRoute path="/subscriptions" component={SubscriptionList}/>
                        <ProtectedRoute path="/profile" component={Profile}/>
                        <ProtectedRoute path="/recurly" component={Recurly}/>
                </Switch>
                }
            </div>
            
        )
    }
}

export default withRouter(connect(state => state.auth,{verify, checkValid})(App));
