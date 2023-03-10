import { Text, VStack } from "native-base";


interface Props {
  content: string;
  date: String;
  isBotMessage: boolean;
}

export function Message({ 
  content,
  date,
  isBotMessage = false,
}: Props) {
  return (
    <VStack
      w="90%"
      p={2}
      mb={2}
      rounded={"sm"}
      overflow="hidden"
      borderWidth={1}
      borderColor="primary.500"
      
      bg={ isBotMessage ? "primary.500" : "gray.50" }
      alignSelf={ isBotMessage ? "flex-start" : "flex-end" }
    >
      <Text 
        fontSize="2xs" 
        color={ isBotMessage ? "primary.600" : "primary.900" }
      >
        {date}
      </Text>
      <Text 
        fontSize="sm" 
        color={ isBotMessage ? "white" : "primary.800" }
      >
        { content }
      </Text>
    </VStack>
  )
}