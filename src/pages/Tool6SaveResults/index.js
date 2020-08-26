import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  proSkills: window.localStorage.getItem("nesta_pro_skills"),
  conSkills: window.localStorage.getItem("nesta_con_skills"),
  proAttributes: window.localStorage.getItem("nesta_pro_attributes"),
  conAttributes: window.localStorage.getItem("nesta_con_attributes")
};

class Tool6 extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    // ***** CURRENTLY HERE - need to automatically ocme to this page if signed in, or for sign up/sign in on the last page if not
    // change this to a loading screen - once its done move to results page
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  saveResults = authUser => {
    this.props.firebase.user(authUser.uid).set({
      username: authUser.username ? authUser.username : "",
      email: authUser.email ? authUser.email : "",
      roles: authUser.roles ? authUser.roles : "",
      orgType: authUser.orgType ? authUser.orgType : "", 
      position: authUser.position ? authUser.position : "", 
      location: authUser.location ? authUser.location : "",
      proSkills: JSON.parse(JSON.parse(this.state.proSkills)),
      conSkills: JSON.parse(JSON.parse(this.state.proSkills)),
      proAttributes: JSON.parse(JSON.parse(this.state.proAttributes)),
      conAttributes: JSON.parse(JSON.parse(this.state.proAttributes))
    });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {this.saveResults(authUser)}
            <h1>Save results</h1>
            <p>pro skills: {JSON.parse(this.state.proSkills)}</p>
            <p>con skills: {JSON.parse(this.state.conSkills)}</p>
            <p>pro Attributes: {JSON.parse(this.state.proAttributes)}</p>
            <p>con Attributes: {JSON.parse(this.state.conAttributes)}</p>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(Tool6);
