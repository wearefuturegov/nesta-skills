import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import theme from "../../_theme"
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import logoSvg from './nesta.js';

const Outer = styled.header`
  padding: 10px 15px;
  background: ${theme.darkPurple};
  margin-bottom: ${theme.standardSpace}px;
  a {
    color: ${theme.white};
    font-weight: bold;

    &:focus {
      color: ${theme.black};
      svg {
        fill: ${theme.black};
      }
    }
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
  height: 100%;
`
const NavItem = styled.li`
  display: inline-block;
  margin-left: 15px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  a {
    text-decoration: none;
    padding: 3px 0;
    margin-left: 10px;
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid ${theme.white}99;
    }
  }
`
const Logo = styled(logoSvg)`
  width: 100px;
  fill: ${theme.white};
`


const Navigation = () => {
  const currentStep = useLocalStorage("nesta_progress");

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
      <Link to={ROUTES.LANDING} title="Nesta Skills &amp; Innovation"><Logo fill={theme.white} alt="Nesta" /></Link>
      
      <Nav>
        <NavList>
          <NavItem>
            {authUser.roleTotals || currentStep === 6 ?
              <Link to={ROUTES.RESULTS} className="results_link">Results</Link>
              :
              currentStep === 0 &&
                <Link to={ROUTES.START}>Start</Link>
            }
          </NavItem>
          <NavItem>
            {!authUser.isAnonymous ? 
              <Link to={ROUTES.ACCOUNT} className="account_link">Account</Link>
              :
              <Link to={ROUTES.SIGN_UP} className="account_link">Sign up</Link>
            }
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
      <Link to={ROUTES.LANDING}><Logo alt="Nesta" /></Link>
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
