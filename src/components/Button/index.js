import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"

const ButtonContainer = styled.button`
    display: inline-block;
    padding: 15px ${theme.standardSpace}px;
    background: ${props => props.bg};
    color: ${props => props.reverse ? theme.black : theme.white};
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: ${theme.standardSpace}px;
    border: none;
    margin-top: 10px; 
    cursor: pointer;

    &:focus {
        outline: none;
        border-radius: 0;
        box-shadow: 0 0px 0px 3px ${theme.black}, 0 0px 0px 5px ${theme.focus};
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
    color: ${props => props.reverse ? theme.black : theme.white};
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: ${theme.standardSpace}px;

    &:focus {
        outline: none;
        border-radius: 0;
        background: ${props => props.bg};
        box-shadow: 0 0px 0px 3px ${theme.black}, 0 0px 0px 5px ${theme.focus};
    }    
`

export const Button = ({isButton, to, background, onClick, external, reverse, children, ...props}) => (
    isButton ? 
        <ButtonContainer reverse={reverse} onClick={onClick} to={to} target={external ? "_blank" : "_self"} bg={background ? background : reverse ? theme.white : theme.darkPurple } {...props}>{children}</ButtonContainer>
        :
        to ?
            <LinkContainer reverse={reverse} onClick={onClick} to={to} target={external ? "_blank" : "_self"} bg={background ? background : reverse ? theme.white : theme.darkPurple } {...props}>{children}</LinkContainer>
            :
            <ButtonContainer reverse={reverse} onClick={onClick} bg={background ? background : theme.darkPurple } {...props}>{children}</ButtonContainer>
);
