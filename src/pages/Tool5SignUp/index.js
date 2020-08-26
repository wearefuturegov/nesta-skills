import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';

const Tool5 = () => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");

  useEffect(() => {
    setCurrentStep(5);
  }, [currentStep]);

  return(
    <BodyClassName className="step_5">
      <p></p>
    </BodyClassName>
  )
};

export default Tool5;
