import React from 'react';
import { Button } from '../../components/Button';
import theme from "../../_theme";

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut}>
    Sign Out of account
  </Button>
);

export default withFirebase(SignOutButton);
