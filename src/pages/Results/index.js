import React from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

const ResultsPage = () => (
  
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Results Page{authUser.username && ` - ${authUser.username}`}</h1>

        <p>This Page is accessible only by signed in users.</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(ResultsPage);
