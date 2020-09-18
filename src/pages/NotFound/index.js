import React from 'react';
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';

const NotFound = () => {

  return(
    <section>
      <h1>404 - Page not found</h1>
      <p>Sorry the link you are trying to access cannot be found.</p>
      <Button to={ROUTES.LANDING}>Go to landing page</Button>
    </section>
  )
}


export default NotFound;
