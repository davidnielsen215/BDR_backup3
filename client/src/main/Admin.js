import React from 'react';
import purpleLogo from './industry_gears/wholesale.png';
import darkBlueLogo from './industry_gears/financial.png'
import greenLogo from './industry_gears/community.png'
import redLogo from './industry_gears/retail.png'
import entireLogo from './industry_gears/VLORM_logo2.png'
import colorful from './industry_gears/colorful.png'
import '../styles/signup.css';
import Login from './Login/index'
import Signup from './Signup/index'
import {connect} from 'react-redux'
import {logout} from '../redux/auth'

 class Admin extends React.Component {
  state = {
    signin: true,
  }

  componentDidMount(){
    this.props.logout()
  }

  render(){
    const {signin = true} = this.state;
  return (
    <div className="App">
      <nav className='nav'>
      <img src={entireLogo} style={{width: '16vw'}}/>
      </nav>
      <header className="App-header">

        <div className="zama-form">

          {/* CREATE AN ACCOUNT FORM */}
        <div className={`container ${!signin ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
              <Signup/>
          <div className='single-gear' >

          {/* <img src={colorful} className="gear-logo2" alt="logo" /> */}
          </div>
            {/* <form action="#"> */}
            {/* </form> */}
          </div>

          {/* SIGN IN  FORM  */}
          <div className="form-container sign-in-container">
              <Login/>
            <div className='single-gear'>
            {/* <img src={colorful}  className="gear-logo2" alt="logo" /> */}
            </div>
            {/* <form action="#"> */}
              {/* <div className='lined-gears'> */}
              {/* </div> */}

            {/* </form> */}
          </div>

          {/* OVERLAY WELCOME BACK PANEL  */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
              {/* <div className='lined-gears'>

            <img src={lightBlueLogo} className="App-logo" alt="logo" />
            <img src={redLogo} className="App-logo2" alt="logo" />
            <img src={greenLogo} className="App-logo" alt="logo" />
            </div> */}
                <h1>Welcome Back!</h1>
                <p>To access your account, please login using your credentials</p>
                <button className="ghost" onClick={e => this.setState({signin: true})}>Sign In</button>
              </div>

            {/* CREATE AN ACCOUNT PANEL  */}
              <div className="overlay-panel overlay-right">
              <div className='lined-gears'>
            <img src={purpleLogo} className="App-logo" alt="logo" />
            <img src={redLogo} className="App-logo2" alt="logo" />
            <img src={greenLogo} className="App-logo" alt="logo" />
            </div>
                <h1>Create an Account</h1>
                <p>Enter a couple of details and start your journey with us</p>
                <button className="ghost" onClick={e => this.setState({signin: false})}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </header>
    </div>
  );
  }
}


export default connect(state => state.auth, { logout })(Admin)
