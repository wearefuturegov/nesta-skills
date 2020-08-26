import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import BodyClassName from 'react-body-classname';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from 'react-router-dom';

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
`

const Landing = () => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");

  return(
    <BodyClassName className="landing_page">
      <MainWrapper role="main">
        <Section>
          <h1>Building the next generation of public innovation</h1>
          <LeadP>Across the globe, government teams are pioneering new ways of working. States of Change is a collective that exists to support this growing global movement.</LeadP>
        </Section>

        <Section>
          <h2>Nesta’s Competency Framework</h2>
          <LeadP>Innovation in the public sector often focuses on learning new methods. These are of course valuable, but we’ve found that on their own they are not enough. We also need to understand the core set of attitudes and skills that underpin and support these methods.</LeadP>
          {currentStep > 0 ? 
            <>
              <p>It looks like you have already started</p>
              <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
              <Button to={`/step_${currentStep}`} background={theme.red}>Continue</Button>
            </>
            :
            <Button to={ROUTES.START} background={theme.red}>Get started</Button>
          }
        </Section>

        <Section>
          <h2>You can use this interactive app to help you</h2>
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
