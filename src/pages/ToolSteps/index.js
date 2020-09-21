import React, { useEffect, useState, useRef } from 'react';
import useLocalStorage from "../../hooks/useLocalStorage";

// steps page bits
import BodyClassName from 'react-body-classname';
import CurrentStep from '../../components/CurrentStep';
import { SkillCard, SkillsContainer } from "../../components/SkillCard";
import { useToasts } from 'react-toast-notifications'
import { SkillDot } from "../../components/SkillDot";
import { TrackingBar } from "../../components/TrackingBar";

// get page content from 'CMS'
import { getDocument, getDocuments } from './../../util/cms-utils'
import Content from '../../components/Content'
import { test } from 'gray-matter';

const stepsLogic = (currentStep) => {

  let collection  = '';
  let maxSelectionNo = 0;

  switch (currentStep) {
    case 1:
      collection = '01-strong-skills';
      maxSelectionNo = 5;
      break;
    case 2:
      collection = '02-weak-skills';
      maxSelectionNo = 2;
      break;
    case 3:
      collection = '03-strong-attitudes';
      maxSelectionNo = 3;
      break;
    case 4:
      collection = '04-weak-attitudes';
      maxSelectionNo = 1;
      break;
  
    default:
      break;
  }

  return {
    collection, 
    maxSelectionNo
  }
}


const ToolSteps = () => {
    const { addToast } = useToasts()
    const skills = getDocuments('skills');
    const attitudes = getDocuments('attitudes');

    
    // setup storage
    const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");

    // cms stuff
    const [maxSelectionNo, setMaxSelectionNo] = useState(0);
    const [collection, setCollection] = useState('');
    const [pageContent, setPageContent] = useState('');


    // initial component load set current step and cms details
    useEffect(() => {
        if(currentStep) {
          let {collection, maxSelectionNo} = stepsLogic(1);
          let pageContent = getDocument('pages', collection);
          setCurrentStep(1);
          setCollection(collection);
          setMaxSelectionNo(maxSelectionNo)
          setPageContent(pageContent);
        }
    }, []);


    // when current step is updated update the content
    useEffect(() => {
      console.log('when current step is updated')
      // update the cms stuff      
      let {collection, maxSelectionNo} = stepsLogic(currentStep);
      let pageContent = getDocument('pages', collection);
      setCollection(collection);
      setMaxSelectionNo(maxSelectionNo)
      setPageContent(pageContent);

      // update the available skills or attitudes
  }, [currentStep]);


  

 
  

    // used when selecting skills
    const [storedSkills, setStoredSkills] = useLocalStorage("nesta_pro_skills");
    const [chosenSkills, setChosenSkills] = useState(storedSkills ? JSON.parse(storedSkills) : []);


 

    const previousStep = currentStep - 1;
    const nextStep = currentStep + 1;

    const selectSkill = (skill) => {
      console.log('selectSkill', skill)
      console.log('chosenSkills', chosenSkills);
      if(chosenSkills.includes(skill.id)) {
          //deselected
          setChosenSkills(chosenSkills => chosenSkills.filter(item => item !== skill.id));
      } else {
        if(chosenSkills.length < maxSelectionNo) {
          //selected
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

      console.log(storedSkills)
    }

    // initialise stored skills
    useEffect(() => {
      setStoredSkills([])
    }, []);


    // update local storage when we've chosen skills
    useEffect(() => {
      setStoredSkills(JSON.stringify(chosenSkills))
    }, [chosenSkills]);


 

    // updates the current step
    const updateStep = (type) => {
      var newStep = (type === 'increase') ? currentStep + 1 : currentStep - 1; 
      setCurrentStep(newStep);
    }
    




  return(
    <BodyClassName className={`step_${currentStep}`}>
      <>
       <CurrentStep step={currentStep} max={4} />

        <Content source={pageContent.body} />


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
          type="strongest skills"
          previousLink={previousStep}
          nextLink={nextStep}
          clickAction={updateStep}
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
}


export default ToolSteps;
