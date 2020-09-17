import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import * as ROUTES from '../../constants/routes';
import Content from '../../components/Content'
import { SecondaryButton } from '../../components/SecondaryButton';

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const SkillSection = styled.div`
  text-align: center;
`

const ResultsSkillsDevelopmentPage = ({fields}) => {
  const { title, body, pdf } = fields;

  return(
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
  )
}


export default ResultsSkillsDevelopmentPage;
