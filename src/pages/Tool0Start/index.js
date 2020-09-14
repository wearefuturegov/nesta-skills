import React, { useEffect } from 'react';
import styled from "styled-components";
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Marked from 'react-markdown'
import Content from '../../components/Content'

const BlockContainer = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  flex-wrap: wrap;
`
const Block = styled.li`
  width: 100%;
  padding: 15px;
  background: ${props => props.color};
  color: ${theme.white};
  margin-bottom: ${theme.standardSpace}px;

  @media screen and (min-width: ${theme.s}){
      flex: 1 1 0px;
      margin-right: ${theme.standardSpace}px;

      &:nth-of-type(3n) {
        margin-right: 0;
      }
  }
`
const BlockTitle = styled.h2`
  margin-top: 0;
`
const BlockText = styled.div`
  
`

const StartPage = ({restart, fields}, props) => {
  const { title, top_content, bottom_content, block_one_title, block_one_content, block_two_title, block_two_content, block_three_title, block_three_content } = fields;
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  
  useEffect(() => {
    if (restart) {
      window.localStorage.setItem("nesta_pro_skills", "");
      window.localStorage.setItem("nesta_con_skills", "");
      window.localStorage.setItem("nesta_pro_attitudes", "");
      window.localStorage.setItem("nesta_con_attitudes", "");
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

      
      <Button to={ROUTES.STEP1}>Start</Button>
    </div>
  )
}


export default StartPage;
