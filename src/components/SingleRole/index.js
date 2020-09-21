import React, { useState } from 'react';
import Modal from 'react-modal';
import { RemoveScrollBar } from "react-remove-scroll-bar"
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { getBranding } from '../../util/utils'
import { Outer, RoleTitle, RoleSubTitle, RoleSumary, RoleInformation, BreakTitle, CompetencyList, SingleCompetency, AttitudeList, SingleAttitude, SWContainer, SWInner, SWList, SWItem, ModalActions, CloseModal, List }  from './SingleRoleStyles'


export const SingleRole = ({role}) => {
    Modal.setAppElement('body')
    const [showModal, setShowModal] = useState(false)
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
            <ButtonSecondary classes="white-button" onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>Read more</ButtonSecondary>

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