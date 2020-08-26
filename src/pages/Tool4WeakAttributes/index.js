import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useToasts } from 'react-toast-notifications'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import attributes from "../../data/attributes.js"

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

const Tool4 = () => {
  const maxSelectionNo = 1;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [proAttributes, setProAttributes] = useLocalStorage("nesta_pro_attributes");
  const [conAttributes, setConAttributes] = useLocalStorage("nesta_con_attributes");
  
  const [chosenSkills, setChosenSkills] = useState(conAttributes ? JSON.parse(conAttributes) : []);
  const { addToast } = useToasts()

  useEffect(() => {
    setCurrentStep(4);
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
        addToast(`You can only select ${maxSelectionNo} skills`, {
          appearance: 'warning',
          autoDismiss: true,
          autoDismissTimeout: 2500
        })
      }
    }
  }
  useEffect(() => {
    setConAttributes(JSON.stringify(chosenSkills))
  }, [chosenSkills]);

  return(
    <BodyClassName className="step_4">
      <>
        <p>Now select the <strong>one attitude</strong> that you think your colleagues would be <strong>least likely to use to describe you.</strong></p>
        
        <SkillsContainer>
          {attributes.map((skill) =>
            JSON.parse(proAttributes).includes(skill.id) === false &&
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
              skills={attributes} 
            />
          )}
        </TrackingBar>
      </>
    </BodyClassName>
  )
};

export default Tool4;
