import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import * as ROUTES from '../../constants/routes';
import Content from '../../components/Content'
import { SecondaryButton } from '../../components/SecondaryButton';
import { SkillCardDevelopment, SkillsContainer } from "../../components/SkillCard";

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const SkillSection = styled.div`
  text-align: center;
`

const ResultsSkillsDevelopmentPage = ({fields, skills}) => {
  const { title, body } = fields;

  return(
    <>
    <section>
      <SecondaryButton to={ROUTES.RESULTS}>Back to your results</SecondaryButton>

      <h1>{title}</h1>
      <Content source={body} />
      
      <SectionsContainer>
        <SkillSection>
          <h2>Read</h2>
          <p>an article or blog</p>
        </SkillSection>
        <SkillSection>
          <h2>Watch</h2>
          <p>a talk or introduction</p>
        </SkillSection>
        <SkillSection>
          <h2>Use</h2>
          <p>a practical tool or guide</p>
        </SkillSection>
      </SectionsContainer>
    </section>
    <section>
      <SkillsContainer>
        {skills.map((skill) =>
          <SkillCardDevelopment 
            key={skill.id} 
            skill={skill} 
          />
        )}
      </SkillsContainer>
    </section>
    </>
  )
}


export default ResultsSkillsDevelopmentPage;
