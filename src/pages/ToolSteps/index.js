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
        const [pageContent, setPageContent] = useState({body: ''});


        // initial component load set current step
        useEffect(() => {
              let {collection, maxSelectionNo} = stepsLogic(1);
              let pageContent = getDocument('pages', collection);
              setCurrentStep((currentStep > 1 || currentStep <= 4) ? currentStep : 1);

              console.log('chooseWhichChosenSkillsToLoad()', chooseWhichChosenSkillsToLoad(1))
              setChosenSkills(chooseWhichChosenSkillsToLoad(1))
              // setCollection(collection);
              // setMaxSelectionNo(maxSelectionNo)

              // console.log(pageContent)
              // setPageContent(pageContent);
        }, []);


        // when current step is updated update the content 
        useEffect(() => {

          console.log('currentStep updated1', currentStep)
          if(currentStep) {
          // update the cms stuff      
          let {collection, maxSelectionNo} = stepsLogic(currentStep);
          let pageContent = getDocument('pages', collection);
          setCollection(collection);
          setMaxSelectionNo(maxSelectionNo)
          setPageContent(pageContent);

          // console.log(currentStep, collection, maxSelectionNo, pageContent)

          // update the available skills or attitudes

          }
          }, [currentStep]);





          
    // steps data and effects

    // used when selecting skills
    const [storedProSkills, setStoredProSkills] = useLocalStorage("nesta_pro_skills");
    const [storedConSkills, setStoredConSkills] = useLocalStorage("nesta_con_skills");
    const [storedProAttitudes, setProAttitudes] = useLocalStorage("nesta_pro_attitudes");
    const [storedConAttitudes, setConAttitudes] = useLocalStorage("nesta_con_attitudes");
    const [chosenSkills, setChosenSkills] = useState([]);


    const chooseWhichChosenSkillsToLoad = (step) => {

      switch (step) {
        case 1:
            return storedProSkills ? JSON.parse(storedProSkills) : []
          break;
        case 2:
          return storedConSkills ? JSON.parse(storedConSkills) : []
          break;
        case 3:
          return storedProAttitudes ? JSON.parse(storedProAttitudes) : []
          break;
        case 4:
          return storedConAttitudes ? JSON.parse(storedConAttitudes) : []
          break;
      }


      
    }


    const previousStep = currentStep - 1;
    const nextStep = currentStep + 1;

   
    // initialise stored skills
    useEffect(() => {
      setStoredProSkills('')
      setStoredConSkills('')
      setProAttitudes('')
      setConAttitudes('')
    }, []);


  

   // when current step is updated update the stores for content
   useEffect(() => {
    // update storage
    
    console.log('currentStep updated2', currentStep)
    if(currentStep) {
      
    
    // console.log('chosenSkills', chosenSkills)
    // console.log('-------------')
    // console.log('storedProSkills', storedProSkills)
    // console.log('storedConSkills', storedConSkills)
    // console.log('storedProAttitudes', storedProAttitudes)
    // console.log('storedConAttitudes', storedConAttitudes)
    
    // if(currentStep >= 3 ) {
    //   setChosenSkills([])
    // }

    switch (currentStep) {
      case 1:
          setChosenSkills([]);
        break;
      case 2:
          setChosenSkills([]);
        break;
      case 3:
        setChosenSkills([]);
        break;
      case 4:
        setChosenSkills([]);
        break;
    }

    }


    // update the available skills or attitudes
    }, [currentStep]);



      // update local storage when we've chosen skills
      useEffect(() => {

      //       if we're on step 1:
      // update chosen skills

      // console.log('chosenSkills effect', chosenSkills)



      console.log(`step ${currentStep} update local storage when we\'ve chosen skills ${chosenSkills} update to ${JSON.stringify(chosenSkills)}`)
      switch (currentStep) {
        case 1:
            setStoredProSkills(JSON.stringify(chosenSkills))
          break;
        case 2:
            setStoredConSkills(JSON.stringify(chosenSkills))
          break;
        case 3:
            setProAttitudes(JSON.stringify(chosenSkills))
          break;
        case 4:
            setConAttitudes(JSON.stringify(chosenSkills))
          break;
      }




      //  setStoredProSkills(JSON.stringify(chosenSkills))
      

        
      //   setStoredProSkills(JSON.stringify(chosenSkills))
      }, [chosenSkills, currentStep, setStoredProSkills, setStoredConSkills, setProAttitudes, setConAttitudes]);


    // what happens when we select a skill
    const selectSkill = (skill) => {
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

    }

 

    // updates the current step
    const updateStep = (type) => {
      var newStep = (type === 'increase') ? currentStep + 1 : currentStep - 1; 
      setCurrentStep(newStep);
    }


    const skillsContainer = () => {
      console.log('skillsContainer', currentStep)


      switch (currentStep) {
        case 1:
          return (
            <SkillsContainer>
              {skills.map((skill) =>
                skillCard(skill)
              )}
            </SkillsContainer>
          )
          break;
        case 2:

          if(storedProSkills === '') {
            return (
              <SkillsContainer>
                {skills.map((skill) =>
                  skillCard(skill)
                )}
              </SkillsContainer>
            )
          } else {
            return (
              <SkillsContainer>
                {skills.map((skill) => 
                    JSON.parse(storedProSkills).includes(skill.id) === false &&
                      skillCard(skill)
                )}
              </SkillsContainer>
            )
         }
          
          break;
        case 3:
          return (
            <SkillsContainer>
              {attitudes.map((skill) => 
                  skillCard(skill)
              )}
            </SkillsContainer>
          )
          break;
        case 4:


          if(storedProAttitudes === '') {
            return (
              <SkillsContainer>
                {attitudes.map((skill) =>
                  skillCard(skill)
                )}
              </SkillsContainer>
            )
          } else {
            return (
              <SkillsContainer>
                {attitudes.map((skill) => 
                    JSON.parse(storedProAttitudes).includes(skill.id) === false &&
                      skillCard(skill)
                )}
              </SkillsContainer>
            )
         }
          break;
      }
    
    }
    

    const skillCard = (skill) => {
      return (
      <SkillCard 
              key={skill.id} 
              skill={skill} 
              chosenSkills={chosenSkills} 
              selectSkill={selectSkill} 
              maxSelectionNo={maxSelectionNo} 
            />
            )
    }




  return(
    <BodyClassName className={`step_${currentStep}`}>
      <>
       <CurrentStep step={currentStep} max={4} />

        <Content source={pageContent.body} />

        <div onClick={()=>updateStep()}>back</div>
        <div onClick={()=>updateStep('increase')}>next</div>

        {skillsContainer()}

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
