import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import Modal from 'react-modal';
import { RemoveScrollBar } from "react-remove-scroll-bar"
import Content from '../../components/Content'

const Outer = styled.li`
    padding: 15px;
    border: 5px solid ${props => props.bg};
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
const Inner = styled.div`
`

const SkillTitle = styled.p`

`
const SkillText = styled.p`

`
const ModalTitle = styled.h2`
    margin-top: 0;
`
const ModalLead = styled.p`
    font-size 1.5rem;
`
const ReadMore = styled.button`
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
const ModalActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const CloseModal = styled(ReadMore)`

`
const AddButton = styled.button`
    background: ${props => props.bg};
    padding: 15px 20px;
    border: 3px solid transparent;
    font-weight: bold;
    display: inline-block;
    width: fit-content;
    color: ${theme.white};
    
    &:hover {
        opacity: 0.8;
    }
    &:focus {
        outline: none;
        border-color: ${theme.focus};
        box-shadow: 0px 0px 0px 3px ${theme.black};
    }
`
export const SkillCard = ({skill, selectSkill, chosenSkills, maxSelectionNo}) => {
    Modal.setAppElement('body')
    const [showModal, setShowModal] = useState(false)
    const [isActive, setIsActive] = useState(chosenSkills.includes(skill.id))
    useEffect(() => {
        setIsActive(chosenSkills.includes(skill.id))
    }, [chosenSkills]);

    function getBranding(brand) {
        return brand === "working_together" ? theme.orange : (brand === "learning" ? theme.purple : (brand === "leading_change" ? theme.red : theme.darkPurple))
    }
    
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
                            borderRadius: '0'
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
