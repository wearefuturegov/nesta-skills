import React from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import BodyClassName from 'react-body-classname';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link, useHistory } from 'react-router-dom';
import Content from '../../components/Content';
import colouredCircles from "./coloured_circles.svg";

import {
  AuthUserContext
} from '../Session';

const MainWrapper = styled.div`
`
const StyledH1 = styled.h1`
  margin-top: 10px;
  line-height: 1.2;

  max-width: 75%;
  font-size: 2rem;
  
  @media screen and (min-width: ${theme.m}){
    max-width: 400px;
    font-size: 2.25rem;
    font-weight: normal;
  }
  @media screen and (min-width: ${theme.l}){
    max-width: 450px;
    font-size: 2.75rem;
  }
`
const StyledH2 = styled.h2`
  line-height: 1.2;
  max-width: 450px;
  margin 0 auto;
  margin-bottom: 15px;
  font-size: 1.75rem;
  
  @media screen and (min-width: ${theme.m}){
    font-weight: normal;
    font-size: 2rem;
  }
`
const LeadP = styled.p`
  font-size: 1.3rem;
  max-width: 90%;

  @media screen and (min-width: ${theme.m}){
    font-size: 1.5rem;
    max-width: 660px;
  }
`

const Section = styled.section`
  margin-bottom: 50px;

  @media screen and (min-width: ${theme.m}){
    margin-bottom: 75px;
  }
`

const CenteredSection = styled(Section)`
  text-align: center;
  p {
    margin: 0 auto;
    margin-bottom: 15px;
  }
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
  margin-right: 0;
  margin-bottom: ${theme.standardSpace}px;
  display: block;

  &:focus {
    color: ${theme.black};
  }

  @media screen and (min-width: ${theme.m}){
    margin-bottom: 0px;
    display: inline-block;
    margin-right: ${theme.standardSpace}px;
  }
`
const Circles = styled.img`
  position: absolute;
  width: 400px;
  height: auto;
  top: 0px;
  right: 0;
  z-index: -1;
  opacity: 0.6;
  @media screen and (min-width: ${theme.m}){
    width: 700px;
  }
  @media screen and (min-width: ${theme.l}){
    width: 1000px;
  }
`

const Landing = ({verified = false, fields}) => {
  const { _1_strapline, _2_paragraph_1, _3_sub_title, _4_paragraph_2, _5_sub_title_2, _6_paragraph_3 } = fields;
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
      <>
      <Circles src={colouredCircles} alt="" />
      <MainWrapper role="main">
        <Section>
          <StyledH1>{_1_strapline}</StyledH1>
          <LeadP>
            <Content source={_2_paragraph_1} />
          </LeadP>
        </Section>
        
        <br />

        <CenteredSection>
          <StyledH2>{_3_sub_title}</StyledH2>
          <LeadP>
            <Content source={_4_paragraph_2} />
          </LeadP>

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
        </CenteredSection>
        <CenteredSection>
          <StyledH2>{_5_sub_title_2}</StyledH2>
          <LeadP>
            <Content source={_6_paragraph_3} />
          </LeadP>
          <CirclesContainer>
            <Circle>
              <CircleTitle>Learn</CircleTitle>
              <CircleText>more about the skills and attitudes</CircleText>
            </Circle>
            <Circle>
              <CircleTitle>Explore</CircleTitle>
              <CircleText>about your own skills and attitudes</CircleText>
            </Circle>
            <Circle>
              <CircleTitle>Build</CircleTitle>
              <CircleText>a picture of your team’s skills and attitudes</CircleText>
            </Circle>
          </CirclesContainer>
        </CenteredSection>
      </MainWrapper>
      </>
    </BodyClassName>
  )
};

export default Landing;