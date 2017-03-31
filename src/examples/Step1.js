'use strict';

import React, { Component, PropTypes } from 'react';

export default class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.getStore().email,
      password: props.getStore().password
    };

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().email != userInput.email || this.props.getStore().password != userInput.password) { // only update store of something changed
          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)
        }

        isDataValid = true;
    }
    else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    return isDataValid;
  }

  validationCheck() {
    this.isValidated();
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

   _validateData(data) {
    return  {
      emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email), // required: regex w3c uses in html5
      passwordVal: (data.password != '' && data.password.length > 5),
      confirmpasswordVal: (data.confirmpassword == data.password)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      emailValMsg: val.emailVal ? '' : 'A valid email is required',
      passwordValMsg: val.passwordVal ? '' : 'A valid password is required',
      confirmpasswordValMsg: val.confirmpasswordVal ? '' : 'A valid confirmpassword is required'
    }
    return errMsgs;
  }

  _grabUserInput() {
    return {
      email: this.refs.email.value,
      password: this.refs.password.value,
      confirmpassword: this.refs.confirmpassword.value
    };
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    if (typeof this.state.emailVal == 'undefined' || this.state.emailVal) {
        notValidClasses.emailCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.emailCls = 'has-error col-md-8';
       notValidClasses.emailValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.passwordVal == 'undefined' || this.state.passwordVal) {
        notValidClasses.passwordCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.passwordCls = 'has-error col-md-8';
       notValidClasses.passwordValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.confirmpasswordVal == 'undefined' || this.state.confirmpasswordVal) {
        notValidClasses.confirmpasswordCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.confirmpasswordCls = 'has-error col-md-8';
       notValidClasses.confirmpasswordValGrpCls = 'val-err-tooltip';
    }

    return (
      <div className="step step3">
        <div>
            <div className="row">
                <div className="six">
                    <label className="u-left-width">EMAIL</label>
                    <input className="u-full-border-width" placeholder="someone@example.com"
                        type="email"
                        ref="email"
                        autoComplete="off"
                        required
                        defaultValue={this.state.email}
                        onBlur={this.validationCheck}
                        autoFocus/>
                    <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <label className="u-left-width">PASSWORD</label>
                    <input className="u-full-border-width" placeholder="Password"
                        type="text"
                        ref="password"
                        autoComplete="off"
                        required 
                        onBlur={this.validationCheck} 
                        defaultValue={this.state.password}/>
                    <div className={notValidClasses.passwordValGrpCls}>{this.state.passwordValMsg}</div>                        
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <label className="u-left-width">CONFIRM PASSWORD</label>
                    <input className="u-full-border-width" placeholder="Confirm Password"
                        type="password"
                        ref="confirmpassword"
                        autoComplete="off"
                        required
                        onBlur={this.validationCheck}/>
                    <div className={notValidClasses.confirmpasswordValGrpCls}>{this.state.confirmpasswordValMsg}</div>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <hr className="footerline"></hr>
                </div>
            </div>            
        </div>
      </div>      
    )
  }
}
