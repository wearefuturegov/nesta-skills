import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useToasts } from 'react-toast-notifications'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import Content from '../../components/Content'

import { CurrentStep } from '../../components/CurrentStep';
import { SkillCard } from "../../components/SkillCard";
import { SkillDot } from "../../components/SkillDot";
import { TrackingBar } from "../../components/TrackingBar";

import { safeJsonParse } from "../../util/utils";

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

const Tool2 = ({fields, skills}) => {

  const { body } = fields;
  const maxSelectionNo = 2;
  const currentStepNo = 2;

  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [storedSkills, setStoredSkills] = useLocalStorage("nesta_pro_skills");
  const [storedWeakness, setStoredWeakness] = useLocalStorage("nesta_con_skills");
  const [chosenSkills, setChosenSkills] = useState(storedWeakness ? safeJsonParse(storedWeakness) : []);
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
        addToast(`You can only select ${maxSelectionNo} skills`, {
          appearance: 'warning',
          autoDismiss: true,
          autoDismissTimeout: 2500
        })
      }
    }
  }
  useEffect(() => {
    setStoredWeakness(JSON.stringify(chosenSkills))
  }, [chosenSkills]);

  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <>
        <CurrentStep step={currentStepNo} max={4} />

        <Content source={body} />   

        <SkillsContainer>
          {skills.map((skill) =>
            safeJsonParse(storedSkills).includes(skill.id) === false &&
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
          type="weakest skills"
          previousLink={ROUTES.STEP1}
          nextLink={ROUTES.STEP3}
        >
          {chosenSkills.map((skillID) =>
            <SkillDot 
              key={skillID} 
              skillID={skillID} 
              skills={skills} 
            />
          )}
        </TrackingBar>
      </>
    </BodyClassName>
  )
};

export default Tool2;
