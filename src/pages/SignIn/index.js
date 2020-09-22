import React, { Component, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Label, ErrorMessage } from '../../components/Forms/formsStyles';
import { Button } from "../../components/Button";
import { useToasts } from 'react-toast-notifications';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
  const { addToast } = useToasts()

  useEffect(() => {
    let deletedResponse = window.localStorage.getItem("nesta_user_deleted");
    if(deletedResponse) {
      if(deletedResponse === "true") {
        addToast("Sucessfully deleted all user data", {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 2500
        })
      } else if(deletedResponse === "error") {
        addToast("Sorry an error occurred, you may not have logged in recently enough to delete your data. Log out and back in in order to retry this.", {
          appearance: 'error',
          autoDismiss: false
        })
      }
      window.localStorage.setItem("nesta_user_deleted", "")
    }
  });
    
  return(
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  )
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    const currentStep = window.localStorage.getItem("nesta_progress");

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(currentStep === 0 || currentStep === "" || currentStep === null ? ROUTES.LANDING : currentStep === 5 ? ROUTES.SAVERESULTS : `/step_${currentStep}`);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}

        <Label>
          Email
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            autoComplete="email"
          />
        </Label>
        <Label>
          Password
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </Label>
        
        <Button disabled={isInvalid} type="submit" isButton>
          Sign In
        </Button>
      </form>
    );
  }
}
const SignInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
  </p>
);

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };
