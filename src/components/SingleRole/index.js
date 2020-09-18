import React, { useState } from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import Modal from 'react-modal';
import { RemoveScrollBar } from "react-remove-scroll-bar"
import { SecondaryButton } from '../../components/SecondaryButton';

const List = styled.ul`
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
const Outer = styled.li`
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
const RoleTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 5px;
    text-align: center;
    color: ${props => props.color ? props.color : theme.white};
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`
const RoleSubTitle = styled.h3`
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
const RoleSumary = styled.p`
    color: ${theme.white};
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`
const ModalActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const RoleInformation = styled.div`
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
const BreakTitle = styled.h4`
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
const CompetencyList = styled.div`
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
const SingleCompetency = styled.div`
    background: ${props => props.brand};
    color: ${theme.white};
    border-radius: 100%;
    font-weight: bold;
    position: relative;
    text-align: center;
    padding-top: 40%;    
    width: calc(40% - 10px);
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

        &:last-of-type {
            margin-right: 0;
        }
    }
`
const AttitudeList = styled(CompetencyList)`
`
const SingleAttitude = styled.div`
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
const SWContainer = styled.div`
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
const SWInner = styled.div`
    margin-right: 25px;
    &:last-of-type {
        margin-right: 0;
    }
`
const SWList = styled.ul`
    margin: 0;
    margin-top: 10px;
    padding-left: 25px;
` 
const SWItem = styled.li`

`
const CloseModal = styled(SecondaryButton)`

`

export const SingleRole = ({role}) => {
    Modal.setAppElement('body')
    const [showModal, setShowModal] = useState(false)

    function getBranding(brand) {
        return brand === "working_together" ? theme.orange : (brand === "learning" ? theme.purple : (brand === "leading_change" ? theme.red : theme.darkPurple))
    }
    function openModal(event) {
        event.preventDefault();
        event.stopPropagation();
        setShowModal(true);
    }
    function closeModal(event) {
        event.preventDefault();
        event.stopPropagation();
        setShowModal(false);
    }
    function keyPressed(condition) {
        setShowModal(condition ? false : true);
    }
    
    return(
        <Outer
            key={role.title}
            bg={getBranding(role.brand)} 
            onClick={openModal}
            data={`total-${role.total}`}
            onKeyPress={(e) => e.key === 'Enter' && keyPressed(showModal)}            
            tabIndex="0" 
            role="button" 
        >
            <RoleTitle>{role.title}</RoleTitle>
            <RoleSubTitle>{role.sub_title}</RoleSubTitle>
            <RoleSumary>Based on your selection you are <strong>{role.total > 60 ? "most" : role.total > 20 ? "quite" : "least"} likely</strong> to fit this role.</RoleSumary>
            <SecondaryButton classes="white-button" onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>Read more</SecondaryButton>

            <Modal 
                isOpen={showModal}
                contentLabel={role.title}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(60,18,82,0.8)'
                    },
                    content: {
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        width: '90%',
                        maxWidth: '600px',
                        border: `5px solid ${getBranding(role.brand)}`,
                        borderRadius: '0',
                        maxHeight: 'calc(100vh - 70px)',
                        overflow: 'scroll'
                    }
                }}
            >
                <RemoveScrollBar />
                <RoleInformation>
                    <RoleTitle color={getBranding(role.brand)}>{role.title}</RoleTitle>
                    <RoleSubTitle color={getBranding(role.brand)}>{role.sub_title}</RoleSubTitle>
                    {role.content && <p>{role.content}</p>}

                    <BreakTitle color={getBranding(role.brand)}>Competencies</BreakTitle>
                    {role.competencies && 
                        <CompetencyList>
                            {role.competencies.map(competency => (
                                <SingleCompetency key={competency.text} brand={getBranding(competency.brand)}><div className="text">{competency.text}</div></SingleCompetency>
                            ))}
                        </CompetencyList>
                    }
                    {role.attitudes && 
                        <>
                            <BreakTitle color={getBranding(role.brand)}>Attitudes</BreakTitle>
                            <AttitudeList>
                                {role.attitudes.map(attitude => (
                                    <SingleAttitude key={attitude.text}><span>{attitude.text}</span></SingleAttitude>
                                ))}
                            </AttitudeList>
                        </>
                    }
                    
                    <SWContainer>
                        <SWInner>
                            <span>Strengths</span>
                            <SWList>
                                {role.strengths.map(strength => (
                                    <SWItem key={strength.text}>{strength.text}</SWItem>
                                ))}
                            </SWList>  
                        </SWInner>
                        <SWInner>
                            <span>Weaknesses</span> 
                            <SWList>
                                {role.weaknesses.map(weakness => (
                                    <SWItem key={weakness.text}>{weakness.text}</SWItem>
                                ))}
                            </SWList>
                        </SWInner>  
                    </SWContainer>
                </RoleInformation>
                <ModalActions>
                    <CloseModal onClick={closeModal}>Close Modal</CloseModal>
                </ModalActions>
            </Modal>
        </Outer>
    )
}

export const RolesList = ({children}) => (
    <List>
        {children}
    </List>
);