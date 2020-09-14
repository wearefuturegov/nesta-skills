import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import ResultsPage from '../Results';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import styled from "styled-components"
import theme from "../../_theme"

import data from '../../data.json'

import StartPage from '../Tool0Start';
import Tool1 from '../Tool1StrongSkills';
import Tool2 from '../Tool2WeakSkills';
import Tool3 from '../Tool3StrongAttitudes';
import Tool4 from '../Tool4WeakAttitudes';
import Tool5 from '../Tool5SignUp';
import Tool6 from '../Tool6SaveResults';

const PageWrapper = styled.div`
  padding: 0 15px;
  max-width: ${theme.l};
  margin: 0 auto;
  @media screen and (min-width: ${theme.xl}){
    max-width: calc(${theme.xl} - 200px);
  }
`

const App = () => {
  let state = {
    data
  }

  let getDocument = (collection, name) =>
  state.data[collection] &&
  state.data[collection].filter(page => page.name === name)[0]

  return(
    <Router>
      <Navigation />

      <PageWrapper>
        <ToastProvider>
          <Route exact path={ROUTES.LANDING} component={() => <LandingPage fields={getDocument('pages', 'landing-page')} />} /> 
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.RESULTS} component={ResultsPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />

          <Route path={ROUTES.START} component={() => <StartPage fields={getDocument('pages', '00-start')} />} />
          <Route path={ROUTES.RESTART} component={() => <StartPage restart={true} fields={getDocument('pages', '00-start')} />} />
          <Route path={ROUTES.VERIFIED} component={() => <LandingPage verified={true} fields={getDocument('pages', 'landing-page')} />} />
          <Route path={ROUTES.STEP1} component={Tool1} />
          <Route path={ROUTES.STEP2} component={Tool2} />
          <Route path={ROUTES.STEP3} component={Tool3} />
          <Route path={ROUTES.STEP4} component={Tool4} />
          <Route path={ROUTES.STEP5} component={Tool5} />
          <Route path={ROUTES.SAVERESULTS} component={Tool6} />
        </ToastProvider>
      </PageWrapper>
    </Router>
  )
}

export default withAuthentication(App);
