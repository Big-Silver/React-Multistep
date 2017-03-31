'use strict';

import React, { Component, PropTypes } from 'react';
import Promise from 'promise';

export default class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false
    };

    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // This review screen had the 'Save' button, on clicking this is called
  isValidated() {

    this.setState({
      saving: true
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          saving: true
        });

        this.props.updateStore({savedToCloud: true});  // Update store here (this is just an example, in reality you will do it via redux or flux)

        // call resolve() to indicate that server validation or other aync method was a success.
        // ... only then will it move to the next step. reject() will indicate a fail
        resolve();
        // reject(); // or reject
      }, 5000);
    });
  }

  jumpToStep(toStep) {
    // We can explicitly move to a step (we -1 as its a zero based index)
    this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
  }

  showValue() {
    console.log("Email: "+this.props.getStore().email+", Password: "+this.props.getStore().password+", Date: "+this.props.getStore().day+
    "/"+this.props.getStore().month+"/"+this.props.getStore().year+", Gender: "+this.props.getStore().gender);
  }

  render() {
    const savingCls = this.state.saving ? 'saving col-md-12 show' : 'saving col-md-12 hide';

    return (
      <div className="step step5 review">
        <div className="row_dashimg">
                <img className="u-confirm" src="../img/confirm_mark.png"></img>
            </div>
            <div className="row_godash">
                <div className="six">
                    <button onClick={() => this.showValue()}>Go to Dashboard-></button>
                </div>
            </div>
      </div>
    )
  }
}
