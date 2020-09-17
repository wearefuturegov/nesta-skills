import React from 'react';
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import Content from '../../components/Content'
import { SecondaryButton } from '../../components/SecondaryButton';


const ResultsTeamActivitesPage = ({fields}) => {
  const { title, body, pdf } = fields;

  return(
    <section>
      <SecondaryButton to={ROUTES.RESULTS}>Back to your results</SecondaryButton>

      <h1>{title}</h1>
      <Content source={body} />
      <br />
      <Button to={pdf} external>Download team activites PDF</Button>
    </section>
  )
}


export default ResultsTeamActivitesPage;
