'use strict';

import React, { Component, PropTypes } from 'react';
import StepZilla from '../main'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      email: '',      
      password: '',
      gender: '',
      day: '',
      month: '',
      year: '',
      savedToCloud: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  render() {
    const steps =
    [
      {name: 'Signup',     component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Signup',     component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Thank you!', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
    ]

    return (
      <div className='example'>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            hocValidationAppliedTo={[3]}
             />
        </div>
      </div>
    )
  }
}
