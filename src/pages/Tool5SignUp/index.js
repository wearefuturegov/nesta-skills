import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';

const Tool5 = () => {
  const currentStepNo = 5;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");

  useEffect(() => {
    setCurrentStep(5);
  }, [currentStep]);

  return(
    <BodyClassName className="step_5">
      <>
        <Link to={ROUTES.STEP4}>Previous step</Link>

        <h1>You're almost finished!</h1>
        <p>Before you see your results, we'd like to find out a little more information about you and set you up with an account so you can come back and view your results any time.</p>

        <p>Collecting this information helps us to make your results more meaningful, but also adds to our research on the current position of skills and attitudes within the sector so we can best support it.</p>

        <p>Most fields are not mandatory but we'd be grateful for your participation.</p>

        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <strong>If logged in skip this step? as we already have the data? then just save the data we have to finish the test</strong>
            ) : (
              <strong>If not logged in then replace this page with a sign up form and increase the data captured at sign up. conditionally add this extra text to the top of the sign up form too.</strong>
            )
          }
        </AuthUserContext.Consumer>
      </>
    </BodyClassName>
  )
};

export default Tool5;
