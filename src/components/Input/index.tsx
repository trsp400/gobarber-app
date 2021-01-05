import React from 'react';
import {TextInputProps} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';

import {Container} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: IconProps;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
  return (
    <Container>
      <Icon {...icon} />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default Input;
