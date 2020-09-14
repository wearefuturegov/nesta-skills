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

const Tool1 = () => {
  const maxSelectionNo = 5;
  const currentStepNo = 1;

  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [storedSkills, setStoredSkills] = useLocalStorage("nesta_pro_skills");
  const [chosenSkills, setChosenSkills] = useState(storedSkills ? JSON.parse(storedSkills) : []);
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
    setStoredSkills(JSON.stringify(chosenSkills))
  }, [chosenSkills]);


  return(
    <BodyClassName className={`step_${currentStepNo}`}>
      <>
        <CurrentStep step={currentStepNo} max={4} />

        <p>Let’s try and build up a picture of your skills so we can understand:</p>
        <ul>
          <li>what strengths you bring to a team</li>
          <li>what type of role this might mean you play in a team</li>
          <li>what your areas for development could be</li>
        </ul>
        <p>Look through each of the cards below and <strong>select the five</strong> which you think your colleagues would use to describe <strong>your strongest skills</strong> out of the 13 below.</p>    

        <SkillsContainer>
          {skills.map((skill) =>
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
          type="strongest skills"
          previousLink={ROUTES.START}
          nextLink={ROUTES.STEP2}
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

export default Tool1;
