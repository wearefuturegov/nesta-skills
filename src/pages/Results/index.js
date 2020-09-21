import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import styled from "styled-components";
import theme from "../../_theme";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SingleRole, RolesList } from "../../components/SingleRole";
import Modal from 'react-modal';
import { PieChart } from 'react-minimal-pie-chart';
import { withFirebase } from '../Firebase';
import BodyClassName from 'react-body-classname';
import { Button } from '../../components/Button';
import Content from '../../components/Content';
import { RemoveScrollBar } from "react-remove-scroll-bar"
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { SkillCardLite, SkillsContainer } from "../../components/SkillCard";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

const Section = styled.section`
`
const ColouredSection = styled.section`
  background: ${props => props.bg ? props.bg : theme.lightGrey};
  color: ${props => props.reverseText ? theme.white : theme.black};
  margin-top: ${props => props.topOfPage ? "-25px" : "50px"};
  margin-bottom: 50px;
  padding: 25px 0;
  position: relative;
  h1 {
    margin-top: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -9998px;
    right: 0px;
    box-shadow: ${props => props.bg ? props.bg : theme.lightGrey} 9999px 0px 0px;
    border-left: 9999px solid ${props => props.bg ? props.bg : theme.lightGrey};
    z-index: -1;
  }
`
const PieContainer = styled.div`
  max-width: 500px;
  z-index: -1;

  svg {
    margin-top: 0;
    margin-left: -50px;
    z-index: -1;
  }
`
const CloseModal = styled(ButtonSecondary)`

`
const ModalActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const ModalTitle = styled.h3`
  margin-top: 0;
`
const RowContainer = styled.div`
  @media screen and (min-width: ${theme.m}){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`
const Half = styled.div`
  margin-bottom: 15px;
  width: 100%;
  @media screen and (min-width: ${theme.m}){
    margin-right: 15px;
    margin-bottom: 0;
    width: calc(50% - 8px);
    &:last-of-type {
      margin-right: 0;
    }
  }

  svg {
    margin-top: -75px;
  }
  .skill-card {
    width: 100%;
    margin-right: 0;
  }
`
const StyledSkillsContainer = styled(SkillsContainer)`
  margin-top: 0;
`
const WeakSkillsContainer = styled.div`
  margin-top: -96px;
`

