import React, { Component, useEffect, useState } from 'react';
import styled from "styled-components"
import * as ROUTES from '../../constants/routes';
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import { AuthUserContext } from '../Session';
import { Link, useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { SignUpForm } from '../SignUp';
import { SignInLink } from '../SignIn';
import Content from '../../components/Content';
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { SignInAnonButton } from '../SignInAnon';

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
    <AuthUserContext.Consumer>
      {authUser =>
        authUser && currentStep === 5 ? (
            history.push(ROUTES.SAVERESULTS)
          ) : (
            <>
              <ButtonSecondary to={ROUTES.STEP4}>Previous step</ButtonSecondary>

              <Section>
                <h1>{title}</h1>
                <Content source={body} />
              </Section>
              <Section>
              
                <SignInAnonButton />
                <br />
                <SignUpForm />
                <br />
                <SignInLink />
              </Section>
            </>
          )
        }
    </AuthUserContext.Consumer>
  )
};

export default Tool5;
