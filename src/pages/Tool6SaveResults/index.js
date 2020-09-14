import React, { useState, useEffect } from 'react';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import roles from "../../data/roles.js"
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';

const Tool6 = props => {
  const history = useHistory();
  const currentStepNo = 6;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress")
  const [proSkills, setproSkills] = useLocalStorage("nesta_pro_skills")
  const [conSkills, setconSkills] = useLocalStorage("nesta_con_skills")
  const [proAttitudes, setproAttitudes] = useLocalStorage("nesta_pro_attitudes")
  const [conAttitudes, setconAttitudes] = useLocalStorage("nesta_con_attitudes")
  const [roleTotals, setRoleTotals] = useState([0,0,0,0,0,0,0,0,0])

  useEffect(() => {
    if(currentStep !== 5) {
      history.push(ROUTES.LANDING);
    } else {
      setCurrentStep(currentStepNo);

      roles.map(role => {
        let array = roleTotals;
        let newTotal = sumRating(role.skillsMapping, role.subSkillsMapping, role.attitudesMapping).toString();
        array[role.id] = newTotal;
        setRoleTotals(array);
      }) 
    }
  }, [currentStep]);

  const sumRating = (skills, subSkills, attitudes) => {
    let total = 0;
    skills.length > 0 && skills.forEach(skill => {
      if(proSkills.includes(skill.toString())) {
        total+= 20;
      } else if(conSkills.includes(skill.toString())) {
        total-= 20;
      } 
    });
    subSkills.length > 0 && subSkills.forEach(skill => {
      if(proSkills.includes(skill.toString())) {
        total+= 10;
      } else if(conSkills.includes(skill.toString())) {
        total-= 10;
      } 
    });
    attitudes.length > 0 && attitudes.forEach(attitudes => {
      if(proAttitudes.includes(attitudes.toString())) {
        total+= 5;
      } else if(conAttitudes.includes(attitudes.toString())) {
        total-= 5;
      } 
    });
    return total;
  } 

  const saveResults = authUser => {
    props.firebase.user(authUser.uid).set({
      username: authUser.username ? authUser.username : "",
      email: authUser.email ? authUser.email : "",
      orgType: authUser.orgType ? authUser.orgType : "", 
      position: authUser.position ? authUser.position : "", 
      location: authUser.location ? authUser.location : "",
      proSkills: JSON.parse(proSkills),
      conSkills: JSON.parse(conSkills),
      proAttitudes: JSON.parse(proAttitudes),
      conAttitudes: JSON.parse(conAttitudes),
      roleTotals: roleTotals
    }).then(() => {
      props.firebase.user(authUser.uid).once('value')
      .then(snapshot => {
        history.push(ROUTES.RESULTS)
      });
    })
  }
  
  return(
    <AuthUserContext.Consumer>
      {authUser => {
        saveResults(authUser)
        return(<p>Loading...</p>)
      }}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(Tool6);
