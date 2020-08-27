import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { useLocalStorage } from "../../hooks/useLocalStorage";

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

  return(
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Results Page{authUser.username && ` - ${authUser.username}`}</h1>

          <p>This Page is accessible only by signed in users.</p>
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
