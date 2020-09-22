import React, { useState, useEffect } from 'react';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { safeJsonParse } from "../../util/utils";

import {
  AuthUserContext,
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';

const Tool6 = props => {
  const rolesContent = props.rolesContent;

  const history = useHistory();
  const currentStepNo = 6;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress")
  const [proSkills, setproSkills] = useLocalStorage("nesta_pro_skills")
  const [conSkills, setconSkills] = useLocalStorage("nesta_con_skills")
  const [proAttitudes, setproAttitudes] = useLocalStorage("nesta_pro_attitudes")
  const [conAttitudes, setconAttitudes] = useLocalStorage("nesta_con_attitudes")
  const [roleTotals, setRoleTotals] = useState([1,0,0,0,0,0,0,0,0])
  const [activate, setActivate] = useState(false)

  useEffect(() => {
    if(currentStep !== 5) {
      history.push(ROUTES.LANDING);
    }
  }, []);

  useEffect(() => {
    setCurrentStep(currentStepNo);

    rolesContent.map((role, index) => {
      let array = roleTotals;
      let newTotal = sumRating(role.skillsMapping, role.subSkillsMapping, role.attitudesMapping).toString();
      array[role.id] = newTotal;
      
      if(index === 8) {
        array[0] = 0;
        setRoleTotals(array);
      }
    }) 
  }, [activate]);

  const sumRating = (skills, subSkills, attitudes) => {
    skills = (skills === null) ? [] : skills;
    subSkills = (subSkills === null) ? [] : subSkills;
    attitudes = (attitudes === null) ? [] : attitudes;

    let total = 0;
    skills.length > 0 && skills.forEach(skill => {
      if(proSkills.includes(skill.toString())) {
        // console.log(`skill ${skill} is positive`)
        total+= 20;
      } else if(conSkills.includes(skill.toString())) {
        // console.log(`skill ${skill} is negative`)
        total-= 20;
      } 
    });
    subSkills.length > 0 && subSkills.forEach(skill => {
      if(proSkills.includes(skill.toString())) {
        // console.log(`sub skill ${skill} is positive`)
        total+= 10;
      } else if(conSkills.includes(skill.toString())) {
        // console.log(`sub skill ${skill} is negative`)
        total-= 10;
      } 
    });
    attitudes.length > 0 && attitudes.forEach(attitude => {
      if(proAttitudes.includes(attitude.toString())) {
        // console.log(`attitude ${attitude} is positive`)
        total+= 5;
      } else if(conAttitudes.includes(attitude.toString())) {
        // console.log(`attitude ${attitude} is negative`)
        total-= 5;
      } 
    });
    return total;
  } 

  const saveResults = authUser => {
    console.log('proSkills', proSkills);
    console.log('conSkills', conSkills);
    console.log('proAttitudes', proAttitudes);
    console.log('conAttitudes', conAttitudes);
    console.log('roleTotals', roleTotals);

    if(roleTotals[0] === 0) {
      console.log('saveResults', authUser);
      
      props.firebase.user(authUser.uid).set({
        username: authUser.username ? authUser.username : "",
        email: authUser.email ? authUser.email : "",
        orgType: authUser.orgType ? authUser.orgType : "", 
        position: authUser.position ? authUser.position : "", 
        location: authUser.location ? authUser.location : "",
        proSkills: safeJsonParse(proSkills),
        conSkills: safeJsonParse(conSkills),
        proAttitudes: safeJsonParse(proAttitudes),
        conAttitudes: safeJsonParse(conAttitudes),
        roleTotals: roleTotals,
        isAnonymous: authUser.isAnonymous ? authUser.isAnonymous : ""
      }).then(() => {
        props.firebase.user(authUser.uid).once('value')
        .then(snapshot => {
          console.log('snapshot', snapshot)
          setTimeout(function() {
            history.push(ROUTES.RESULTS)
          }.bind(this), 1000)
        });
      })
    }
  }
  
  return(
    <AuthUserContext.Consumer>
      {authUser => {
        setActivate(true)
        saveResults(authUser)
        return(<p>Loading...</p>)
      }}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(Tool6);
