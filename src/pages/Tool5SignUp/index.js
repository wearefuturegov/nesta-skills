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
import { SignInLink } from '../SignIn';
import Content from '../../components/Content';
import { SecondaryButton } from '../../components/SecondaryButton';

const Section = styled.section`

`

const Tool5 = ({fields}) => {

  const { title, body } = fields;
  const currentStepNo = 5;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const history = useHistory();

  useEffect(() => {
    setCurrentStep(currentStepNo);
  }, []);

  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser && currentStep === 5 ? (
              history.push(ROUTES.SAVERESULTS)
            ) : (
              <>
                <SecondaryButton to={ROUTES.STEP4}>Previous step</SecondaryButton>

                <Section>
                  <h1>{title}</h1>
                  <Content source={body} />
                </Section>
                <Section>
                  <SignUpForm />
                  <br />
                  <SignInLink />
                </Section>
              </>
            )
          }
      </AuthUserContext.Consumer>
    </BodyClassName>

  )
};

export default Tool5;
