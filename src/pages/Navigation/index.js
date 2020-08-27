import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Outer = styled.header`
  padding: 25px 15px;
  background: ${theme.darkPurple};
  margin-bottom: ${theme.standardSpace}px;
  a {
    color: ${theme.white};
  }
`
const Inner = styled.div`
  max-width: ${theme.l};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: ${theme.xl}){
    max-width: calc(${theme.xl} - 200px);
  }
`
const Nav = styled.nav`
`
const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`
const NavItem = styled.li`
  display: inline-block;
  margin-left: 15px;
`
const Logo = styled.div`

`

const Navigation = () => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");

  return(
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} currentStep={currentStep} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  )
}

const NavigationAuth = ({ authUser, currentStep }) => (
  <Outer>
    <Inner>
      <Link to={ROUTES.LANDING}><Logo>logo</Logo></Link>
      
      <Nav>
        <NavList>
          <NavItem>
            {authUser.roleTotals && authUser.roleTotals.length > 0 ?
              <Link to={ROUTES.RESULTS}>Results</Link>
              :
              currentStep > 0 ? 
                <Link to={`/step_${currentStep}`}>Continue</Link>
                :
                <Link to={ROUTES.START}>Start</Link>
            }
          </NavItem>
          <NavItem>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </NavItem>
          {authUser.roles.includes(ROLES.ADMIN) && (
            <NavItem>
              <Link to={ROUTES.ADMIN}>Admin</Link>
            </NavItem>
          )}
        </NavList>
      </Nav>
    </Inner>
  </Outer>
);

const NavigationNonAuth = () => (
  <Outer>
    <Inner>
      <Link to={ROUTES.LANDING}><Logo>logo</Logo></Link>
      <Nav>
        <NavList>
          <NavItem>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </NavItem>
        </NavList>
      </Nav>
    </Inner>
  </Outer>
);

export default Navigation;
