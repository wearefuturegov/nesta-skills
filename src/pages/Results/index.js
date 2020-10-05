import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
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
import mostIcon from './mostBlack.svg';
import likelyIcon from './likelyBlack.svg';
import leastIcon from './leastBlack.svg';

import {
  AuthUserContext,
  withAuthorization,
} from '../Session';

const Section = styled.section`
`
const ColouredSection = styled.section`
  background: ${props => props.bg ? props.bg : theme.lightGrey};
  color: ${props => props.reverseText ? theme.white : theme.black};
  margin-top: ${props => props.topOfPage ? "-25px" : props.connected ? "-50px" : "50px"};
  margin-bottom: ${props => props.connected ? "-50px" : "50px"};
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

const Actions = styled.div`
  width: 100%;
  text-align: center;
`

const RatingIcon = styled.img`
  vertical-align: middle;
  margin-left: 3px;
  margin-right: -1px;
  margin-top: -3px;
`

const ResultsPage = ({skills, rolesContent, attitudes, fields}) => {
  const { title, body, RatingExplaination, pdf_0, not_signed_up_title, not_signed_up_body, title_2, body_2, title_3, body_3, title_4, body_4, title_5, body_5, title_6, body_6, pdf_1, pdf_2, title_7, body_7 } = fields;
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
        summary_text: role.summary_text,
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

                    <p>
                      {RatingExplaination}
                      <strong> <RatingIcon src={mostIcon} alt="" /> most</strong>,
                      <strong> <RatingIcon src={likelyIcon} alt="" /> quite</strong> or
                      <strong> <RatingIcon src={leastIcon} alt="" /> least </strong>
                      likely to suit you.
                    </p>

                    <RolesList>
                      {parsedTotals && parsedTotals.slice(0,3).map(role => (
                          <SingleRole key={role.title} role={role} />
                      ))}
                      {showRoles &&
                        <>
                          {parsedTotals && parsedTotals.slice(3,parsedTotals.length).map(role => (
                            <SingleRole key={role.title} role={role} />
                          ))}
                          <Actions>
                            {pdf_0 && <Button to={pdf_0} external>Download all roles PDF</Button>}
                            <ButtonSecondary classes="asblock" onClick={() => setShowRoles(false)}>Hide roles</ButtonSecondary>
                          </Actions>
                        </>
                      }
                    </RolesList>
                    {!showRoles &&<ButtonSecondary classes="asblock" onClick={() => setShowRoles(true)}>View all {parsedTotals.length} roles</ButtonSecondary>}
                  </ColouredSection>
                  <Section> 
                    {authUser.isAnonymous &&
                      <>
                        <h3>{not_signed_up_title}</h3>
                        <p>{not_signed_up_body}</p>
                        <Link to={ROUTES.SIGN_UP}>Sign up for an account to save your results</Link>
                        <hr />
                      </>
                    }
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
                  </Section>
                  <ColouredSection reverseText bg={theme.darkPurple}>
                    <h2>{title_3}</h2>
                    <Content source={body_3} />
                  </ColouredSection>
                  <ColouredSection connected>
                    <Section>
                      <h3>{title_4}</h3>
                      <Content source={body_4} />
                      <Button to={ROUTES.RESULTSTEAM}>See team activites</Button>
                    </Section>
                    <hr />  
                    <Section>
                      <h3>{title_5}</h3>
                      <Content source={body_5} />
                      <Button to={ROUTES.RESULTSSKILLS}>Develop your skills</Button>
                    </Section>
                    <hr />  
                    <Section>
                      <h3>{title_6}</h3>
                      <Content source={body_6} />
                      <Button to={pdf_1} external>Download Competency Framework PDF</Button>
                      <Button to={pdf_2} external>Download Practice Guide PDF</Button>
                    </Section>
                    <hr />  
                    <Section>
                      <h3>{title_7}</h3>
                      <Content source={body_7} />
                    </Section>
                  </ColouredSection>
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
  withAuthorization(condition),
)(ResultsPage);
