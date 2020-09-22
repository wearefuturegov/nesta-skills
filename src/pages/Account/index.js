import React from 'react';
import { compose } from 'recompose';
import SignOutButton from '../SignOut';
import DeleteButton from '../Delete';
import BodyClassName from 'react-body-classname';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <BodyClassName className="account_page">
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.username}</h1>
          {authUser.email && <p>Email: {authUser.email}</p>}
          {authUser.orgType && <p>What ‘level’ of government would you use to describe where you work: {authUser.orgType}</p>}
          {authUser.position && <p>Your position: {authUser.position}</p>}
          <SignOutButton />
          {/* <PasswordForgetForm /> */}
          <PasswordChangeForm />

          <h3>Would you like to delete all your user data?</h3>
          <p><strong>Warning</strong> if you delete this data you will not be able to reverse this action.</p>
          <DeleteButton currentUser={authUser} />
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
