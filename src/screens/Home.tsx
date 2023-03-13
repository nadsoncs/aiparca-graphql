import React, { useCallback, useEffect, useState } from 'react';
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Avatar,
  Button,
  FlatList,
  Center,
  Heading
} from 'native-base';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../hooks/auth';

import NewChatIcon from '../assets/newChatIcon.svg';
import Ovni from '../assets/ovni.svg';
import { CardMessage } from '../components/CardMessage';
import { Loading } from '../components/Loading';
import { AlertDialogModal } from '../components/AlertDialogModal';
import { useGetConversationsQuery } from '../graphql/generated';

interface Conversation {
  id: string;
  startDate: Date;
  endDate?: Date;
}
export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { user, profile, signOut } = useAuth();
  
  const { colors } = useTheme();
  const navigation = useNavigation();

  async function handleSignOut() {
    try {
      await signOut() 
    } catch (err) {
      console.error(err);
    }
  }

  function handleNewTalk(){
    const openConversation = conversations.filter((conversation) => {
      return conversation.endDate === undefined
    }).length;

    if (openConversation > 0) {
      setIsOpenDialog(true);
    } else {
      navigation.navigate('talk', {talkId: "new"})
    }
  }

  function handleOpenExistingConversation (conversationId: string) {
    navigation.navigate('conversation', {conversationId})
  }

  function closeDialog() {
    setIsOpenDialog(false);
  }

  async function setAllTalksWithClosed() {}

  async function fetchConversations() {
    const { error, data, loading } = await useGetConversationsQuery();
    console.log(data);
    console.log(error)
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  return(
    <VStack h="full" pb={6} bg="primary.100" >
      <VStack
        w="full"
        h='64'
        px={5}
        alignItems="center"
        justifyContent="center"
        bg="primary.500"
        mb={4}
      >
        <HStack
          w="full"
          justifyContent="space-between"
          mb={8}
        >
          <HStack
            alignItems="center"
          >
            {
              profile.foto ?
                <Avatar  bg="primary.900" source={{ uri: profile.foto }} />
              :
                <Avatar  bg="primary.900" >SM</Avatar>
            }
            
            <Text ml={2} color="white" fontSize="xl">{ profile.fullName }</Text>
          </HStack>
          <IconButton
            icon={ <Feather name="power" size={24} color={colors.primary[700]} /> }
            onPress={ handleSignOut }
          />
        </HStack>
        <HStack
          w="full"
          justifyContent="space-between"
          mb={8}
        >
          <Text
            color={colors.primary[700]}
            fontSize="md"
          >
            {
              !!profile.schoolName ? profile.schoolName : 'Escola Null'
            }
          </Text>
          <Text
            color={colors.primary[700]}
            fontSize="md"
          >
            Mat.: { profile.matricula }
          </Text>
        </HStack>
        <Text
          color={colors.primary[700]}
          fontSize="xl"
          bold
        >
          { profile.riskLevel }
        </Text>
      </VStack>
      <VStack flex={1} position="relative" >
        { isLoading ? <Loading/> :
          <FlatList
            data={conversations}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            px={8}
            renderItem={({item}) => (
              <CardMessage
                updated_at={ item.endDate ? item.endDate : item.startDate }
                onPress={() => handleOpenExistingConversation(item.id)}
              />
            )}

            ListEmptyComponent={() => (
              <VStack
                mt={5}
              >
                <Heading
                  color="primary.900"
                  fontSize="2xl"
                >
                  Nenhuma conversa encontrada.
                </Heading>
                <Center
                  mt={8}
                >
                  <Ovni />
                  <Text
                    color="primary.800"
                    fontSize="md"
                    mt={8}
                  >
                    Clique no botão abaixo para iniciar.
                  </Text>
                </Center>
              </VStack>
            )}
          />
        }
        
        <Button
          bg="primary.700"
          h={14} w={14}
          rounded="full"
          position="absolute"
          bottom={2}
          right={2}
          onPress={handleNewTalk}
        >
          <NewChatIcon />
        </Button>
      </VStack>
    </VStack>
  )
}