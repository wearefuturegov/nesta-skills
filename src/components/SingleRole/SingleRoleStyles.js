import styled from "styled-components"
import theme from "./../../_theme"
import { ButtonSecondary } from '../../components/ButtonSecondary';

export const List = styled.ul`
list-style-type: none;
padding: 0;
margin: 0;
margin-top: 25px;
display: flex;
-webkit-flex-direction: row;
-moz-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
flex-wrap: wrap;
`
export const Outer = styled.li`
padding: 15px;
background: ${props => props.bg};
width: 100%;
margin-bottom: ${theme.standardSpace}px;
display: flex;
flex-direction: column;
cursor: pointer;

&:hover {
    opacity: 0.8;
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
export const RoleTitle = styled.h2`
margin-top: 0;
margin-bottom: 5px;
text-align: center;
color: ${props => props.color ? props.color : theme.white};
text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`
export const RoleSubTitle = styled.h3`
margin-top: 0;
margin-bottom: 10px;
text-transform: uppercase;
letter-spacing: 0.5px;
font-size: 1rem;
font-weight: bold;
text-align: center;
color: ${props => props.color ? props.color : theme.white};
text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`
export const RoleSumary = styled.p`
color: ${theme.white};
text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`
export const ModalActions = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
export const RoleInformation = styled.div`
h2 {
    font-size: 1.75rem;
    margin-bottom: 0;
    font-weight: bold;
}
h3 {
    font-size: 1.25rem;
    font-weight: bold;
}
p {
    font-size: 1.25rem;
}
`
export const BreakTitle = styled.h4`
text-transform: uppercase;
color: ${props => props.color};
margin-top: 15px;
margin-bottom: 20px;
text-align: center;
font-size: 0.8rem;
letter-spacing: 1px;
font-weight: bold;
display: flex;
width: 100%;
justify-content: center;
align-items: center;
text-align: center;

&:before,
&:after {
    content: '';
    border-top: 2px solid;
    margin: 0 10px 0 0;
    flex: 1 0 10px;
}
&:after {
    margin: 0 0 0 10px;
}

@media screen and (min-width: ${theme.m}){
    margin-top: 35px;
}
`
export const CompetencyList = styled.div`
display: flex;
-webkit-flex-direction: row;
-moz-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
flex-wrap: wrap;
align-items: stretch;
padding: 15px;
justify-content: center;

@media screen and (min-width: ${theme.m}){
    padding: 0;
}
`
export const SingleCompetency = styled.div`
background: ${props => props.brand};
color: ${theme.white};
border-radius: 100%;
font-weight: bold;
position: relative;
text-align: center;
padding-top: 40%;    
width: calc(45% - 10px);
margin-right: 10px;
margin-bottom: 10px;

&:nth-type(2n) {
    margin-right: 0;
}

.text {
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
    line-height: 1.3;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    position: absolute;
    padding: 10px;
}
@media screen and (min-width: ${theme.m}){
    flex: calc(25% - 8px);
    margin-right: 10px;
    padding-top: 25%;    
    width: calc(40% - 10px);

    &:last-of-type {
        margin-right: 0;
    }
}
`
export const AttitudeList = styled(CompetencyList)`
`
export const SingleAttitude = styled.div`
border: 3px solid ${theme.darkPurple};
margin-right: 10px;
text-align: center;
font-weight: bold;
padding: 10px 15px;
display: flex;
align-items: center;
width: calc(50% - 46px);
margin-bottom: 10px;
&:nth-type(2n) {
    margin-right: 0;
}

span {
    display: block;
    width: 100%;
}

@media screen and (min-width: ${theme.m}){
    width: calc(25% - 44px);
    margin-bottom: 0px;

    &:last-of-type {
        margin-right: 0;
    }
}

`
export const SWContainer = styled.div`
display: flex;
margin-top: 15px;
margin-bottom: 25px;
span {
    font-weight: bold;
}
@media screen and (min-width: ${theme.m}){
    margin-top: 35px;
}
`
export const SWInner = styled.div`
margin-right: 25px;
&:last-of-type {
    margin-right: 0;
}
`
export const SWList = styled.ul`
margin: 0;
margin-top: 10px;
padding-left: 25px;
` 
export const SWItem = styled.li`

`
export const CloseModal = styled(ButtonSecondary)`

`

export const RoleRating = styled(RoleSumary)`

`
export const RatingIcon = styled.img`
    vertical-align: middle;
    margin-right: 3px;
    margin-top: -3px;
`
export const RatingIconBig = styled(RatingIcon)`
    width: 15px;
    height: auto;
`