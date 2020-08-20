import React, { useState } from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import theme from "../../_theme"
import Modal from 'react-modal';
import parse from 'html-react-parser';
import { RemoveScrollBar } from "react-remove-scroll-bar"

const Outer = styled.li`
    padding: 15px;
    border: 5px solid ${props => props.bg};
    width: 100%;
    margin-bottom: ${theme.standardSpace}px;
    display: flex;
    flex-direction: column;

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
        width: calc(33% - 54px);
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
const ModalContent = styled.div`

`
const ReadMore = styled.button`
    display: block;
    margin-top: auto;
`

export const SkillCard = ({skill}) => {
    const [showModal, setShowModal] = useState(false)
    return(
        <>
            <Outer bg={skill.brand === "working_together" ? theme.orange : (skill.brand === "leading_change" ? theme.purple : (skill.brand === "learning" ? theme.red : theme.darkPurple))}>
                <Inner>
                    <SkillTitle>{skill.title}</SkillTitle>
                    <SkillText>{skill.text}</SkillText>
                </Inner>
                {skill.content && <ReadMore onClick={() => setShowModal(true)}>Read more</ReadMore>}
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
                            width: '100%',
                            maxWidth: '600px',
                            border: `5px solid ${skill.brand === "working_together" ? theme.orange : (skill.brand === "leading_change" ? theme.purple : (skill.brand === "learning" ? theme.red : theme.darkPurple))}`,
                            borderRadius: '0'
                        }
                    }}
                >
                    <RemoveScrollBar />
                    <ModalTitle>{skill.title}</ModalTitle>
                    <ModalLead>{skill.text}</ModalLead>
                    <ModalContent>{parse(skill.content)}</ModalContent>
                    <button onClick={() => setShowModal(false)}>Close Modal</button>
                </Modal>
            }
        </>
    );
}
