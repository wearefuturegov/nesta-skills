import React from 'react';
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import Content from '../../components/Content'
import { ButtonSecondary } from '../../components/ButtonSecondary';


const ResultsTeamActivitesPage = ({fields}) => {
  const { title, body, pdf } = fields;

  return(
    <section>
      <ButtonSecondary to={ROUTES.RESULTS}>Back to your results</ButtonSecondary>

      <h1>{title}</h1>
      <Content source={body} />
      <br />
      <Button to={pdf} external>Download team activites PDF</Button>
    </section>
  )
}


export default ResultsTeamActivitesPage;
