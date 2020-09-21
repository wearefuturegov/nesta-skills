import React, { useEffect } from 'react';

import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Content from '../../components/Content'

import { BlockContainer, Block, BlockTitle, BlockText } from './Tool0StartStyles'


const StartPage = ({restart, fields}, props) => {
  // page content @todo -probably doesnt need this many fields now that we have wysiwyg option
  const { title, top_content, bottom_content, block_one_title, block_one_content, block_two_title, block_two_content, block_three_title, block_three_content } = fields;
  

  // setup storage
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");


  // on page load set current step to 0
  // if its a flagged as a restart - empty local storage of previously selected values
  useEffect(() => {
    if (restart) {
      // window.localStorage.setItem("nesta_pro_skills", "");
      // window.localStorage.setItem("nesta_con_skills", "");
      // window.localStorage.setItem("nesta_pro_attitudes", "");
      // window.localStorage.setItem("nesta_con_attitudes", "");
    }
    setCurrentStep(0);
  }, []);

  return(
    <div>
      <h1>{title}</h1>


      <Content source={top_content} />


      <BlockContainer>
        <Block color={theme.orange}>
          <BlockTitle>{block_one_title}</BlockTitle>
          <BlockText>{block_one_content}</BlockText>
        </Block>
        <Block color={theme.red}>
          <BlockTitle>{block_two_title}</BlockTitle>
          <BlockText>{block_two_content}</BlockText>
        </Block>
        <Block color={theme.purple}>
          <BlockTitle>{block_three_title}</BlockTitle>
          <BlockText>{block_three_content}</BlockText>
        </Block>
      </BlockContainer>


      <Content source={bottom_content} />

      
      <Button to={ROUTES.STEPS}>Start</Button>
    </div>
  )
}


export default StartPage;
