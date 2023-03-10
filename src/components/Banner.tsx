import { VStack, Text } from 'native-base';

import Logo from '../assets/logo.svg';

export function Banner() {
  return(
    <VStack
      w="full"
      h='64'
      alignItems="center"
      justifyContent="center"
      bg="primary.500"
    >
      <Logo />
    </VStack>
  )
}