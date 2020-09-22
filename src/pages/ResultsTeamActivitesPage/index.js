import React from 'react';
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import Content from '../../components/Content'
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { Hero } from '../../components/Hero';


const ResultsTeamActivitesPage = ({fields}) => {
  const { title, body, pdf } = fields;

  return(
    <>
    <Hero title={title}>
      <ButtonSecondary to={ROUTES.RESULTS}>Back to your results</ButtonSecondary>
    </Hero>
    <section>
      <Content source={body} />
      <br />
      <Button to={pdf} external>Download team activites PDF</Button>
    </section>
    </>
  )
}


export default ResultsTeamActivitesPage;
