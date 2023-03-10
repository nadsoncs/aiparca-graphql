import { KeyboardAvoidingView } from "native-base";
import { Platform } from "react-native";

export function Conversation () {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled
    >
      
    </KeyboardAvoidingView>
  )
}