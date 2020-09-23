import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import Modal from 'react-modal';
import { RemoveScrollBar } from "react-remove-scroll-bar"
import Content from '../../components/Content'

import { ReadIcon, WatchIcon, UseIcon } from '../../pages/ResultsSkillsDevelopmentPage/Icons';
import { Outer, Inner, SkillTitle, SkillText, ReadMore, ModalTitle, ModalLead, ModalActions, CloseModal, AddButton, ResourcesContainer, ResourcesInner, ResourcesTitle, ResourcesList, Resource } from './SkillCardStyles'
import { getBranding } from '../../util/utils'


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
                isButton={2}
                id={`skill_${skill.id}`}
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
                          backgroundColor: 'rgba(60,18,82,0.8)',
                          zIndex: '998'
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
                            overflow: 'scroll',
                            zIndex: '999'
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

export const SkillCardDevelopment = ({skill}) => {
    Modal.setAppElement('body')
    const [showModal, setShowModal] = useState(false)

    function openModal(event) {
        event.preventDefault();
        event.stopPropagation();
        setShowModal(true);
    }

    return(
        <>
            <Outer 
                bg={getBranding(skill.brand)} 
                isButton={1}
                onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && openModal(e)}
                tabIndex="0" 
                role="button" 
                isButton={2}
            >
                <Inner>
                    <SkillTitle>{skill.title}</SkillTitle>
                    <SkillText>{skill.text}</SkillText>
                </Inner>
                {skill.content && 
                    <ReadMore onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>See development resources</ReadMore>
                }
            </Outer>
            {skill.content && 
                <Modal 
                    isOpen={showModal}
                    contentLabel={skill.title}
                    onRequestClose={() => setShowModal(false)}
                    style={{
                        overlay: {
                          backgroundColor: 'rgba(60,18,82,0.8)',
                          zIndex: '998'
                        },
                        content: {
                            transform: 'translate(-50%, -50%)',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: '90%',
                            maxWidth: '1200px',
                            border: `5px solid ${getBranding(skill.brand)}`,
                            borderRadius: '0',
                            maxHeight: 'calc(100vh - 70px)',
                            overflow: 'scroll',
                            zIndex: '999'
                        }
                    }}
                >
                    <RemoveScrollBar />
                    <ModalTitle>{skill.title}</ModalTitle>
                    <ModalLead>{skill.text}</ModalLead>

                    {(skill.read || skill.watch || skill.use) ?
                        <>
                        <h3>Development resources</h3> 
                        <ResourcesContainer>
                            {skill.read &&
                                <ResourcesInner>
                                    <ResourcesTitle>
                                        <ReadIcon />
                                        Read
                                    </ResourcesTitle>
                                    <ResourcesList>
                                        {skill.read.map(resource => 
                                            <Resource><a href={resource.url} target="_blank" title="Open link in new tab">{resource.text}</a></Resource>    
                                        )}
                                    </ResourcesList>
                                </ResourcesInner>
                            }
                            {skill.watch &&
                                <ResourcesInner>
                                    <ResourcesTitle>
                                        <WatchIcon />
                                        Watch</ResourcesTitle>
                                    <ResourcesList>
                                        {skill.watch.map(resource => 
                                            <Resource><a href={resource.url} target="_blank" title="Open link in new tab">{resource.text}</a></Resource>    
                                        )}
                                    </ResourcesList>
                                </ResourcesInner>
                            }
                            {skill.use &&
                                <ResourcesInner>
                                    <ResourcesTitle>
                                        <UseIcon />
                                        Use
                                    </ResourcesTitle>
                                    <ResourcesList>
                                        {skill.use.map(resource => 
                                            <Resource><a href={resource.url} target="_blank" title="Open link in new tab">{resource.text}</a></Resource>    
                                        )}
                                    </ResourcesList>
                                </ResourcesInner>
                            }
                        </ResourcesContainer>
                        <hr />
                        </>
                        :
                        <p><strong>There are not any resources currently for this skill, please check back later.</strong></p>
                    }
                    <h3>{`About ${skill.title}`}</h3>
                    <Content source={skill.content} />
                    <ModalActions>
                        <CloseModal onClick={() => setShowModal(false)}>Close Modal</CloseModal>
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
