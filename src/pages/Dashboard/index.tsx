import React from 'react';
import {Text} from 'react-native';

import {Container} from './styles';

import {useAuth} from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const {signOut} = useAuth();

  signOut();

  return (
    <Container>
      <Text style={{fontSize: 90}}>OIEWW</Text>
    </Container>
  );
};

export default Dashboard;
