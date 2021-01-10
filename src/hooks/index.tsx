import React from 'react';

import {AuthProvider} from './auth';

const ContextProvider: React.FC = ({children}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProvider;
