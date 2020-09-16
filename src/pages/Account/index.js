import React, { Component } from 'react';
import { compose } from 'recompose';
import SignOutButton from '../SignOut';
import BodyClassName from 'react-body-classname';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  }
];

const AccountPage = () => (
  <BodyClassName className="account_page">
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.email}</h1>
          {authUser.orgType && <p>Org type: {authUser.orgType}</p>}
          {/* <PasswordForgetForm /> */}
          <PasswordChangeForm />
          <SignOutButton />
        </div>
      )}
    </AuthUserContext.Consumer>
  </BodyClassName>
);


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
