import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BodyClassName from 'react-body-classname';
import skills from "../../data/skills.js"

import { SkillCard } from "../../components/SkillCard";

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
  const [startedTest, setStartedTest] = useLocalStorage("nesta_test_started");
  const [chosenSkills, setChosenSkills] = useState([]);

  useEffect(() => {
    setStartedTest(1);
  }, [startedTest]);

  function selectSkill(skill) {
    if(chosenSkills.includes(skill.id)) {
        setChosenSkills(chosenSkills => chosenSkills.filter(item => item !== skill.id));
    } else {
      if(chosenSkills.length < 5) {
        setChosenSkills([
            ...chosenSkills,
            skill.id
        ]);
      }
    }
  }
  useEffect(() => {
    console.log(chosenSkills)
  }, [chosenSkills]);


  return(
    <BodyClassName className="step_1">
      <>
        <p>Let’s try and build up a picture of your skills so we can understand:</p>
        <ul>
          <li>what strengths you bring to a team</li>
          <li>what type of role this might mean you play in a team</li>
          <li>what your areas for development could be</li>
        </ul>
        <p>Look through each of the cards below and <strong>select the five</strong> which you think your colleagues would use to describe <strong>your strongest skills</strong> out of the 13 below.</p>    

        <SkillsContainer>
          {skills.map((skill) =>
            <SkillCard key={skill.id} skill={skill} chosenSkills={chosenSkills} selectSkill={selectSkill} />
          )}
        </SkillsContainer>
      </>  
    </BodyClassName>
  )
};

export default Tool1;
