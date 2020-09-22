import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import theme from "../../_theme"
import * as ROUTES from '../../constants/routes';

import logoSvg from '../Navigation/nesta.js';

const Outer = styled.footer`
  background: ${theme.black};
  margin-top: 50px;
  padding: 25px 15px;
  color: ${theme.white};
  flex-shrink: 0;
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

const Footer = () => (
  <Outer>
    <Inner>
      Footer
    </Inner>
  </Outer>
);

export default Footer;
