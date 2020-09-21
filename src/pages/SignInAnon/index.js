import React from "react";
import { withRouter } from 'react-router-dom';
import { Button } from '../../components/Button';
import { withFirebase } from '../Firebase';
import * as ERRORS from '../../constants/errors';
import * as ROUTES from '../../constants/routes';

import { Small } from '../../components/Forms/formsStyles';

 /**
   * When we click to sign in anonymously we need to call doSignInAnonymously
   * create the user
   * then add them into the db
   * then we add in the extra gubbins in the saveresults step.
   * https://firebase.google.com/docs/auth/web/anonymous-auth
   * @param {event} e 
   */


const SignInAnonButtonBase = (props) => {

  const signInAnon = () => {
    props.firebase
    .doSignInAnonymously()
    .then(authUser => {
      // Create a user in your Firebase realtime database
      return props.firebase.user(authUser.user.uid).set({
        isAnonymous: true,
        username: "anonymous",
        roles: []
      });
    })
    .then(() => {
      props.history.push(ROUTES.SAVERESULTS);
    })
    .catch(error => {
      if (error.code === ERRORS.ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERRORS.ERROR_MSG_ACCOUNT_EXISTS;
      }
      // TODO error handling - return to step 5 and show error in toast?
    });
  
  }
 
return (
  <React.Fragment>
    <Button onClick={signInAnon}>Continue without registration</Button> 
    <Small>(You can choose to register an account later)</Small>
  </React.Fragment>
)


}

const SignInAnonButton = withRouter(withFirebase(SignInAnonButtonBase));

export { SignInAnonButton };
