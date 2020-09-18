import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import * as ROUTES from '../../constants/routes';
import Content from '../../components/Content'
import { SecondaryButton } from '../../components/SecondaryButton';
import { SkillCardDevelopment, SkillsContainer } from "../../components/SkillCard";
import { ReadIcon, WatchIcon, UseIcon } from './Icons';

const Section = styled.section`

`
const SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
`
const SkillSection = styled.div`
  text-align: center;
  margin-top: 15px;
  padding: 5px;
  flex-grow: 1;
  flex-basis: 0;

  svg {
    height: 50px;
    width: auto;
  }
  h2 {
    margin-top: 5px;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    color: ${theme.darkPurple};
  }
`

const ResultsSkillsDevelopmentPage = ({fields, skills}) => {
  const { title, body } = fields;

  return(
    <>
    <Section>
      <SecondaryButton to={ROUTES.RESULTS}>Back to your results</SecondaryButton>

      <h1>{title}</h1>
      <Content source={body} />
      
      <SectionsContainer>
        <SkillSection>
          <ReadIcon />
          <h2>Read</h2>
          <p>An article or blog</p>
        </SkillSection>
        <SkillSection>
          <WatchIcon />
          <h2>Watch</h2>
          <p>A talk or introduction</p>
        </SkillSection>
        <SkillSection>
          <UseIcon />
          <h2>Use</h2>
          <p>A practical tool or guide</p>
        </SkillSection>
      </SectionsContainer>
    </Section>
    <Section>
      <SkillsContainer>
        {skills.map((skill) =>
          <SkillCardDevelopment 
            key={skill.id} 
            skill={skill} 
          />
        )}
      </SkillsContainer>
    </Section>
    </>
  )
}


export default ResultsSkillsDevelopmentPage;
