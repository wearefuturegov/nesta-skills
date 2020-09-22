import React from 'react';
import { Button } from '../../components/Button';
import theme from "../../_theme";
import { withFirebase } from '../Firebase';

const DeleteButton = ({ firebase, currentUser }) => {

  const deletefunction = () => {
    let r = window.confirm("Are you sure you want to delete all your user data? This cannot be reversed.");
    if(r == true) {
      firebase.doDeleteCurrentUser()
    }
  }
  return( 
    <Button type="button" onClick={deletefunction} background={theme.accessibleRed}>
      Delete all account data
    </Button>
  ) 
};

export default withFirebase(DeleteButton);
