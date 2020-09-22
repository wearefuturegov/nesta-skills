import React from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import BodyClassName from 'react-body-classname';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link, useHistory } from 'react-router-dom';

import {
  AuthUserContext
} from '../Session';

const MainWrapper = styled.div`
`

const LeadP = styled.p`
  font-size: 1.5rem;
`

const Section = styled.section`

`

const CirclesContainer = styled.div`

`
const Circle = styled.div`

`
const CircleTitle = styled.h3`

`
const CircleText = styled.p`

`

const RestartLink = styled(Link)`
  color: ${theme.white};
  margin-right: ${theme.standardSpace}px;

  &:focus {
    color: ${theme.black};
  }
`

const Landing = ({verified = false, fields}) => {
  const { _1_strapline, _2_paragraph_1, _3_sub_title, _4_paragraph_2, _5_sub_title_2 } = fields;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const history = useHistory();

  if(verified) {
    console.log('landing page verified: ', verified)
    if(currentStep === 5) {
      history.push(ROUTES.SAVERESULTS);
    } else {
      history.push(ROUTES.LANDING);
    }
  }
  return(
    <BodyClassName className="landing_page">
      <MainWrapper role="main">
        <Section>
          <h1>{_1_strapline}</h1>
          <LeadP>{_2_paragraph_1}</LeadP>
        </Section>
        <Section>
          <h2>{_3_sub_title}</h2>
          <LeadP>{_4_paragraph_2}</LeadP>

          <AuthUserContext.Consumer>
            {authUser => (
              authUser ?
                <div>
                  {authUser.username && authUser.username !== "anonymous" && <h2>{`Welcome - ${authUser.username}`}</h2>}
                  {authUser.roleTotals || currentStep === 6 ?
                    <>
                      <p>You have already completed this app.</p>
                      <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
                      <Button to={`/results`} background={theme.accessibleRed}>View your results</Button>
                    </>
                    :
                    currentStep > 0 ? 
                      <>
                        <p>It looks like you have already started</p>
                        <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
                        <Button to={`/step_${currentStep}`} background={theme.accessibleRed}>Continue</Button>
                      </>
                      :
                      <Button to={ROUTES.START} background={theme.accessibleRed}>Get started</Button>
                  }
                </div>
                :
                currentStep > 0 ? 
                  <>
                    <p>It looks like you have already started</p>
                    <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
                    <Button to={`/step_${currentStep}`} background={theme.accessibleRed}>Continue</Button>
                  </>
                  :
                  <Button to={ROUTES.START} background={theme.accessibleRed}>Get started</Button>
            )}
          </AuthUserContext.Consumer>

        </Section>
        <Section>
          <h2>{_5_sub_title_2}</h2>
          <CirclesContainer>
            <Circle>
              <CircleTitle>Learn</CircleTitle>
              <CircleText>more about the skills and attitudes</CircleText>
            </Circle>
            <Circle>
              <CircleTitle>Exmplore</CircleTitle>
              <CircleText>about your own skills and attitudes</CircleText>
            </Circle>
            <Circle>
              <CircleTitle>Build</CircleTitle>
              <CircleText>a picture of your team’s skills and attitudes</CircleText>
            </Circle>
          </CirclesContainer>
        </Section>
      </MainWrapper>
    </BodyClassName>
  )
};

export default Landing;