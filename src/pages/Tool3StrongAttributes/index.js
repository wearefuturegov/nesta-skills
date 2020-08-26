import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useToasts } from 'react-toast-notifications'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import attributes from "../../data/attributes.js"

import { CurrentStep } from '../../components/CurrentStep';
import { SkillCard } from "../../components/SkillCard";
import { SkillDot } from "../../components/SkillDot";
import { TrackingBar } from "../../components/TrackingBar";

const SkillsContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${theme.standardSpace}px;
`

const Tool3 = () => {
  const maxSelectionNo = 3;
  const currentStepNo = 3;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [proAttributes, setProAttributes] = useLocalStorage("nesta_pro_attributes");
  const [chosenSkills, setChosenSkills] = useState(proAttributes ? JSON.parse(proAttributes) : []);
  const { addToast } = useToasts()

  useEffect(() => {
    setCurrentStep(currentStepNo);
  }, [currentStep]);

  function selectSkill(skill) {
    if(chosenSkills.includes(skill.id)) {
        setChosenSkills(chosenSkills => chosenSkills.filter(item => item !== skill.id));
    } else {
      if(chosenSkills.length < maxSelectionNo) {
        setChosenSkills([
            ...chosenSkills,
            skill.id
        ]);
      } else {
        addToast(`You can only select ${maxSelectionNo} attributes`, {
          appearance: 'warning',
          autoDismiss: true,
          autoDismissTimeout: 2500
        })
      }
    }
  }
  useEffect(() => {
    setProAttributes(JSON.stringify(chosenSkills))
  }, [chosenSkills]);

  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <>
        <CurrentStep step={currentStepNo} max={4} />

        <p>In addition to skills, our research identified nine <strong>key attitudes</strong> that support successful experimentation and problem solving. These differ from skills in that you will have formed them over a greater period of time and they are more difficult to change or develop.</p>
        
        <p>Select the <strong>three attitudes</strong> that you think your colleagues would <strong>most likely use to describe you.</strong></p>    

        <SkillsContainer>
          {attributes.map((skill) =>
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              chosenSkills={chosenSkills} 
              selectSkill={selectSkill} 
              maxSelectionNo={maxSelectionNo} 
            />
          )}
        </SkillsContainer>

        <TrackingBar 
          maxSelectionNo={maxSelectionNo}
          chosenSkills={chosenSkills} 
          type="best attributes"
          previousLink={ROUTES.STEP2}
          nextLink={ROUTES.STEP4}
        >
          {chosenSkills.map((skillID) =>
            <SkillDot 
              key={skillID} 
              skillID={skillID} 
              skills={attributes} 
            />
          )}
        </TrackingBar>
      </>
    </BodyClassName>
  )
};

export default Tool3;
