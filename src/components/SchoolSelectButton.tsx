import React from 'react';
import { 
  Pressable,
  IPressableProps,
  Heading,
  Icon,
  HStack,
  useTheme,
} from 'native-base';
import { Feather } from '@expo/vector-icons';


type Props = IPressableProps & {
  title: string;
}

export function SchoolSelectButton({ title,...rest }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      { ...rest }
    >
      <HStack
        p={4}
        bg="gray.50"
        alignItems="center"
        rounded={"sm"}
        overflow="hidden"
        justifyContent="space-between"
        borderWidth={1}
        borderColor="primary.500"
      >  
        <Heading color="primary.500" fontSize="md">{title}</Heading>
        <Feather name='chevron-down' color={colors.primary[700]} size={20}/>
      </HStack>
    </Pressable>
  );
}