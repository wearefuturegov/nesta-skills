import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import Modal from 'react-modal';
import { RemoveScrollBar } from "react-remove-scroll-bar"
import Content from '../../components/Content'
import { SecondaryButton } from '../../components/SecondaryButton';

export const SkillsContainer = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: ${theme.standardSpace}px;
`

const Outer = styled.li`
    padding: ${props => props.isButton ? "15px" : "10px"};
    border: ${props => props.isButton ? `5px solid ${props.bg}` : `3px solid ${props.bg}`};
    width: 100%;
    margin-bottom: ${props => props.isButton ? `${theme.standardSpace}px` : "15px"};
    display: flex;
    flex-direction: column;
    cursor: ${props => props.isButton ? "pointer" : "default"};
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
const Inner = styled.div`
`

const SkillTitle = styled.h3`
    margin-top: 0;
`
const SkillText = styled.p`

`
const ModalTitle = styled.h2`
    margin-top: 0;
`
const ModalLead = styled.p`
    font-size 1.5rem;
`
const ReadMore = styled(SecondaryButton)`

`
const ModalActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const CloseModal = styled(SecondaryButton)`

`
const AddButton = styled.button`
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

function getBranding(brand) {
    return brand === "working_together" ? theme.orange : (brand === "learning" ? theme.purple : (brand === "leading_change" ? theme.red : theme.darkPurple))
}

export const SkillCard = ({skill, selectSkill, chosenSkills, maxSelectionNo}) => {
    Modal.setAppElement('body')
    const [showModal, setShowModal] = useState(false)
    const [isActive, setIsActive] = useState(chosenSkills.includes(skill.id))
    useEffect(() => {
        setIsActive(chosenSkills.includes(skill.id))
    }, [chosenSkills]);
    
    function openModal(event) {
        event.preventDefault();
        event.stopPropagation();
        setShowModal(true);
    }

    return(
        <>
            <Outer 
                bg={getBranding(skill.brand)} 
                onClick={() => selectSkill(skill)} 
                onKeyPress={(e) => e.key === 'Enter' && selectSkill(skill)}
                className={isActive ? "active" : ""}
                tabIndex="0" 
                role="button" 
                aria-pressed={isActive ? "true" : "false"}
                isButton
            >
                <Inner>
                    <SkillTitle>{skill.title}</SkillTitle>
                    <SkillText>{skill.text}</SkillText>
                </Inner>
                {skill.content && 
                    <ReadMore onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>Read more</ReadMore>
                }
            </Outer>
            {skill.content && 
                <Modal 
                    isOpen={showModal}
                    contentLabel={skill.title}
                    onRequestClose={() => setShowModal(false)}
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
                            border: `5px solid ${getBranding(skill.brand)}`,
                            borderRadius: '0',
                            maxHeight: 'calc(100vh - 70px)',
                            overflow: 'scroll'
                        }
                    }}
                >
                    <RemoveScrollBar />
                    <ModalTitle>{skill.title}</ModalTitle>
                    <ModalLead>{skill.text}</ModalLead>
                    <Content source={skill.content} />
                    <ModalActions>
                        <CloseModal onClick={() => setShowModal(false)}>Close Modal</CloseModal>
                        {chosenSkills.length === maxSelectionNo && !isActive ? 
                            <span>You cannot select more than {maxSelectionNo} skills</span>
                            :
                            <AddButton 
                                bg={getBranding(skill.brand)} 
                                onClick={() => { selectSkill(skill); setShowModal(false);}}
                                className={isActive && "secondary"}
                            >
                                { isActive ? "Remove" : "Select"} this skill
                            </AddButton>
                        }
                    </ModalActions>
                </Modal>
            }
        </>
    );
}


export const SkillCardLite = ({skill}) => 
    <Outer 
        bg={getBranding(skill.brand)} 
        className="skill-card"
    >
        <Inner>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillText>{skill.text}</SkillText>
        </Inner>
    </Outer>
