import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"

export const styles = `
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

    &.white-button {
        color: ${theme.white};
    }

    &.asblock {
        display: block;
        margin: 0 auto;
    }

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
export const ButtonContainer = styled(Link)`
    ${styles}
`
export const FakeButtonContainer = styled.button`
    ${styles}
`