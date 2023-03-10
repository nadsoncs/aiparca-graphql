import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { 
  VStack,
  Heading,
  Icon,
  IconButton,
  useTheme,
  Modal,
  KeyboardAvoidingView,
} from 'native-base';
import * as Yup from 'yup';

import { useAuth } from '../hooks/auth';

import { Feather } from '@expo/vector-icons';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Banner } from '../components/Banner';
import { SchoolSelectButton } from '../components/SchoolSelectButton';
import { SchoolSelect } from '../components/SchoolSelect';
import { Platform } from 'react-native';


interface School {
  key: string;
  name: string;
}

export function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [school, setSchool] = useState<School>({
    key: '',
    name: 'Escola',
  });
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLogging } = useAuth();
  
  const { colors } = useTheme();

  function handlePasswordVisibleChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  function handleOpenSelectSchoolModal() {
    setSchoolModalOpen(true);
  }
  function handleCloseSelectSchoolModal() {
    setSchoolModalOpen(false);
  }

  async function handleSignIn(){
    if (!school.key) {
      return Alert.alert('Erro na validação', 'Selecione uma escola');
    }
    try {
      const schema = Yup.object().shape({
        login: Yup.string()
          .required('Login obrigatório'),
        password: Yup.string()
          .required('A senha é obrigatória')
      })
  
      await schema.validate({ login, password });
      
      await signIn({ login, password, school });
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Erro na validação', error.message)
      }else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais e tente novamente'
        )
        console.log(error);
      }
    }
  }

  return (
    <KeyboardAvoidingView 
      flex={1}
      behavior='position' enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

        <VStack  alignItems="center" bg="primary.100">
          <Banner />

          <VStack 
            w="full"
            px={8}
          >

            <Heading color="primary.900" fontSize="2xl" mt={20} mb={6} >
              Fazer login
            </Heading>

            <SchoolSelectButton 
              mb={4}
              title={school.name}
              onPress={handleOpenSelectSchoolModal}
            />
            <Input 
              mb={4}
              placeholder='Login'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setLogin}
              value={login}
              InputLeftElement={
                <Icon
                  as={<Feather name="user" />} 
                  color={colors.primary[700]} 
                  ml={4}
                  size={5}
                />
              }
            />
            <Input 
              placeholder='Senha'
              secureTextEntry={isPasswordVisible}
              mb={8}
              onChangeText={setPassword}
              value={password}
              InputLeftElement={
                <Icon
                  as={<Feather name="lock" />} 
                  color={colors.primary[700]} 
                  ml={4}
                  size={5}
                />
              }
              InputRightElement={
                <Icon
                  as={<Feather name={ isPasswordVisible ? 'eye' : 'eye-off' } />} 
                  color={colors.primary[700]} 
                  mr={4}
                  size={5}
                  onPress={handlePasswordVisibleChange}
                />}
            />

            <Button
              title="Entrar"
              w="full"
              isLoading={isLoading}
              onPress={handleSignIn}
            />
          </VStack>

          <Modal 
            isOpen={schoolModalOpen}
            w="full"
            bg="primary.100"
          >
            <SchoolSelect
              school={school}
              setSchool={setSchool}
              closeSelectSchool={handleCloseSelectSchoolModal}
            />
          </Modal>
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}