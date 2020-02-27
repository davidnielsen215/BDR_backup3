import React from 'react';
import purpleLogo from './industry_gears/wholesale.png';
import darkBlueLogo from './industry_gears/financial.png'
import greenLogo from './industry_gears/community.png'
import redLogo from './industry_gears/retail.png'
import entireLogo from './industry_gears/VLORM_logo2.png'
import colorful from './industry_gears/colorful.png'
import '../styles/admin.css';

export default class Admin extends React.Component {
  state = {
    signin: true,
  }
  render(){
    const {signin = true} = this.state;
  return (
    <div className="App">
      <nav className='nav'>
      <img src={entireLogo} style={{width: '16vw'}}/>
      </nav>
      {/* <Industries/> */}
      <header className="App-header">
        {/* <div style={{ borderRadius: '10px', marginTop: '2vh'}}>
          <img src={entireLogo} className='newSize'/>
        </div> */}


        <div className="zama-form">

          {/* CREATE AN ACCOUNT FORM */}
        <div className={`container ${!signin ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
          <div className='single-gear'>

          <img src={colorful} style={{height: '625px', opacity: 0.1, marginLeft: '50px'}} className="gear-logo" alt="logo" />
          </div>
            <form action="#">
              <h1>Create Account</h1>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>create account</button>
            </form>
          </div>

          {/* SIGN IN  FORM  */}
          <div className="form-container sign-in-container">
            <div className='single-gear'>

            <img src={colorful} style={{height: '625px', opacity: 0.1, marginLeft: '-375px'}} className="gear-logo" alt="logo" />
            </div>
            <form action="#">
              {/* <div className='lined-gears'> */}
              {/* </div> */}

              <h1>Sign in</h1>

              <span>use your email to sign to your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign In</button>
            </form>
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

