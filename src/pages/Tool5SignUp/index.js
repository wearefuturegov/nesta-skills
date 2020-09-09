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
  const Step5Content = withFirebase(Step5ContentGenerate);
  const history = useHistory();

  useEffect(() => {
    setCurrentStep(currentStepNo);
  }, [currentStep]);

  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
              history.push(ROUTES.SAVERESULTS)
            ) : (
              <>
                <Link to={ROUTES.STEP4}>Previous step</Link>

                <Step5Content currentStep={currentStepNo} />
              </>
            )
          }
      </AuthUserContext.Consumer>
    </BodyClassName>

  )
};

export default Tool5;


class Step5ContentGenerate extends Component {
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

    this.props.firebase.step5Content().on('value', snapshot => {
      const dataObject = snapshot.val();

      this.setState({
        data: dataObject,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.step5Content().off();
  }

  render() {
    const { data, loading, currentStep } = this.state;

    return (
      loading ? 
        <div>Loading ...</div>
        :
        <>
          <Section>
            <h1>{data._1_heading}</h1>
            <p>{data._2_paragraph_1}</p>
            <p>{data._3_paragraph_2}</p>
            <p>{data._4_paragraph_3}</p>
          </Section>
          <Section>
            <SignUpForm />
          </Section>
        </>
    );
  }
}