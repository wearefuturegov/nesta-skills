import React from 'react';
import theme from "../../_theme"
import { ButtonContainer, LinkContainer } from './ButtonStyles'

export const Button = ({isButton, to, background, onClick, external, reverse, children, ...props}) => (
    isButton ? 
        <ButtonContainer reverse={reverse} onClick={onClick} to={to} target={external ? "_blank" : "_self"} bg={background ? background : reverse ? theme.white : theme.darkPurple } {...props}>{children}</ButtonContainer>
        :
        to ?
            <LinkContainer reverse={reverse} onClick={onClick} to={to} target={external ? "_blank" : "_self"} bg={background ? background : reverse ? theme.white : theme.darkPurple } {...props}>{children}</LinkContainer>
            :
            <ButtonContainer reverse={reverse} onClick={onClick} bg={background ? background : theme.darkPurple } {...props}>{children}</ButtonContainer>
);