const ResultsPage = ({skills, rolesContent, attitudes, fields}) => {
  const { title, body, title_2, body_2, title_3, body_3, title_4, body_4, title_5, body_5 } = fields;
  const history = useHistory();
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [showModal, setShowModal] = useState(false)
  const [showRoles, setShowRoles] = useState(false)
  Modal.setAppElement('body')
  
  const parseTotals = (array) => {
    let tempArray = [];
    rolesContent.map((role, index) => {
      tempArray = [...tempArray, {
        id: role.id,
        total: parseInt(array[index+1]),
        title: role.title,
        sub_title: role.sub_title,
        brand: role.brand,
        competencies: role.competencies,
        strengths: role.strengths,
        weaknesses: role.weaknesses,
        attitudes: role.attitudes,
        content: role.content
      }]
    });
    return tempArray;
  }

  const parseSkills = (array) => {
    let tempArray = [];
    skills.map((skill) => {
      if(array.includes(skill.id)) {
        tempArray = [...tempArray, skill]
      }
    });
    return tempArray;
  }
  const parseAttitudes = (array) => {
    let tempArray = [];
    attitudes.map((attitude) => {
      if(array.includes(attitude.id)) {
        tempArray = [...tempArray, attitude]
      }
    });
    return tempArray;
  }
  
  useEffect(() => {
    // if(!window.localStorage.getItem("nesta_results_reload")) {
    //   window.localStorage.setItem("nesta_results_reload", true);
    //   // window.location.reload();
    // } else {
    //   window.localStorage.removeItem("nesta_results_reload");
    // }
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }, []);

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
    <BodyClassName className="results_page">
      <AuthUserContext.Consumer>
        {authUser => {
          console.log(authUser)
          if(authUser.roleTotals || currentStep === 6) {
            console.log('auth user - parse totals');
            let parsedTotals = false;
            let parsedProSkills = false;
            let parsedConSkills = false;
            let parsedProAttitudes = false;
            let parsedConAttitudes = false;
            if(authUser.roleTotals) { 
              parsedTotals = parseTotals(authUser.roleTotals).sort((a, b) => (a.total < b.total) ? 1 : -1);
              parsedProSkills = parseSkills(authUser.proSkills);
              parsedConSkills = parseSkills(authUser.conSkills);
              parsedProAttitudes = parseAttitudes(authUser.proAttitudes);
              parsedConAttitudes = parseAttitudes(authUser.conAttitudes);
            }
            return(
              parsedTotals ?
                <>
                  <ColouredSection topOfPage>
                    <h1>{title}</h1>
                    <Content source={body} />

                    <RolesList>
                      {parsedTotals && parsedTotals.slice(0,3).map(role => (
                          <SingleRole key={role.title} role={role} />
                      ))}
                      {showRoles &&
                        <>
                          {parsedTotals && parsedTotals.slice(3,parsedTotals.length).map(role => (
                            <SingleRole key={role.title} role={role} />
                          ))}
                          <ButtonSecondary classes="asblock" onClick={() => setShowRoles(false)}>Hide roles</ButtonSecondary>
                        </>
                      }
                    </RolesList>
                    {!showRoles &&<ButtonSecondary classes="asblock" onClick={() => setShowRoles(true)}>View all {parsedTotals.length} roles</ButtonSecondary>}
                  </ColouredSection>
                  <Section> 
                    <h3>{title_2}</h3>
                    <Content source={body_2} />
                    <Button onClick={openModal}>View your skills selection</Button>
                    <Modal 
                      isOpen={showModal}
                      contentLabel={title_2}
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
                              maxWidth: '1000px',
                              border: `5px solid ${theme.darkPurple}`,
                              borderRadius: '0',
                              maxHeight: 'calc(100vh - 70px)',
                              overflow: 'scroll'
                          }
                      }}
                    >
                      <RemoveScrollBar />
                      <ModalTitle>{title_2}</ModalTitle>
                      <Content source={body_2} />
                      
                      <RowContainer>
                        <Half>
                          <h3>Your strongest skills</h3>
                          {parsedProSkills &&
                            <StyledSkillsContainer>
                              {parsedProSkills.map(skill => (
                                <SkillCardLite
                                  key={skill.id} 
                                  skill={skill} 
                                />
                              ))}
                            </StyledSkillsContainer>
                          }
                        </Half>
                        <Half>
                          <h3>Your skills across the 3 main areas</h3>
                          <PieContainer>
                            <PieChart
                                data={[
                                    { title: 'Working Together', value: parsedProSkills.filter(skill => skill.brand === "working_together").length, color: theme.orange },
                                    { title: 'Learning', value: parsedProSkills.filter(skill => skill.brand === "learning").length, color: theme.purple },
                                    { title: 'Leading Change', value: parsedProSkills.filter(skill => skill.brand === "leading_change").length, color: theme.red },
                                    ]}
                                label={({ dataEntry }) => dataEntry.title}
                                labelStyle={(index) => ({
                                    fontSize: '2px',
                                })}
                                radius={30}
                                labelPosition={112}
                            />
                          </PieContainer>
                          <WeakSkillsContainer>
                            <h3>Your weakest skills</h3>
                            {parsedConSkills &&
                                <StyledSkillsContainer>
                                  {parsedConSkills.map(skill => (
                                    <SkillCardLite
                                      key={skill.id} 
                                      skill={skill} 
                                    />
                                  ))}
                                </StyledSkillsContainer>
                              }
                            </WeakSkillsContainer>
                        </Half>
                      </RowContainer>
                      <br/>
                      <h2>Your attitudes selection</h2>
                      <RowContainer>
                        <Half>
                          <h3>The attitudes that most describe you</h3>
                          {parsedProAttitudes &&
                            <StyledSkillsContainer>
                              {parsedProAttitudes.map(skill => (
                                <SkillCardLite
                                  key={skill.id} 
                                  skill={skill} 
                                />
                              ))}
                            </StyledSkillsContainer>
                          }
                        </Half>
                        <Half>
                          <h3>The attitude that least describe you</h3>
                          {parsedConAttitudes &&
                            <StyledSkillsContainer>
                              {parsedConAttitudes.map(skill => (
                                <SkillCardLite
                                  key={skill.id} 
                                  skill={skill} 
                                />
                              ))}
                            </StyledSkillsContainer>
                          }
                        </Half>
                      </RowContainer>
                      <ModalActions>
                          <CloseModal onClick={closeModal}>Close Modal</CloseModal>
                      </ModalActions>
                    </Modal>
                    
                    <hr />

                    <h2>{title_3}</h2>
                    <Content source={body_3} />

                  </Section>
                  <ColouredSection reverseText bg={theme.darkPurple}>
                    <h3>{title_4}</h3>
                    <Content source={body_4} />
                    <Button reverse="true" to={ROUTES.RESULTSTEAM}>See team activites</Button>
                  </ColouredSection>
                  <Section>
                    <h3>{title_5}</h3>
                    <Content source={body_5} />
                    <Button to={ROUTES.RESULTSSKILLS}>Develop your skills</Button>
                  </Section>
                </>
              :
              <>
                <p>Loading...</p>
              </>
            )
          } else {
            history.push(ROUTES.LANDING)
          }
        }}
      </AuthUserContext.Consumer>
    </BodyClassName>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(ResultsPage);
