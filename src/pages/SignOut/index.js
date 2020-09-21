import React from 'react';
import { Button } from '../../components/Button';
import theme from "../../_theme";

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut} bg={theme.red}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
