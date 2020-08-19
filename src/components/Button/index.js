import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"

const ButtonContainer = styled(Link)`
    display: inline-block;
    padding: 15px ${theme.standardSpace}px;
    background: ${props => props.bg};
    color: ${theme.white};
    text-decoration: none;
    font-weight: 600;
    margin-bottom: ${theme.standardSpace}px;
`

export const Button = ({to, background, children}) => (
    <ButtonContainer to={to} bg={background ? background : theme.darkPurple }>{children}</ButtonContainer>
);
