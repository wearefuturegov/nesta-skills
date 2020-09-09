import React, { Component, useEffect } from 'react';
import { compose } from 'recompose';
import styled from "styled-components";
import theme from "../../_theme";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import resultsContent from "../../data/roles.js"
import { SingleRole } from "../../components/SingleRole";
import Modal from 'react-modal';
import { PieChart } from 'react-minimal-pie-chart';
import { withFirebase } from '../Firebase';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';


const MoreBtn = styled.button`

`
const Section = styled.section`
`
const ResultsPage = () => {
  const [currentStep, setCurrentStep] = useLocalStorage("nesta_progress");
  Modal.setAppElement('body')
  const ResultsContent = withFirebase(ResultsContentGenerate);
  
  useEffect(() => {
    window.localStorage.setItem("nesta_pro_skills", "");
    window.localStorage.setItem("nesta_con_skills", "");
    window.localStorage.setItem("nesta_pro_attitudes", "");
    window.localStorage.setItem("nesta_con_attitudes", "");
    setCurrentStep(0);
  }, [currentStep]);

  return(
    <AuthUserContext.Consumer>
      {authUser => {
        return(
            <ResultsContent authUserRoles={authUser.roleTotals}  />
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

class ResultsContentGenerate extends Component {
    constructor(props) {
      super(props);        

      this.state = {
        loading: false,
        data: [],
        yourRoleScores: props.authUserRoles,
      };
    }
  
    componentDidMount() {
      this.setState({ loading: true });
  
      this.props.firebase.roles().on('value', snapshot => {
        const dataObject = snapshot.val();
        
        dataObject.map((role, index) => {
            role.total = this.state.yourRoleScores[index]
        })
  
        this.setState({
            rolesData: dataObject.sort((a, b) => (parseInt(a.total) < parseInt(b.total)) ? 1 : -1),
            loading: false,
            showModal: false
        });
      });
    }
  
    componentWillUnmount() {
      this.props.firebase.roles().off();
    }

    showModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showModal: true });
        
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };
  
    render() {
        const { rolesData, loading, yourRoleScores } = this.state;
  
      return (
        loading ? 
          <div>Loading ...</div>
          :
          <>
            <Section>
                <h1>Your results</h1>
                <p>Based upon the strengths you have provided, these are the roles we think you are best suited to play:</p>
                {rolesData && rolesData.slice(0,3).map(role => (
                    <SingleRole key={role.title} role={role} />
                ))}
                
                <MoreBtn onClick={this.showModal} onKeyPress={(e) => e.key === 'Enter' && e.stopPropagation()}>View all roles</MoreBtn>
                <Modal 
                    isOpen={this.state.showModal}
                    contentLabel="View all roles"
                    onRequestClose={this.hideModal}
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
                    {rolesData && rolesData.map(role => (
                        <SingleRole key={role.title} role={role} />
                    ))}
                </Modal>
            </Section>
            <Section>
                <h2>Your strongest skills</h2>
                {/* TODO NEED TO REPLACE VALUES WITH NUMBER OF SKILLS */}
                <PieChart
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
                />
            </Section>
          </>
      );
    }
}