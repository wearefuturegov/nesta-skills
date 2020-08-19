import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import theme from "../../_theme"

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Outer = styled.header`
  padding: 25px 15px;
  background: ${theme.darkPurple};
  a {
    color: ${theme.white};
  }
`
const Inner = styled.div`
  max-width: ${theme.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
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

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Outer>
    <Inner>
      <Link to={ROUTES.LANDING}><Logo>logo</Logo></Link>
      
      <Nav>
        <NavList>
          <NavItem>
            <Link to={ROUTES.HOME}>Home</Link>
          </NavItem>
          <NavItem>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </NavItem>
          {authUser.roles.includes(ROLES.ADMIN) && (
            <NavItem>
              <Link to={ROUTES.ADMIN}>Admin</Link>
            </NavItem>
          )}
          <NavItem>
            <SignOutButton />
          </NavItem>
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
