import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';

import api from '../../services/api';

import {useNavigation} from '@react-navigation/native';

import * as yup from 'yup';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import {Container, Title, BackTosignIn, BackTosignInText} from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('O nome é obrigatório!'),
          email: yup
            .string()
            .email('Digite um email válido!')
            .required('O email é obrigatório!'),
          password: yup.string().min(6, 'No mínimo 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert('Usuário criado com sucesso', 'Você já pode fazer o login');

        navigation.navigate('SignIn');
      } catch (error) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro na crição da conta',
          'Verifique os campos e tente novamente',
        );
      }
    },
    [navigation],
  );

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

            <Form ref={formRef} onSubmit={handleSubmit} style={{width: '100%'}}>
              <Input
                autoCorrect
                autoCapitalize="words"
                autoCompleteType="off"
                name="name"
                placeholder="Digite seu nome"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
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
                ref={emailRef}
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType="email-address"
                name="email"
                placeholder="Digite seu e-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
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
                ref={passwordRef}
                name="password"
                placeholder="Digite sua senha"
                textContentType="newPassword"
                returnKeyType="send"
                secureTextEntry
                onSubmitEditing={() => formRef.current?.submitForm()}
                icon={{
                  name: 'lock',
                  size: 20,
                  color: '#666360',
                  style: {
                    marginRight: 16,
                  },
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Criar conta
              </Button>
            </Form>
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
