import React from 'react';
import styled from "styled-components";
import theme from "../../_theme";
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { SecondaryButton } from "../../components/SecondaryButton";

const EmailVerify = styled.div`
  max-width: 400px;
  padding-top: 50px;
  margin: 0 auto;
  text-align: center;
`

const ConfirmationText = styled.p`
  font-weight: bold;
  color: ${theme.green};
`

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <EmailVerify>
                <h1>Verify your E-Mail</h1>
                {this.state.isSent && <ConfirmationText>Email sent</ConfirmationText>}
                <p>Check you E-Mails (including your spam folder) for a confirmation email.</p>
                <SecondaryButton
                  isButton
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Re-send confirmation E-Mail
                </SecondaryButton>
                {/* <SignOutButton /> */}
              </EmailVerify>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
