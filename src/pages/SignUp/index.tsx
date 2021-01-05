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

import {Container, Title, BackTosignIn, BackTosignInText} from './styles';

const SignUp: React.FC = () => {
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
              <Title>Crie sua conta </Title>
            </View>

            <Input
              autoCompleteType="off"
              name="name"
              placeholder="Digite seu nome"
              icon={{
                name: 'user',
                size: 20,
                color: '#666360',
                style: {
                  marginRight: 16,
                },
              }}
            />
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

            <Button onPress={() => {}}>Criar conta</Button>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
      {keyboardVisible ? null : (
        <BackTosignIn
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Icon name="arrow-left" size={20} color="#ff9000" />
          <BackTosignInText>Voltar para o login</BackTosignInText>
        </BackTosignIn>
      )}
    </>
  );
};

export default SignUp;
