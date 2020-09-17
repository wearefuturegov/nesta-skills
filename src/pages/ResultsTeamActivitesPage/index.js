import React from 'react';
import styled from "styled-components";
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import theme from "../../_theme"
import Content from '../../components/Content'


const ResultsTeamActivitesPage = ({fields}) => {
  const { title, body } = fields;

  return(
    <section>
      <h1>{title}</h1>
      <Content source={body} />
      <Button external>Download team activites PDF</Button>
    </section>
  )
}


export default ResultsTeamActivitesPage;
