import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import ReactGA from 'react-ga';

import Navigation from '../Navigation';
import Footer from '../Footer';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import NotFound from '../NotFound';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import styled from "styled-components"
import theme from "../../_theme"

import data from '../../data.json'

import ScrollToTop from '../../components/ScrollToTop'

import StartPage from '../Tool0Start';
import Tool1 from '../Tool1StrongSkills';
import Tool2 from '../Tool2WeakSkills';
import Tool3 from '../Tool3StrongAttitudes';
import Tool4 from '../Tool4WeakAttitudes';
import Tool5 from '../Tool5SignUp';
import Tool6 from '../Tool6SaveResults';
import ResultsPage from '../Results';
import ResultsTeamActivitesPage from '../ResultsTeamActivitesPage';
import ResultsSkillsDevelopmentPage from '../ResultsSkillsDevelopmentPage';

const PageWrapper = styled.div`
  padding: 0 15px;
  max-width: ${theme.l};
  margin: 0 auto;
  flex: 1 0 auto;
  width: 100%;
  max-width: calc(100% - 30px);

  @media screen and (min-width: ${theme.m}){
    max-width: 1040px;  
  }
  @media screen and (min-width: ${theme.xl}){
    max-width: calc(${theme.xl} - 200px);
  }
`
const App = () => {
  let state = {
    data
  }

  ReactGA.initialize('UA-99320279-3');
  ReactGA.pageview(window.location.pathname + window.location.search);

  let getDocument = (collection, name) =>
  state.data[collection] &&
  state.data[collection].filter(page => page.name === name)[0]

  let getDocuments = collection => state.data[collection] || []

  return(
    <Router>
      <ScrollToTop />
      <Navigation />

      <PageWrapper>
        <ToastProvider>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={() => <LandingPage fields={getDocument('pages', 'landing-page')} />} /> 
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />

            <Route path={ROUTES.START} component={() => <StartPage fields={getDocument('pages', '00-start')} />} />
            <Route path={ROUTES.RESTART} component={() => <StartPage fields={getDocument('pages', '00-start')} restart={true} />} />
            <Route path={ROUTES.VERIFIED} component={() => <LandingPage verified={true} fields={getDocument('pages', 'landing-page')} />} />
            <Route path={ROUTES.STEP1} component={() => <Tool1 fields={getDocument('pages', '01-strong-skills')} skills={getDocuments('skills')} />} />
            <Route path={ROUTES.STEP2} component={() => <Tool2 fields={getDocument('pages', '02-weak-skills')} skills={getDocuments('skills')} />} />
            <Route path={ROUTES.STEP3}  component={() => <Tool3 fields={getDocument('pages', '03-strong-attitudes')} attitudes={getDocuments('attitudes')} />} />
            <Route path={ROUTES.STEP4}  component={() => <Tool4 fields={getDocument('pages', '04-weak-attitudes')} attitudes={getDocuments('attitudes')} />} />
            <Route path={ROUTES.STEP5}  component={() => <Tool5 fields={getDocument('pages', '05-sign-up')} />}/>

            <Route path={ROUTES.SAVERESULTS} component={() => <Tool6 rolesContent={getDocuments('roles')} />} />
            <Route path={ROUTES.RESULTS} component={() => 
              <ResultsPage 
                skills={getDocuments('skills')} 
                rolesContent={getDocuments('roles')} 
                attitudes={getDocuments('attitudes')} 
                fields={getDocument('pages', '06-results')} 
              />} 
            />
            <Route path={ROUTES.RESULTSTEAM} component={() => <ResultsTeamActivitesPage fields={getDocument('pages', '07-results-team-activites')} />} />
            <Route path={ROUTES.RESULTSSKILLS} component={() => <ResultsSkillsDevelopmentPage skills={getDocuments('skills')} fields={getDocument('pages', '08-results-skills-development')} />} />
            <Route component={NotFound} />
          </Switch>
        </ToastProvider>
      </PageWrapper>
      <Footer />
    </Router>
  )
}

export default withAuthentication(App);