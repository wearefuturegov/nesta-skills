import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { useLocalStorage } from "../../hooks/useLocalStorage";
import rolesContent from "../../data/roles.js"

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

const ResultsPage = () => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");

  useEffect(() => {
    window.localStorage.setItem("nesta_pro_skills", "");
    window.localStorage.setItem("nesta_con_skills", "");
    window.localStorage.setItem("nesta_pro_attitudes", "");
    window.localStorage.setItem("nesta_con_attitudes", "");
    setCurrentStep(0);
  }, [currentStep]);

  const parseTotals = (array) => {
    let tempArray = [];
    rolesContent.map((role, index) => {
      tempArray = [...tempArray, {
        id: role.id-1,
        total: array[index+1]
      }]
    });
    return tempArray;
  }
  return(
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Results Page{authUser.username && ` - ${authUser.username}`}</h1>

          {parseTotals(authUser.roleTotals).sort((a, b) => (a.total < b.total) ? 1 : -1).map(role => (
            <div>
              <p>{rolesContent[role.id].title}</p>
              <p>{role.total}</p>
            </div>
          ))}
          
        </div>
      )}
    </AuthUserContext.Consumer>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(ResultsPage);
