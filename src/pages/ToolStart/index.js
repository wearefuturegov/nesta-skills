import React from 'react';
import styled from "styled-components"
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"

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

const StartPage = () => (
  <div>
    <h1>Free XXX tool</h1>
    <p>This tool should take around 10 minutes to complete.</p>

    <p>Our research has shown that when teams have skills and behaviours in the following three core areas, they’re more likely to be successful at experimenting and problem solving. This means they are more effective, efficient and impactful in their work.</p>

    <BlockContainer>
      <Block color={theme.orange}>
        <BlockTitle>Working together</BlockTitle>
        <BlockText>Engaging with citizens and stakeholders to create shared ownership of new solutions.</BlockText>
      </Block>
      <Block color={theme.red}>
        <BlockTitle>Leading Change</BlockTitle>
        <BlockText>Mobilising resources and support to make change happen.</BlockText>
      </Block>
      <Block color={theme.purple}>
        <BlockTitle>Accelerating Learning</BlockTitle>
        <BlockText>Exploring and iterating new ideas to inform and validate solutions.</BlockText>
      </Block>
    </BlockContainer>

    <p>Each of the three areas relates to a specific set of skills and behaviours.</p>

    <p>We wouldn’t expect for one individual to have all these; instead, they should be spread across a wider team. The challenge (and opportunity) is to combine them in ways that make the team greater than its individual members.</p>

    <p>You as an individual might still have a range of these skills (at varying degrees of strength and weakness) across all three areas. Or you may naturally gravitate to only one or two of them.</p>
    <Button to={ROUTES.ACCOUNT}>Start</Button>
  </div>
);

export default StartPage;
