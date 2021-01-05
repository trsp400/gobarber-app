import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={keyboardVisible ? null : {flex: 1}}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Container>
            <Image source={logo} />
            <View>
              <Title>Faça seu login</Title>
            </View>

            <Input
              autoCompleteType="off"
              name="email"
              placeholder="Digite seu e-mail"
              icon={{
                name: 'mail',
                size: 20,
                color: '#666360',
                style: {
                  marginRight: 16,
                },
              }}
            />
            <Input
              name="password"
              placeholder="Digite sua senha"
              icon={{
                name: 'lock',
                size: 20,
                color: '#666360',
                style: {
                  marginRight: 16,
                },
              }}
            />

            <Button onPress={() => {}}>Entrar</Button>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
      {keyboardVisible ? null : (
        <CreateAccountButton
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
        </CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
