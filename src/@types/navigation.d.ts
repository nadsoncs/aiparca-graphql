export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      conversation: { conversationId: string};
      talk: { talkId: string };
    }
  }
}