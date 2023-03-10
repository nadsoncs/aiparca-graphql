import React from 'react';
import { Box, HStack, Text, VStack, Pressable, IPressableProps } from 'native-base';
import { BotAvatar } from './BotAvatar';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
type CardMessageProps = IPressableProps & {
  updated_at: Date;
}
export function CardMessage({updated_at, ...rest}: CardMessageProps) { 
  const formattedDate = format(new Date(updated_at), "dd' de 'MMMM' • 'k'h'mm", {
      locale: ptBR,
    });
  return (
    <Pressable { ...rest }>
      <HStack
        bg="gray.50"
        mb={2}
        alignItems="center"
        justifyContent="space-between"
        rounded={"md"}
        borderWidth={1}
        borderColor="primary.500"
        overflow="hidden"
      >
        <Box h="full" w={2} bg="primary.500" mr={2}/>

        <HStack
          py={1}
        >
          <BotAvatar />
          <VStack
            flex={1}
            ml={2}
          >
            <HStack>
              <Text fontSize="2xs" >Parceria em </Text>
              <Text fontSize="2xs" >{formattedDate}</Text>
            </HStack>

            <Text>Lorem ipsum dolor sit amet...</Text>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  );
}