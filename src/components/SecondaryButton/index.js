import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"

const ButtonContainer = styled(Link)`
    display: block;
    background: transparent;
    border: none;
    text-decoration: underline;
    text-align: left;
    display: inline-block;
    padding: 5px;
    margin-left: -5px;
    margin-top: auto;
    width: fit-content;
    cursor: pointer;
    border-radius: 0;
    font-weight: bold;

    &:hover {
        text-decoration: none;
        opacity: 0.8;
    }
    &:focus {
        outline: none;
        background-color: ${theme.focus};
        box-shadow: 0 -2px ${theme.focus}, 0 4px ${theme.black};
        text-decoration: none;
        color: ${theme.black} !important;
    }
`

export const SecondaryButton = ({to, background, onClick, children}) => (
    <>
        <ButtonContainer onClick={onClick} to={to} bg={background ? background : theme.darkPurple } >{children}</ButtonContainer>
    </>
);
