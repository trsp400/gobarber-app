import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';

import {useAuth} from '../../hooks/auth';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

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

interface FormData {
  email: string;
  password: string;
}

interface InputElementRef {
  focus(): void;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const {signIn} = useAuth();

  const formRef = useRef<FormHandles>(null);

  const inputPasswordRef = useRef<InputElementRef>(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .email('Digite um email válido!')
            .required('O email é obrigatório!'),
          password: yup.string().required('Digite a senha!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);

        navigation.navigate('Dashboard');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        console.log(error);

        Alert.alert(
          'Erro no autenticação',
          'Verifique os campos e tente novamente',
        );
      }
    },
    [navigation, signIn],
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
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit} style={{width: '100%'}}>
              <Input
                autoCompleteType="off"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                returnKeyType="next"
                placeholder="Digite seu e-mail"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
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
                ref={inputPasswordRef}
                name="password"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => formRef.current?.submitForm()}
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

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>
            </Form>

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
