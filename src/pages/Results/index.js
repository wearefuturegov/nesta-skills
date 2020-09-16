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

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';


const MoreBtn = styled(Button)`
  margin: 0 auto;
  z-index: 1;
  display: block;
  width: fit-content;
`
const Section = styled.section`
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
const ResultsPage = ({skills, rolesContent, fields}) => {
  const { title, body } = fields;
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
    if(currentStep !== 6) {
      history.push(ROUTES.LANDING);
    } else {
      window.localStorage.setItem("nesta_pro_skills", "");
      window.localStorage.setItem("nesta_con_skills", "");
      window.localStorage.setItem("nesta_pro_attitudes", "");
      window.localStorage.setItem("nesta_con_attitudes", "");
    }
  }, []);

  function openModal(event) {
    event.preventDefault();
    event.stopPropagation();
    setShowModal(showModal ? false : true);
  }

  return(
    <BodyClassName className="results_page">
      <AuthUserContext.Consumer>
        {authUser => {
          if(currentStep !== 6) {
            history.push(ROUTES.LANDING)
          } else {
            let parsedTotals = false;
            let parsedSkills = false;
            if(authUser.roleTotals) { 
              parsedTotals = parseTotals(authUser.roleTotals).sort((a, b) => (a.total < b.total) ? 1 : -1);
              parsedSkills = parseSkills(authUser.proSkills);
            }
            return(
              parsedTotals ?
                <>
                  <Section>
                    <h1>{title}</h1>
                    <Content source={body} />
                  </Section>

                  <Section>
                    <RolesList>
                      {parsedTotals && parsedTotals.slice(0,3).map(role => (
                          <SingleRole key={role.title} role={role} />
                      ))}
                      {showRoles &&
                        <>
                          {parsedTotals && parsedTotals.slice(3,parsedTotals.length).map(role => (
                            <SingleRole key={role.title} role={role} />
                          ))}
                          <MoreBtn onClick={() => setShowRoles(false)}>Hide roles</MoreBtn>
                        </>
                      }
                    </RolesList>
                    {!showRoles &&<MoreBtn onClick={() => setShowRoles(true)}>View all roles</MoreBtn>}
                  </Section>
                  <Section> 
                      <h2>Your strongest skills</h2>
                      <PieContainer>
                        <PieChart
                            data={[
                                { title: 'Working Together', value: parsedSkills.filter(skill => skill.brand === "working_together").length, color: theme.orange },
                                { title: 'Learning', value: parsedSkills.filter(skill => skill.brand === "learning").length, color: theme.purple },
                                { title: 'Leading Change', value: parsedSkills.filter(skill => skill.brand === "leading_change").length, color: theme.red },
                                ]}
                            label={({ dataEntry }) => dataEntry.title}
                            labelStyle={(index) => ({
                                // fill: dataMock[index].color,
                                fontSize: '2px',
                            })}
                            radius={30}
                            labelPosition={112}
                        />
                      </PieContainer>
                  </Section>
                </>
              :
              <p>Loading...</p>
            )
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
