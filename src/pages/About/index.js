import React from 'react';
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import { ButtonSecondary } from '../../components/ButtonSecondary';
import Content from '../../components/Content';

const AboutPage = ({fields}) => {
  const { title, body, file_link, about_title, about_content } = fields;
  return(
    <>
    <section>
      <ButtonSecondary to={ROUTES.LANDING}>Return home</ButtonSecondary>
      <h1>{title}</h1>
      <Content source={body} />

      <Button to={file_link} external>Download the framework</Button>

      <h2>{about_title}</h2>
      <Content source={about_content} />
    </section>
    </>
  )
}


export default AboutPage;
