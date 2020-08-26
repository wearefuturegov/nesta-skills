import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import styled from "styled-components"
import theme from "../../_theme"

import StartPage from '../Tool0Start';
import Tool1 from '../Tool1StrongSkills';
import Tool2 from '../Tool2WeakSkills';
import Tool3 from '../Tool3StrongAttributes';
import Tool4 from '../Tool4WeakAttributes';

const PageWrapper = styled.div`
  padding: 0 15px;
  max-width: ${theme.l};
  margin: 0 auto;
  @media screen and (min-width: ${theme.xl}){
    max-width: calc(${theme.xl} - 200px);
  }
`

const App = () => {

  return(
    <Router>
      <Navigation />

      <PageWrapper>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />

        <Route path={ROUTES.START} component={StartPage} />
        <Route path={ROUTES.STEP1} component={Tool1} />
        <Route path={ROUTES.STEP2} component={Tool2} />
        <Route path={ROUTES.STEP3} component={Tool3} />
        <Route path={ROUTES.STEP4} component={Tool4} />
      </PageWrapper>
    </Router>
  )
}

export default withAuthentication(App);
