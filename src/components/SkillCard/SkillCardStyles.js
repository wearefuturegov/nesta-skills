
import { ButtonSecondary } from '../../components/ButtonSecondary';
import styled from "styled-components"
import theme from "../../_theme"


export const Outer = styled.li`
padding: ${props => props.isButton ? "15px" : "10px"};
border: ${props => props.isButton ? `5px solid ${props.bg}` : `3px solid ${props.bg}`};
width: 100%;
margin-bottom: ${props => props.isButton ? `${theme.standardSpace}px` : "15px"};
display: flex;
flex-direction: column;
cursor: ${props => props.isButton === 2 ? "pointer" : "default"};
max-width: ${props => props.isButton ? "100%" : "350px"};

&:hover {
    opacity: ${props => props.isButton ? "0.8" : "1"};
}
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px ${theme.focus}, 0px 0px 0px 6px ${theme.black};
}
&.active {
    background: ${props => props.bg};
    color: ${theme.white};
    a, button {
        color: ${theme.white};
    }
}

p {
    margin-bottom: ${props => props.isButton ? "15px" : "0"};
}
p {
    margin-bottom: ${props => props.isButton ? "15px" : "0"};
}
@media screen and (min-width: ${theme.s}){
    width: calc(50% - 54px);
    margin-right: ${theme.standardSpace}px;

    &:nth-of-type(3n) {
        margin-right: ${theme.standardSpace}px;
    }
    &:nth-of-type(2n) {
        margin-right: 0;
    }
}

@media screen and (min-width: ${theme.m}){
    width: calc(33% - 55px);
    margin-right: ${theme.standardSpace}px;

    &:nth-of-type(2n) {
        margin-right: ${theme.standardSpace}px;
    }
    &:nth-of-type(3n) {
        margin-right: 0;
    }
}
`
export const Inner = styled.div`
`

export const SkillTitle = styled.h3`
margin-top: 0;
`
export const SkillText = styled.p`

`
export const ModalTitle = styled.h2`
margin-top: 0;
`
export const ModalLead = styled.p`
font-size 1.5rem;
`
export const ReadMore = styled(ButtonSecondary)`

`
export const ModalActions = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
export const CloseModal = styled(ButtonSecondary)`

`
export const AddButton = styled.button`
background: ${props => props.bg};
padding: 15px 20px;
border: 3px solid transparent;
font-weight: bold;
display: inline-block;
width: fit-content;
color: ${theme.white};
cursor: pointer;

&:hover {
    opacity: 0.8;
}
&:focus {
    outline: none;
    border-color: ${theme.focus};
    box-shadow: 0px 0px 0px 3px ${theme.black};
}

&.secondary {
    background: transparent;
    border: 4px solid ${props => props.bg};
    color: ${theme.black};
}
`

export const ResourcesContainer = styled.div`
display: flex;
-webkit-flex-direction: row;
-moz-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
flex-wrap: wrap;
margin-top: -25px;
`
export const ResourcesInner = styled.div`
width: 100%;
@media screen and (min-width: ${theme.m}){
    width: calc(33% - 10px);
    margin-right: 15px;

    &:last-of-type {
        margin-right: 0;
    }
}
`
export const ResourcesTitle = styled.h4`
text-transform: uppercase;
font-size: 1.25rem;
letter-spacing: 0.5px;
color: ${theme.darkPurple};
margin-bottom: 15px;
svg {
    vertical-align: sub;
    height: 25px;
    width: auto;
    margin-right: 10px;
}
`

export const ResourcesList = styled.ul`
margin-top: 10px;
padding-left: 20px;
`
export const Resource = styled.li`
margin-bottom: 10px;
`