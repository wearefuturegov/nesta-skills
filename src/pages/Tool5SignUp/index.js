import React, { Component, useEffect, useState } from 'react';
import styled from "styled-components"
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import { AuthUserContext } from '../Session';
import { Link, useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { SignUpForm } from '../SignUp';

const Section = styled.section`

`

const Tool5 = () => {
  const currentStepNo = 5;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const history = useHistory();

  useEffect(() => {
    setCurrentStep(currentStepNo);
  }, [currentStep]);

  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser && currentStep === 5 ? (
              history.push(ROUTES.SAVERESULTS)
            ) : (
              <>
                <Link to={ROUTES.STEP4}>Previous step</Link>
                <Section>
                  <h1>You're almost finished!</h1>
                  <p>Before you see your results, we'd like to find out a little more information about you and set you up with an account so you can come back and view your results any time.</p>
                  <p>Collecting this information helps us to make your results more meaningful, but also adds to our research on the current position of skills and attitudes within the sector so we can best support it.</p>
                  <p>Most fields are not mandatory but we'd be grateful for your participation.</p>
                </Section>
                <Section>
                  <SignUpForm />
                </Section>
              </>
            )
          }
      </AuthUserContext.Consumer>
    </BodyClassName>

  )
};

export default Tool5;
