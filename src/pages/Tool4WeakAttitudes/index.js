import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useToasts } from 'react-toast-notifications'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import Content from '../../components/Content'

import  CurrentStep  from '../../components/CurrentStep';
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

const Tool4 = ({fields, attitudes}) => {

  const { body } = fields;
  const maxSelectionNo = 1;
  const currentStepNo = 4;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [proAttitudes, setProAttitudes] = useLocalStorage("nesta_pro_attitudes");
  const [conAttitudes, setConAttitudes] = useLocalStorage("nesta_con_attitudes");
  
  const [chosenSkills, setChosenSkills] = useState(conAttitudes ? JSON.parse(conAttitudes) : []);
  const { addToast } = useToasts()

  useEffect(() => {
    setCurrentStep(currentStepNo);
  }, []);

  useEffect(() => {
    if(chosenSkills.length === maxSelectionNo) {
      setCurrentStep(currentStepNo + 1);
    }
  }, [chosenSkills]);

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
        addToast(`You can only select ${maxSelectionNo} attribute`, {
          appearance: 'warning',
          autoDismiss: true,
          autoDismissTimeout: 2500
        })
      }
    }
  }
  useEffect(() => {
    setConAttitudes(JSON.stringify(chosenSkills))
  }, [chosenSkills]);

  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <>
        <CurrentStep step={currentStepNo} max={4} />

        <Content source={body} />

        
        <SkillsContainer>
          {attitudes.map((skill) =>
            JSON.parse(proAttitudes).includes(skill.id) === false &&
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
          type="weak attribute"
          previousLink={ROUTES.STEP3}
          nextLink={ROUTES.STEP5}
        >
          {chosenSkills.map((skillID) =>
            <SkillDot 
              key={skillID} 
              skillID={skillID} 
              skills={attitudes} 
            />
          )}
        </TrackingBar>
      </>
    </BodyClassName>
  )
};

export default Tool4;
