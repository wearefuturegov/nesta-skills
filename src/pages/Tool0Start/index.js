import React, { useEffect } from 'react';
import styled from "styled-components";
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Content from '../../components/Content';
import blackCircles from "./black_circles.svg";

const WrappedPageContainer = styled.div`
  position: relative;
`
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
  margin-bottom: 10px;
  margin-top: 10px;

  @media screen and (min-width: ${theme.s}){
      flex: 1 1 0px;
      margin-right: ${theme.standardSpace}px;

      &:nth-of-type(3n) {
        margin-right: 0;
      }
  }
  @media screen and (min-width: ${theme.m}){
    padding: 25px;
  }

`
const BlockTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
`
const BlockText = styled.div`
  font-size: 1.25rem;
`
const CenteredText = styled.div`
  text-align: center;
  margin-bottom: 0px;
  @media screen and (min-width: ${theme.m}){
    margin-bottom: 125px;
  }
`

const Circles = styled.img`
  position: absolute;
  width: 800px;
  height: auto;
  bottom: -200px;
  z-index: -1;
  opacity: 0.6;
  display: none;
  @media screen and (min-width: ${theme.m}){
    display: block;
    left: -300px;
  }
`

const StartPage = ({restart, fields}, props) => {
  // page content @todo -probably doesnt need this many fields now that we have wysiwyg option
  const { title, top_content, bottom_content, block_one_title, block_one_content, block_two_title, block_two_content, block_three_title, block_three_content } = fields;
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
    <WrappedPageContainer>
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


      {/* <Content source={bottom_content} /> */}

      <CenteredText>
        <Button to={ROUTES.STEP1} background={theme.purple}>Explore your skills</Button>
      </CenteredText>

      <Circles src={blackCircles} alt="" />
    </WrappedPageContainer>
  )
}


export default StartPage;
