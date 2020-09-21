import React from 'react';
import theme from "../../_theme"
import { ButtonContainer, FakeButtonContainer } from './ButtonSecondaryStyles'


export const ButtonSecondary = ({to, background, onClick, classes, children, ...props}) => (
    to ?
        <ButtonContainer className={classes} onClick={onClick} to={to} bg={background ? background : theme.darkPurple }  {...props}>{children}</ButtonContainer>
        :
        <FakeButtonContainer className={classes} onClick={onClick} bg={background ? background : theme.darkPurple }  {...props}>{children}</FakeButtonContainer>
);
