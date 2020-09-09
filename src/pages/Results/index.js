import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import styled from "styled-components";
import theme from "../../_theme";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import rolesContent from "../../data/roles.js"
import { SingleRole } from "../../components/SingleRole";
import Modal from 'react-modal';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';


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

const ResultsPage = () => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  Modal.setAppElement('body')
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.localStorage.setItem("nesta_pro_skills", "");
    window.localStorage.setItem("nesta_con_skills", "");
    window.localStorage.setItem("nesta_pro_attitudes", "");
    window.localStorage.setItem("nesta_con_attitudes", "");
    setCurrentStep(0);
  }, [currentStep]);

  const parseTotals = (array) => {
    let tempArray = [];
    rolesContent.map((role, index) => {
      tempArray = [...tempArray, {
        id: role.id-1,
        total: parseInt(array[index+1])
      }]
    });
    return tempArray;
  }
  
  function openModal(event) {
    event.preventDefault();
    event.stopPropagation();
    setShowModal(true);
  }

  return(
    <AuthUserContext.Consumer>
      {authUser => {
        let parsedTotals = parseTotals(authUser.roleTotals).sort((a, b) => (a.total < b.total) ? 1 : -1);
        return(
          <div>
            <h1>{authUser.username && `${authUser.username}'s results`}</h1>
            <p>Based upon the strengths you have provided, these are the roles we think you are best suited to play:</p>
            {parsedTotals.slice(0,3).map(role => (
              <SingleRole key={role.id} role={role} />
            ))}
            <ReadMore onClick={openModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>View all roles</ReadMore>
            <Modal 
                isOpen={showModal}
                contentLabel="View all roles"
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
                        maxHeight: 'calc(100% - 80px)',
                        overflow: 'scroll',
                        border: `5px solid ${theme.darkPurple}`,
                        borderRadius: '0'
                    }
                }}
            >
                {parsedTotals.map(role => (
                <SingleRole key={role.id} role={role} />
                ))}
            </Modal>
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(ResultsPage);
