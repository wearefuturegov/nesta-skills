import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import * as ROUTES from '../../constants/routes';

import soCLogoSvg from './soc_logo.svg';
import nestaLogoSvg from './nesta_logo.svg';

const Outer = styled.footer`
  background: ${theme.black};
  margin-top: 50px;
  padding: 35px 15px;
  color: ${theme.white};
  flex-shrink: 0;
  text-align: center;

  a {
    color: ${theme.white};
  }
`
const Inner = styled.div`
  max-width: ${theme.l};
  margin: 0 auto;

  p {
    max-width: none;
  }

  @media screen and (min-width: ${theme.xl}){
    max-width: calc(${theme.xl} - 200px);
  }
`
const Logos = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  img {
    width: 100px;
    height: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  a {
    margin: 0 15px;

    &:hover {
      opacity: 0.7;
    }
  }
`
const NestaLogo = styled.img`
  
`
const SoCLogo = styled.img`

`
const Footer = () => (
  <Outer>
    <Inner>
      <p>Brought to you by</p>
      <Logos>
        <a href="https://states-of-change.org/" title="Go to State's of Change's website" external><SoCLogo src={soCLogoSvg} alt="States of Change logo" /></a>
        <a href="https://www.nesta.org.uk/" title="Go to Nesta's website" external><NestaLogo src={nestaLogoSvg} alt="Nesta logo" /></a>
      </Logos>
      <a href="https://states-of-change.org/privacy-policy" target="_blank" title="View our privacy policy">Privacy policy</a>
    </Inner>
  </Outer>
);

export default Footer;
