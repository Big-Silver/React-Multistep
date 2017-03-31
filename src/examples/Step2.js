'use strict';

import React, { Component, PropTypes } from 'react';

export default class Step2 extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       emailEmergency: props.getStore().emailEmergency
//     };

//     this.validatorTypes = {
//       emailEmergency: Joi.string().email().required()
//     };

//     this.getValidatorData = this.getValidatorData.bind(this);
//     this.renderHelpText = this.renderHelpText.bind(this);
//     this.isValidated = this.isValidated.bind(this);
//   }

//   isValidated() {
//     return new Promise((resolve, reject) => {
//       this.props.validate((error) => {
//         if (error) {
//           reject(); // form contains errors
//           return;
//         }

//         if (this.props.getStore().emailEmergency != this.getValidatorData().emailEmergency) { // only update store of something changed
//           this.props.updateStore({
//             ...this.getValidatorData(),
//             savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
//           });  // Update store here (this is just an example, in reality you will do it via redux or flux)
//         }

//         resolve(); // form is valid, fire action
//       });
//     });
//   }

//   getValidatorData() {
//     return {
//       emailEmergency: this.refs.emailEmergency.value,
//     }
//   };

//   onChange(e) {
//       let newState = {};
//       newState[e.target.name] = e.target.value;
//       this.setState(newState);
//   }

//   renderHelpText(message, id) {
//       return (<div className="val-err-tooltip" key={id}><span>{message}</span></div>);
//   };

//   render() {
//     // explicit class assigning based on validation
//     let notValidClasses = {};
//     notValidClasses.emailEmergencyCls = this.props.isValid('emailEmergency') ?
//         'no-error col-md-8' : 'has-error col-md-8';
constructor(props) {
    super(props);

    this.state = {
      day: props.getStore().day,
      month: props.getStore().month,
      year: props.getStore().year,
      gender: props.getStore().gender
    };

    this.genderValue = '';

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
        if (this.props.getStore().day != userInput.day || this.props.getStore().month != userInput.month || this.props.getStore().year != userInput.year || this.props.getStore().gender != userInput.gender) { // only update store of something changed
          
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
      dayVal: (data.day > 0 && (data.month == 2 ? data.day < 29 : data.day < 31)),
      monthVal: (data.month > 0 && data.month < 13),
      yearVal: (data.year > 1900 && data.year < 1999),
      genderVal: (data.gender != '')
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      dayValMsg: val.dayVal ? '' : 'A valid day',
      monthValMsg: val.monthVal ? '' : 'A valid month',
      yearValMsg: val.yearVal ? '' : 'A valid year',
      dateValMsg: val.dayVal && val.monthVal && val.yearVal ? '' : 'A valid date is required',
      genderValMsg: val.genderVal ? '' : 'A valid gender is required'
    }
    return errMsgs;
  }

  _grabUserInput() {
    return {
      day: this.refs.day.value,
      month: this.refs.month.value,
      year: this.refs.year.value,
      gender: this.genderValue
    };
  }

  maleBtn() {
    this.genderValue = 'male';
    this.props.getStore().gender = 'male';
    this.validationCheck();
  }

  femaleBtn() {
    
    this.genderValue = 'female';
    this.props.getStore().gender = 'female';
    this.validationCheck();
  }

  unspecifedBtn() {
    this.genderValue = 'unspecifed';
    this.props.getStore().gender = 'unspecifed'
    this.validationCheck();
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    if (typeof this.state.dayVal == 'undefined' || this.state.dayVal) {
        notValidClasses.dayCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.dayCls = 'has-error col-md-8';
       notValidClasses.dayValGrpCls = 'val-err-tooltip';
       notValidClasses.dateValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.monthVal == 'undefined' || this.state.monthVal) {
        notValidClasses.monthCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.monthCls = 'has-error col-md-8';
       notValidClasses.monthValGrpCls = 'val-err-tooltip';
       notValidClasses.dateValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.yearVal == 'undefined' || this.state.yearVal) {
       notValidClasses.yearCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.yearCls = 'has-error col-md-8';
       notValidClasses.yearValGrpCls = 'val-err-tooltip';
       notValidClasses.dateValGrpCls = 'val-err-tooltip';
    }

    let buttonClasses = {maleCls: "u-date-width", femaleCls: "u-date-width", unspecifiedCls: "u-date-width"};

    if (this.genderValue == 'male') {
        buttonClasses.maleCls = 'u-date-width button-primary';
        buttonClasses.femaleCls = 'u-date-width';
        buttonClasses.unspecifiedCls = 'u-date-width';
    }
    else if (this.genderValue == 'female') {
        buttonClasses.maleCls = 'u-date-width';
        buttonClasses.femaleCls = 'u-date-width button-primary';
        buttonClasses.unspecifiedCls = 'u-date-width';
    }
    else if (this.genderValue == 'unspecifed') {
        buttonClasses.maleCls = 'u-date-width';
        buttonClasses.femaleCls = 'u-date-width';
        buttonClasses.unspecifiedCls = 'u-date-width button-primary';
    }
    else if (this.genderValue == ''){
        buttonClasses.genderValGrpCls = 'val-err-tooltip';
    }

    return (
        <div className="step step4">
            <div className="row">
                <div className="six">
                    <label className="u-center-width">DATE OF BIRTH</label>
                    <input className="u-date-width required" placeholder="DD"
                            type="number"
                            ref="day"
                            required
                            autoComplete="off"
                            defaultValue={this.state.day}
                            onBlur={this.validationCheck}
                            autoFocus/>
                    <input className="u-date-width required" placeholder="MM"
                            type="number"
                            ref="month"
                            required
                            autoComplete="off"
                            defaultValue={this.state.month}
                            onBlur={this.validationCheck}/>
                    <input className="u-date-width required" placeholder="YYYY"
                            type="number"
                            ref="year"
                            required
                            autoComplete="off"
                            defaultValue={this.state.year}
                            onBlur={this.validationCheck}/>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <div className={notValidClasses.dateValGrpCls}>{this.state.dateValMsg}</div>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <label className="u-center-width">GENDER</label>
                    <button className={buttonClasses.maleCls}
                            onClick={() => this.maleBtn()}
                            autoFocus>MALE</button>
                    <button className={buttonClasses.femaleCls} 
                            onClick={() => this.femaleBtn()}>FEMALE</button>
                    <button className={buttonClasses.unspecifiedCls} 
                            onClick={() => this.unspecifedBtn()}>UNSPECIFED</button>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <div className={buttonClasses.genderValGrpCls}>{this.state.genderValMsg}</div>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <label className="u-center-width">WHERE DID YOU HEAR ABOUT US?</label>
                    <select className="u-full-width selectpicker"
                            onChange={this.handleEmailConfirmChanged} 
                            value={this.state.emailConfirm}>
                        <option>Magazine</option>
                        <option>Social Site</option>
                        <option>Friend</option>
                        <option>Internet</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <hr></hr>
                </div>
            </div>
        </div>
    )
  }
}

