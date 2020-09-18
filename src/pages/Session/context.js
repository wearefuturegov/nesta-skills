import React  from 'react';

const AuthUserContext = React.createContext(null);


export function useAuth() {
    return React.useContext(AuthUserContext);
  }

export default AuthUserContext;
