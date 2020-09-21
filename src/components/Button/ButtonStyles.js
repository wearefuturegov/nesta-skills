
import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"


export const ButtonContainer = styled.button`
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
width: 100%;
text-align: center;

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
@media screen and (min-width: ${theme.m}){
    width: auto;
}
`

export const LinkContainer = styled(Link)`
display: inline-block;
padding: 15px ${theme.standardSpace}px;
background: ${props => props.bg};
color: ${props => props.reverse ? theme.black : theme.white};
text-decoration: none;
font-size: 1rem;
font-weight: bold;
margin-bottom: ${theme.standardSpace}px;
width: calc(100% - 50px);
text-align: center;

&:focus {
    outline: none;
    border-radius: 0;
    background: ${props => props.bg};
    box-shadow: 0 0px 0px 3px ${theme.black}, 0 0px 0px 5px ${theme.focus};
}    

@media screen and (min-width: ${theme.m}){
    width: auto;
}
`