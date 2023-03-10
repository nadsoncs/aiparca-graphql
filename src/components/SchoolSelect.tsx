import React, { useEffect, useState } from 'react';
import { 
  Heading,
  VStack,
  FlatList,
  Pressable,
  Icon,
  Text,
  HStack,
  Center,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { api } from '../services/api';
import { Loading } from './Loading';
import { Button } from './Button';
interface School {
  key: string;
  name: string;
}
interface SchoolData {
  "titulo": string;
  "caminho": string;
}
interface Props {
  school: School;
  setSchool: (school: School) => void;
  closeSelectSchool: () => void;
}

export function SchoolSelect({
  school,
  setSchool,
  closeSelectSchool
}: Props) {
  const [schools, setSchools] = useState<School[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    async function getSchools() {
      try {
        const response = await api.get('/sge/listaEscolas');
        const responseFormatted = response.data.map( (item: SchoolData) => {
          const indexFinalDomain = item.caminho.lastIndexOf('/');
          const key = item.caminho.slice(indexFinalDomain + 1);
          return {
            key,
            name: item.titulo
          };
        })
        setSchools(responseFormatted);
        setIsLoading(false);
      } catch (error) {
        throw new Error(String(error));
      }
    }
    getSchools();
  },[]);
  function handleSchoolSelect(school: School) {
    setSchool(school);
  }
  
  if ( isLoading ) {
    return (
      <Center
        w="full"
      >
        <Loading/> 
      </Center>
    )
  }
  
  return (
    <VStack
      my={8}
    >
      <Heading color="primary.900" fontSize="2xl" >
        Lista de Escolas
      </Heading>
        <FlatList
          data={schools}
          style={{flex: 1, width: '100%'}}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <Pressable
              onPress={() => handleSchoolSelect(item)}
            >
              <HStack
                alignItems="center"
                mt={4}
              >
                <Icon
                  as={<Feather name={ school.key === item.key ? 'disc': 'circle'} /> }
                  size={4}
                  color="primary.700"
                />
                <Text fontSize="md" ml={2}>{item.name}</Text>
              </HStack>
            </Pressable>
          )}
        />
      
      <Button
        title="Selecionar"
        onPress={closeSelectSchool}
      />
    </VStack>
  );
}