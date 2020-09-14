import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import styled from "styled-components";
import theme from "../../_theme";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SingleRole } from "../../components/SingleRole";
import Modal from 'react-modal';
import { PieChart } from 'react-minimal-pie-chart';
import rolesContent from "../../data/roles.js"


import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';


const MoreBtn = styled.button`
  display: inline-block;
  padding: 15px ${theme.standardSpace}px;
  background: ${theme.darkPurple};
  color: ${theme.white};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: ${theme.standardSpace}px;
  border: none;
  cursor: pointer;
`
const Section = styled.section`
`
const ResultsPage = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  const [showModal, setShowModal] = useState(false)
  Modal.setAppElement('body')
  
  const parseTotals = (array) => {
    let tempArray = [];
    rolesContent.map((role, index) => {
      tempArray = [...tempArray, {
        id: role.id,
        total: parseInt(array[index+1]),
        title: role.title
      }]
    });
    return tempArray;
  }
  
  useEffect(() => {
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
    <AuthUserContext.Consumer>
      {authUser => {
        if(currentStep !== 6) {
          history.push(ROUTES.LANDING)
        } else {
          let parsedTotals = false;
          if(authUser.roleTotals) { 
            parsedTotals = parseTotals(authUser.roleTotals).sort((a, b) => (a.total < b.total) ? 1 : -1);
          }
          return(
          <>
            <Section>
                <h1>Your results</h1>
                <p>Based upon the strengths you have provided, these are the roles we think you are best suited to play:</p>
                {parsedTotals && parsedTotals.slice(0,3).map(role => (
                    <SingleRole key={role.title} role={role} />
                ))}
                
                <MoreBtn onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>View all roles</MoreBtn>
                <Modal 
                    isOpen={showModal}
                    contentLabel="View all roles"
                    onRequestClose={openModal}
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
                            maxHeight: 'calc(100% - 80px)',
                            overflow: 'scroll',
                            border: `5px solid ${theme.darkPurple}`,
                            borderRadius: '0'
                        }
                    }}
                >
                    {parsedTotals && parsedTotals.map(role => (
                        <SingleRole key={role.title} role={role} />
                    ))}
                </Modal>
            </Section>
            <Section>
                <h2>Your strongest skills</h2>
                {/* TODO NEED TO REPLACE VALUES WITH NUMBER OF SKILLS */}
                {/* <PieChart
                    data={[
                        { title: 'Working Together', value: 1, color: theme.orange },
                        { title: 'Learning', value: 5, color: theme.purple },
                        { title: 'Leading Change', value: 2, color: theme.red },
                        ]}
                    label={({ dataEntry }) => dataEntry.title}
                    labelStyle={(index) => ({
                        // fill: dataMock[index].color,
                        fontSize: '2px',
                    })}
                    radius={42}
                    labelPosition={112}
                /> */}
            </Section>
          </>
        )}
      }}
    </AuthUserContext.Consumer>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(ResultsPage);
