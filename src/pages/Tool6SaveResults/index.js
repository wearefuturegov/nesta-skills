import React, { Component } from 'react';
import { compose } from 'recompose';
import roles from "../../data/roles.js"
import { useHistory } from "react-router-dom";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  proSkills: window.localStorage.getItem("nesta_pro_skills") && JSON.parse(JSON.parse(window.localStorage.getItem("nesta_pro_skills"))),
  conSkills: window.localStorage.getItem("nesta_con_skills") && JSON.parse(JSON.parse(window.localStorage.getItem("nesta_con_skills"))),
  proAttitudes: window.localStorage.getItem("nesta_pro_attitudes") && JSON.parse(JSON.parse(window.localStorage.getItem("nesta_pro_attitudes"))),
  conAttitudes: window.localStorage.getItem("nesta_con_attitudes") && JSON.parse(JSON.parse(window.localStorage.getItem("nesta_con_attitudes"))),
  roleTotals: [0,0,0,0,0,0,0,0,0]
};

class Tool6 extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    // ***** CURRENTLY HERE - need to automatically ocme to this page if signed in, or for sign up/sign in on the last page if not
    // change this to a loading screen - once its done move to results 
    roles.map(role => {
      let a = this.state.roleTotals;
      a[role.id] = this.sumRating(role.skillsMapping, role.subSkillsMapping, role.attitudesMapping).toString();
      this.setState({ roleTotals: a });
    })
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
      proSkills: this.state.proSkills,
      conSkills: this.state.proSkills,
      proAttitudes: this.state.proAttitudes,
      conAttitudes: this.state.conAttitudes,
      roleTotals: this.state.roleTotals
    }).then(() => {
      this.props.firebase.user(authUser.uid).once('value')
      .then(snapshot => {
        this.props.history.push('results')
      });
    })
  }

  sumRating = (skills, subSkills, attitudes) => {
    let total = 0;
    skills.length > 0 && skills.forEach(skill => {
      if(this.state.proSkills.includes(skill.toString())) {
        total+= 20;
      } else if(this.state.conSkills.includes(skill.toString())) {
        total-= 20;
      } 
    });
    subSkills.length > 0 && subSkills.forEach(skill => {
      if(this.state.proSkills.includes(skill.toString())) {
        total+= 10;
      } else if(this.state.conSkills.includes(skill.toString())) {
        total-= 10;
      } 
    });
    attitudes.length > 0 && attitudes.forEach(attitudes => {
      if(this.state.proAttitudes.includes(attitudes.toString())) {
        total+= 5;
      } else if(this.state.conAttitudes.includes(attitudes.toString())) {
        total-= 5;
      } 
    });
    return total;
  } 

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {this.saveResults(authUser)}
            <p>loading</p> 
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