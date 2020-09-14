import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useToasts } from 'react-toast-notifications'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import skills from "../../data/skills.js"

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

const Tool2 = () => {
  const maxSelectionNo = 2;
  const currentStepNo = 2;

  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [storedSkills, setStoredSkills] = useLocalStorage("nesta_pro_skills");
  const [storedWeakness, setStoredWeakness] = useLocalStorage("nesta_con_skills");
  const [chosenSkills, setChosenSkills] = useState(storedWeakness ? JSON.parse(storedWeakness) : []);
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

        <p>Now select the <strong>two cards</strong> which you or your colleagues might use to describe your <strong>least strong</strong> or <strong>least well-practiced skills.</strong></p>
        
        <p>Remember that having less strong skills isn’t a negative thing, as no one person could have all of these skills.</p>    

        <SkillsContainer>
          {skills.map((skill) =>
            JSON.parse(storedSkills).includes(skill.id) === false &&
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
