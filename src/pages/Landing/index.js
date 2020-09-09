import React, { useEffect, useState, Component } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import BodyClassName from 'react-body-classname';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';

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
`

const Landing = ({verified = false}) => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const LandingContent = withFirebase(LandingContentGenerate);
  const history = useHistory();

  if(verified) {
    if(currentStep === 5) {
      history.push(ROUTES.SAVERESULTS);
    } else {
      history.push(ROUTES.LANDING);
    }
  }
  return(
    <BodyClassName className="landing_page">
      <MainWrapper role="main">
        <LandingContent currentStep={currentStep} />
      </MainWrapper>
    </BodyClassName>
  )
};

export default Landing;


class LandingContentGenerate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      currentStep: props.currentStep
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.flameLink().on('value', snapshot => {
      const dataObject = snapshot.val();

      console.log(dataObject)
      this.setState({
        data: dataObject,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.flameLink().off();
  }

  render() {
    const { data, loading, currentStep } = this.state;

    return (
      loading ? 
        <div>Loading ...</div>
        :
        <>
        <Section> 
          <h1>{data['1Strapline']}</h1>
          {/* <LeadP>{data._2_paragraph_1}</LeadP> */}
        </Section>
        {/* <Section>
          <h2>{data._3_sub_title}</h2>
          <LeadP>{data._4_paragraph_2}</LeadP>

          <AuthUserContext.Consumer>
            {authUser => (
              authUser ?
                <div>
                  <h1>{authUser.username && `Welcome - ${authUser.username}`}</h1>

                  {authUser.roleTotals && authUser.roleTotals.length > 0 ?
                    <>
                      <p>You have already completed this app.</p>
                      <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
                      <Button to={`/results`} background={theme.red}>View your results</Button>
                    </>
                    :
                    currentStep > 0 ? 
                      <>
                        <p>It looks like you have already started</p>
                        <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
                        <Button to={`/step_${currentStep}`} background={theme.red}>Continue</Button>
                      </>
                      :
                      <Button to={ROUTES.START} background={theme.red}>Get started</Button>
                  }
                </div>
                :
                currentStep > 0 ? 
                  <>
                    <p>It looks like you have already started</p>
                    <RestartLink to={ROUTES.RESTART}>Start again</RestartLink>
                    <Button to={`/step_${currentStep}`} background={theme.red}>Continue</Button>
                  </>
                  :
                  <Button to={ROUTES.START} background={theme.red}>Get started</Button>
            )}
          </AuthUserContext.Consumer>

        </Section>

        <Section>
          <h2>{data._5_sub_title_2}</h2>
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
        </Section> */}
        </>
    );
  }
}