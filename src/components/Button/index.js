import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"

const ButtonContainer = styled.button`
    display: inline-block;
    padding: 15px ${theme.standardSpace}px;
    background: ${props => props.bg};
    color: ${theme.white};
    text-decoration: none;
    font-weight: 600;
    margin-bottom: ${theme.standardSpace}px;
    border: none;
    margin-top: 10px; 

    &:focus {
        outline: none;
        border-radius: 0;
    }

    &:disabled {
        background: ${theme.grey};
        color: ${theme.black};
        cursor: no-drop;
        font-weight: normal;
    }
`

const LinkContainer = styled(Link)`
    display: inline-block;
    padding: 15px ${theme.standardSpace}px;
    background: ${props => props.bg};
    color: ${theme.white};
    text-decoration: none;
    font-weight: 600;
    margin-bottom: ${theme.standardSpace}px;
`

export const Button = ({isButton, to, background, onClick, children, ...props}) => (
    isButton ? 
        <ButtonContainer onClick={onClick} to={to} bg={background ? background : theme.darkPurple } {...props}>{children}</ButtonContainer>
        :
        <LinkContainer onClick={onClick} to={to} bg={background ? background : theme.darkPurple } {...props}>{children}</LinkContainer>
);
