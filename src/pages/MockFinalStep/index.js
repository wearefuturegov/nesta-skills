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
import Content from '../../components/Content'

const Section = styled.section`

`


// this is to save steping through everything 100 times!
// set localstorage vars to what we would have created up till this point

const MockFinalStep = ({fields}) => {

  const { title, body } = fields;
  const currentStepNo = 5;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const history = useHistory();

  useEffect(() => {
    setCurrentStep(currentStepNo);
    window.localStorage.setItem("nesta_pro_skills", "[1,2,3,6,5]");
    window.localStorage.setItem("nesta_con_skills", "[11,10]");
    window.localStorage.setItem("nesta_pro_attitudes", "[6,5,4]");
    window.localStorage.setItem("nesta_con_attitudes", "[9]");


  }, []);

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

export default MockFinalStep;
