import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Conversation = {
  __typename?: 'Conversation';
  /** If end date is empty, conversation is still active */
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  startDate: Scalars['String'];
};

export type EndConversationInput = {
  conversationID: Scalars['ID'];
};

export type EndConversationResponse = {
  __typename?: 'EndConversationResponse';
  conversationID: Scalars['String'];
  endDate: Scalars['String'];
};

export type GetConversationSummaryInput = {
  conversationID: Scalars['ID'];
  /** Whether to get summary already generated from database or force generating new summary. */
  regenerateSummary?: InputMaybe<Scalars['Boolean']>;
};

export type GetConversationSummaryResponse = {
  __typename?: 'GetConversationSummaryResponse';
  conversationID: Scalars['ID'];
  id: Scalars['ID'];
  summaryContents: Scalars['String'];
  summaryDate: Scalars['String'];
};

export type GetMessagesInput = {
  /** If ID is not provided, returns all messages from user */
  conversationID?: InputMaybe<Scalars['ID']>;
};

/** Returned by getMessages query */
export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  conversationID: Scalars['ID'];
  datetime: Scalars['String'];
  id: Scalars['ID'];
  self: Scalars['Boolean'];
  senderID: Scalars['ID'];
  senderName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Ends an active conversation */
  endConversation?: Maybe<EndConversationResponse>;
  /** Send message to chat server */
  sendMessage?: Maybe<SendMessageResponse>;
  /** Starts a new conversation. If an active conversation still exists, return its conversationID instead of creating a new one. */
  startConversation?: Maybe<StartConversationResponse>;
};


export type MutationEndConversationArgs = {
  input: EndConversationInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};

export type Query = {
  __typename?: 'Query';
  /** Request summarization of a given conversation */
  getConversationSummary?: Maybe<GetConversationSummaryResponse>;
  /** Retrieves all conversations from user */
  getConversations?: Maybe<Array<Conversation>>;
  /** Retrieve messages from current user. If no input is provided, retrieves all messages, otherwise, only messages from the conversationID provided */
  getMessages?: Maybe<Array<Message>>;
};


export type QueryGetConversationSummaryArgs = {
  input: GetConversationSummaryInput;
};


export type QueryGetMessagesArgs = {
  input?: InputMaybe<GetMessagesInput>;
};

export type SendMessageInput = {
  conversationID: Scalars['ID'];
  message: Scalars['String'];
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  conversationID: Scalars['ID'];
  id: Scalars['ID'];
  /** The respondent ID */
  respondentID: Scalars['ID'];
  /** The respondent name */
  respondentName: Scalars['String'];
  responseContent: Scalars['String'];
  responseDatetime: Scalars['String'];
};

export type StartConversationResponse = {
  __typename?: 'StartConversationResponse';
  conversationID: Scalars['ID'];
  /** Tells whether a new conversation was created or the active one was returned */
  isNew: Scalars['Boolean'];
  startDate: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  schoolName: Scalars['String'];
  userName: Scalars['String'];
};

export type CreateConversationMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateConversationMutation = { __typename?: 'Mutation', startConversation?: { __typename?: 'StartConversationResponse', conversationID: string, startDate: string, isNew: boolean } | null };

export type EndConversationMutationVariables = Exact<{
  talk: Scalars['ID'];
}>;


export type EndConversationMutation = { __typename?: 'Mutation', endConversation?: { __typename?: 'EndConversationResponse', conversationID: string, endDate: string } | null };

export type CreateMessageMutationVariables = Exact<{
  talk: Scalars['ID'];
  message: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SendMessageResponse', id: string, conversationID: string, responseDatetime: string, responseContent: string, respondentID: string, respondentName: string } | null };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations?: Array<{ __typename?: 'Conversation', id: string, startDate: string, endDate?: string | null }> | null };

export type GetMessagesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: Array<{ __typename?: 'Message', id: string, datetime: string, content: string, conversationID: string, senderID: string, senderName: string, self: boolean }> | null };


export const CreateConversationDocument = gql`
    mutation CreateConversation {
  startConversation {
    conversationID
    startDate
    isNew
  }
}
    `;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const EndConversationDocument = gql`
    mutation EndConversation($talk: ID!) {
  endConversation(input: {conversationID: $talk}) {
    conversationID
    endDate
  }
}
    `;
export type EndConversationMutationFn = Apollo.MutationFunction<EndConversationMutation, EndConversationMutationVariables>;

/**
 * __useEndConversationMutation__
 *
 * To run a mutation, you first call `useEndConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endConversationMutation, { data, loading, error }] = useEndConversationMutation({
 *   variables: {
 *      talk: // value for 'talk'
 *   },
 * });
 */
export function useEndConversationMutation(baseOptions?: Apollo.MutationHookOptions<EndConversationMutation, EndConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndConversationMutation, EndConversationMutationVariables>(EndConversationDocument, options);
      }
export type EndConversationMutationHookResult = ReturnType<typeof useEndConversationMutation>;
export type EndConversationMutationResult = Apollo.MutationResult<EndConversationMutation>;
export type EndConversationMutationOptions = Apollo.BaseMutationOptions<EndConversationMutation, EndConversationMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($talk: ID!, $message: String!) {
  sendMessage(input: {conversationID: $talk, message: $message}) {
    id
    conversationID
    responseDatetime
    responseContent
    respondentID
    respondentName
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      talk: // value for 'talk'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    id
    startDate
    endDate
  }
}
    `;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
      }
export function useGetConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
export type GetConversationsQueryHookResult = ReturnType<typeof useGetConversationsQuery>;
export type GetConversationsLazyQueryHookResult = ReturnType<typeof useGetConversationsLazyQuery>;
export type GetConversationsQueryResult = Apollo.QueryResult<GetConversationsQuery, GetConversationsQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($id: ID) {
  getMessages(input: {conversationID: $id}) {
    id
    datetime
    content
    conversationID
    senderID
    senderName
    self
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;