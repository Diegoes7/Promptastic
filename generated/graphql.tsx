import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Favorite = {
  __typename?: 'Favorite';
  id: Scalars['ID']['output'];
  prompt: Prompt;
  promptId: Scalars['ID']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToFavorites: Favorite;
  createPrompt: Prompt;
  deletePicture: Scalars['Boolean']['output'];
  deletePrompt: Scalars['Int']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: User;
  register: User;
  removeFromFavorites: Scalars['Int']['output'];
  updateLikes: Scalars['Boolean']['output'];
  updatePrompt: Prompt;
  updateUser: User;
  uploadPicture: Scalars['Boolean']['output'];
};


export type MutationAddToFavoritesArgs = {
  promptId: Scalars['Int']['input'];
};


export type MutationCreatePromptArgs = {
  input: PromptInput;
};


export type MutationDeletePictureArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePromptArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationRemoveFromFavoritesArgs = {
  promptId: Scalars['Int']['input'];
};


export type MutationUpdateLikesArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdatePromptArgs = {
  id: Scalars['Int']['input'];
  input: PromptInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type MutationUploadPictureArgs = {
  file: Scalars['Upload']['input'];
};

export type PaginatedPrompts = {
  __typename?: 'PaginatedPrompts';
  hasMore: Scalars['Boolean']['output'];
  prompts: Array<Prompt>;
};

export type Picture = {
  __typename?: 'Picture';
  creatorId: Scalars['Int']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimetype?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Prompt = {
  __typename?: 'Prompt';
  createdAt: Scalars['DateTimeISO']['output'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']['output']>;
  favorites: Array<Favorite>;
  id: Scalars['ID']['output'];
  likes: Scalars['Int']['output'];
  prompt: Scalars['String']['output'];
  tag: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type PromptInput = {
  likes: Scalars['Int']['input'];
  prompt: Scalars['String']['input'];
  tag: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getOtherUser?: Maybe<User>;
  getPromptById?: Maybe<Prompt>;
  getPromptsUserById?: Maybe<Array<Prompt>>;
  getUserFavoritePrompts: Array<Favorite>;
  getUserPicture?: Maybe<Picture>;
  getUserPrompts?: Maybe<Array<Prompt>>;
  myFavoritePrompts: Array<Favorite>;
  prompts?: Maybe<PaginatedPrompts>;
  user?: Maybe<User>;
};


export type QueryGetOtherUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPromptByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPromptsUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserFavoritePromptsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetUserPictureArgs = {
  creatorId: Scalars['Int']['input'];
};


export type QueryPromptsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  favorites: Array<Favorite>;
  id: Scalars['ID']['output'];
  image?: Maybe<Picture>;
  password?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type PictureFragment = { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number };

export type PromptFragment = { __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null };

export type UserFragment = { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null };

export type AddToFavoritesMutationVariables = Exact<{
  promptId: Scalars['Int']['input'];
}>;


export type AddToFavoritesMutation = { __typename?: 'Mutation', addToFavorites: { __typename: 'Favorite' } };

export type CreatePromptMutationVariables = Exact<{
  input: PromptInput;
}>;


export type CreatePromptMutation = { __typename?: 'Mutation', createPrompt: { __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null } };

export type DeletePictureMutationVariables = Exact<{
  deletePictureId: Scalars['Int']['input'];
}>;


export type DeletePictureMutation = { __typename?: 'Mutation', deletePicture: boolean };

export type DeletePromptMutationVariables = Exact<{
  deletePromptId: Scalars['Int']['input'];
}>;


export type DeletePromptMutation = { __typename?: 'Mutation', deletePrompt: number };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type UpdateLikesMutationVariables = Exact<{
  updateLikesId: Scalars['Int']['input'];
}>;


export type UpdateLikesMutation = { __typename?: 'Mutation', updateLikes: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', password?: string | null, id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } };

export type RemoveFromFavoritesMutationVariables = Exact<{
  promptId: Scalars['Int']['input'];
}>;


export type RemoveFromFavoritesMutation = { __typename?: 'Mutation', removeFromFavorites: number };

export type UpdatePromptMutationVariables = Exact<{
  input: PromptInput;
  updatePromptId: Scalars['Int']['input'];
}>;


export type UpdatePromptMutation = { __typename?: 'Mutation', updatePrompt: { __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null } };

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  updateUserId: Scalars['Int']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } };

export type UploadPictureMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadPictureMutation = { __typename?: 'Mutation', uploadPicture: boolean };

export type GetUserFavoritePromptsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserFavoritePromptsQuery = { __typename?: 'Query', getUserFavoritePrompts: Array<{ __typename?: 'Favorite', id: string, prompt: { __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null }, user: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } }> };

export type GetOtherUserQueryVariables = Exact<{
  getOtherUserId: Scalars['Int']['input'];
}>;


export type GetOtherUserQuery = { __typename?: 'Query', getOtherUser?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null };

export type GetUserPictureQueryVariables = Exact<{
  creatorId: Scalars['Int']['input'];
}>;


export type GetUserPictureQuery = { __typename?: 'Query', getUserPicture?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null };

export type GetPromptByIdQueryVariables = Exact<{
  getPromptByIdId: Scalars['Int']['input'];
}>;


export type GetPromptByIdQuery = { __typename?: 'Query', getPromptById?: { __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null } | null };

export type MyFavoritePromptsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFavoritePromptsQuery = { __typename?: 'Query', myFavoritePrompts: Array<{ __typename?: 'Favorite', id: string, prompt: { __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null }, user: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } }> };

export type PromptsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type PromptsQuery = { __typename?: 'Query', prompts?: { __typename?: 'PaginatedPrompts', hasMore: boolean, prompts: Array<{ __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null }> } | null };

export type GetPromptsUserByIdQueryVariables = Exact<{
  getPromptsUserById: Scalars['Int']['input'];
}>;


export type GetPromptsUserByIdQuery = { __typename?: 'Query', getPromptsUserById?: Array<{ __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null }> | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null };

export type GetUserPromptsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPromptsQuery = { __typename?: 'Query', getUserPrompts?: Array<{ __typename?: 'Prompt', id: string, title: string, tag: string, prompt: string, likes: number, creatorId?: number | null, createdAt: any, updatedAt: any, creator?: { __typename?: 'User', id: string, username: string, email: string, picture?: string | null, createdAt: any, updatedAt: any, image?: { __typename?: 'Picture', id: string, filename: string, mimetype?: string | null, path?: string | null, creatorId: number } | null } | null }> | null };

export const PictureFragmentDoc = gql`
    fragment Picture on Picture {
  id
  filename
  mimetype
  path
  creatorId
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  email
  picture
  image {
    ...Picture
  }
  createdAt
  updatedAt
}
    ${PictureFragmentDoc}`;
export const PromptFragmentDoc = gql`
    fragment Prompt on Prompt {
  id
  title
  tag
  prompt
  likes
  creatorId
  createdAt
  updatedAt
  creator {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const AddToFavoritesDocument = gql`
    mutation addToFavorites($promptId: Int!) {
  addToFavorites(promptId: $promptId) {
    __typename
  }
}
    `;
export type AddToFavoritesMutationFn = Apollo.MutationFunction<AddToFavoritesMutation, AddToFavoritesMutationVariables>;

/**
 * __useAddToFavoritesMutation__
 *
 * To run a mutation, you first call `useAddToFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavoritesMutation, { data, loading, error }] = useAddToFavoritesMutation({
 *   variables: {
 *      promptId: // value for 'promptId'
 *   },
 * });
 */
export function useAddToFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<AddToFavoritesMutation, AddToFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToFavoritesMutation, AddToFavoritesMutationVariables>(AddToFavoritesDocument, options);
      }
export type AddToFavoritesMutationHookResult = ReturnType<typeof useAddToFavoritesMutation>;
export type AddToFavoritesMutationResult = Apollo.MutationResult<AddToFavoritesMutation>;
export type AddToFavoritesMutationOptions = Apollo.BaseMutationOptions<AddToFavoritesMutation, AddToFavoritesMutationVariables>;
export const CreatePromptDocument = gql`
    mutation CreatePrompt($input: PromptInput!) {
  createPrompt(input: $input) {
    ...Prompt
  }
}
    ${PromptFragmentDoc}`;
export type CreatePromptMutationFn = Apollo.MutationFunction<CreatePromptMutation, CreatePromptMutationVariables>;

/**
 * __useCreatePromptMutation__
 *
 * To run a mutation, you first call `useCreatePromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPromptMutation, { data, loading, error }] = useCreatePromptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePromptMutation(baseOptions?: Apollo.MutationHookOptions<CreatePromptMutation, CreatePromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePromptMutation, CreatePromptMutationVariables>(CreatePromptDocument, options);
      }
export type CreatePromptMutationHookResult = ReturnType<typeof useCreatePromptMutation>;
export type CreatePromptMutationResult = Apollo.MutationResult<CreatePromptMutation>;
export type CreatePromptMutationOptions = Apollo.BaseMutationOptions<CreatePromptMutation, CreatePromptMutationVariables>;
export const DeletePictureDocument = gql`
    mutation DeletePicture($deletePictureId: Int!) {
  deletePicture(id: $deletePictureId)
}
    `;
export type DeletePictureMutationFn = Apollo.MutationFunction<DeletePictureMutation, DeletePictureMutationVariables>;

/**
 * __useDeletePictureMutation__
 *
 * To run a mutation, you first call `useDeletePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePictureMutation, { data, loading, error }] = useDeletePictureMutation({
 *   variables: {
 *      deletePictureId: // value for 'deletePictureId'
 *   },
 * });
 */
export function useDeletePictureMutation(baseOptions?: Apollo.MutationHookOptions<DeletePictureMutation, DeletePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePictureMutation, DeletePictureMutationVariables>(DeletePictureDocument, options);
      }
export type DeletePictureMutationHookResult = ReturnType<typeof useDeletePictureMutation>;
export type DeletePictureMutationResult = Apollo.MutationResult<DeletePictureMutation>;
export type DeletePictureMutationOptions = Apollo.BaseMutationOptions<DeletePictureMutation, DeletePictureMutationVariables>;
export const DeletePromptDocument = gql`
    mutation DeletePrompt($deletePromptId: Int!) {
  deletePrompt(id: $deletePromptId)
}
    `;
export type DeletePromptMutationFn = Apollo.MutationFunction<DeletePromptMutation, DeletePromptMutationVariables>;

/**
 * __useDeletePromptMutation__
 *
 * To run a mutation, you first call `useDeletePromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePromptMutation, { data, loading, error }] = useDeletePromptMutation({
 *   variables: {
 *      deletePromptId: // value for 'deletePromptId'
 *   },
 * });
 */
export function useDeletePromptMutation(baseOptions?: Apollo.MutationHookOptions<DeletePromptMutation, DeletePromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePromptMutation, DeletePromptMutationVariables>(DeletePromptDocument, options);
      }
export type DeletePromptMutationHookResult = ReturnType<typeof useDeletePromptMutation>;
export type DeletePromptMutationResult = Apollo.MutationResult<DeletePromptMutation>;
export type DeletePromptMutationOptions = Apollo.BaseMutationOptions<DeletePromptMutation, DeletePromptMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: Int!) {
  deleteUser(id: $deleteUserId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateLikesDocument = gql`
    mutation UpdateLikes($updateLikesId: Int!) {
  updateLikes(id: $updateLikesId)
}
    `;
export type UpdateLikesMutationFn = Apollo.MutationFunction<UpdateLikesMutation, UpdateLikesMutationVariables>;

/**
 * __useUpdateLikesMutation__
 *
 * To run a mutation, you first call `useUpdateLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLikesMutation, { data, loading, error }] = useUpdateLikesMutation({
 *   variables: {
 *      updateLikesId: // value for 'updateLikesId'
 *   },
 * });
 */
export function useUpdateLikesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLikesMutation, UpdateLikesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLikesMutation, UpdateLikesMutationVariables>(UpdateLikesDocument, options);
      }
export type UpdateLikesMutationHookResult = ReturnType<typeof useUpdateLikesMutation>;
export type UpdateLikesMutationResult = Apollo.MutationResult<UpdateLikesMutation>;
export type UpdateLikesMutationOptions = Apollo.BaseMutationOptions<UpdateLikesMutation, UpdateLikesMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...User
    password
  }
}
    ${UserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveFromFavoritesDocument = gql`
    mutation RemoveFromFavorites($promptId: Int!) {
  removeFromFavorites(promptId: $promptId)
}
    `;
export type RemoveFromFavoritesMutationFn = Apollo.MutationFunction<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>;

/**
 * __useRemoveFromFavoritesMutation__
 *
 * To run a mutation, you first call `useRemoveFromFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromFavoritesMutation, { data, loading, error }] = useRemoveFromFavoritesMutation({
 *   variables: {
 *      promptId: // value for 'promptId'
 *   },
 * });
 */
export function useRemoveFromFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>(RemoveFromFavoritesDocument, options);
      }
export type RemoveFromFavoritesMutationHookResult = ReturnType<typeof useRemoveFromFavoritesMutation>;
export type RemoveFromFavoritesMutationResult = Apollo.MutationResult<RemoveFromFavoritesMutation>;
export type RemoveFromFavoritesMutationOptions = Apollo.BaseMutationOptions<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>;
export const UpdatePromptDocument = gql`
    mutation UpdatePrompt($input: PromptInput!, $updatePromptId: Int!) {
  updatePrompt(input: $input, id: $updatePromptId) {
    ...Prompt
  }
}
    ${PromptFragmentDoc}`;
export type UpdatePromptMutationFn = Apollo.MutationFunction<UpdatePromptMutation, UpdatePromptMutationVariables>;

/**
 * __useUpdatePromptMutation__
 *
 * To run a mutation, you first call `useUpdatePromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePromptMutation, { data, loading, error }] = useUpdatePromptMutation({
 *   variables: {
 *      input: // value for 'input'
 *      updatePromptId: // value for 'updatePromptId'
 *   },
 * });
 */
export function useUpdatePromptMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePromptMutation, UpdatePromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePromptMutation, UpdatePromptMutationVariables>(UpdatePromptDocument, options);
      }
export type UpdatePromptMutationHookResult = ReturnType<typeof useUpdatePromptMutation>;
export type UpdatePromptMutationResult = Apollo.MutationResult<UpdatePromptMutation>;
export type UpdatePromptMutationOptions = Apollo.BaseMutationOptions<UpdatePromptMutation, UpdatePromptMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($username: String!, $updateUserId: Int!) {
  updateUser(username: $username, id: $updateUserId) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      updateUserId: // value for 'updateUserId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadPictureDocument = gql`
    mutation UploadPicture($file: Upload!) {
  uploadPicture(file: $file)
}
    `;
export type UploadPictureMutationFn = Apollo.MutationFunction<UploadPictureMutation, UploadPictureMutationVariables>;

/**
 * __useUploadPictureMutation__
 *
 * To run a mutation, you first call `useUploadPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPictureMutation, { data, loading, error }] = useUploadPictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadPictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadPictureMutation, UploadPictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPictureMutation, UploadPictureMutationVariables>(UploadPictureDocument, options);
      }
export type UploadPictureMutationHookResult = ReturnType<typeof useUploadPictureMutation>;
export type UploadPictureMutationResult = Apollo.MutationResult<UploadPictureMutation>;
export type UploadPictureMutationOptions = Apollo.BaseMutationOptions<UploadPictureMutation, UploadPictureMutationVariables>;
export const GetUserFavoritePromptsDocument = gql`
    query GetUserFavoritePrompts($userId: Int!) {
  getUserFavoritePrompts(userId: $userId) {
    id
    prompt {
      ...Prompt
    }
    user {
      ...User
    }
  }
}
    ${PromptFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useGetUserFavoritePromptsQuery__
 *
 * To run a query within a React component, call `useGetUserFavoritePromptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavoritePromptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavoritePromptsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFavoritePromptsQuery(baseOptions: Apollo.QueryHookOptions<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables> & ({ variables: GetUserFavoritePromptsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables>(GetUserFavoritePromptsDocument, options);
      }
export function useGetUserFavoritePromptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables>(GetUserFavoritePromptsDocument, options);
        }
export function useGetUserFavoritePromptsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables>(GetUserFavoritePromptsDocument, options);
        }
export type GetUserFavoritePromptsQueryHookResult = ReturnType<typeof useGetUserFavoritePromptsQuery>;
export type GetUserFavoritePromptsLazyQueryHookResult = ReturnType<typeof useGetUserFavoritePromptsLazyQuery>;
export type GetUserFavoritePromptsSuspenseQueryHookResult = ReturnType<typeof useGetUserFavoritePromptsSuspenseQuery>;
export type GetUserFavoritePromptsQueryResult = Apollo.QueryResult<GetUserFavoritePromptsQuery, GetUserFavoritePromptsQueryVariables>;
export const GetOtherUserDocument = gql`
    query getOtherUser($getOtherUserId: Int!) {
  getOtherUser(id: $getOtherUserId) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetOtherUserQuery__
 *
 * To run a query within a React component, call `useGetOtherUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOtherUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOtherUserQuery({
 *   variables: {
 *      getOtherUserId: // value for 'getOtherUserId'
 *   },
 * });
 */
export function useGetOtherUserQuery(baseOptions: Apollo.QueryHookOptions<GetOtherUserQuery, GetOtherUserQueryVariables> & ({ variables: GetOtherUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOtherUserQuery, GetOtherUserQueryVariables>(GetOtherUserDocument, options);
      }
export function useGetOtherUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOtherUserQuery, GetOtherUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOtherUserQuery, GetOtherUserQueryVariables>(GetOtherUserDocument, options);
        }
export function useGetOtherUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOtherUserQuery, GetOtherUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOtherUserQuery, GetOtherUserQueryVariables>(GetOtherUserDocument, options);
        }
export type GetOtherUserQueryHookResult = ReturnType<typeof useGetOtherUserQuery>;
export type GetOtherUserLazyQueryHookResult = ReturnType<typeof useGetOtherUserLazyQuery>;
export type GetOtherUserSuspenseQueryHookResult = ReturnType<typeof useGetOtherUserSuspenseQuery>;
export type GetOtherUserQueryResult = Apollo.QueryResult<GetOtherUserQuery, GetOtherUserQueryVariables>;
export const GetUserPictureDocument = gql`
    query GetUserPicture($creatorId: Int!) {
  getUserPicture(creatorId: $creatorId) {
    ...Picture
  }
}
    ${PictureFragmentDoc}`;

/**
 * __useGetUserPictureQuery__
 *
 * To run a query within a React component, call `useGetUserPictureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPictureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPictureQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *   },
 * });
 */
export function useGetUserPictureQuery(baseOptions: Apollo.QueryHookOptions<GetUserPictureQuery, GetUserPictureQueryVariables> & ({ variables: GetUserPictureQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPictureQuery, GetUserPictureQueryVariables>(GetUserPictureDocument, options);
      }
export function useGetUserPictureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPictureQuery, GetUserPictureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPictureQuery, GetUserPictureQueryVariables>(GetUserPictureDocument, options);
        }
export function useGetUserPictureSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserPictureQuery, GetUserPictureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPictureQuery, GetUserPictureQueryVariables>(GetUserPictureDocument, options);
        }
export type GetUserPictureQueryHookResult = ReturnType<typeof useGetUserPictureQuery>;
export type GetUserPictureLazyQueryHookResult = ReturnType<typeof useGetUserPictureLazyQuery>;
export type GetUserPictureSuspenseQueryHookResult = ReturnType<typeof useGetUserPictureSuspenseQuery>;
export type GetUserPictureQueryResult = Apollo.QueryResult<GetUserPictureQuery, GetUserPictureQueryVariables>;
export const GetPromptByIdDocument = gql`
    query GetPromptById($getPromptByIdId: Int!) {
  getPromptById(id: $getPromptByIdId) {
    ...Prompt
  }
}
    ${PromptFragmentDoc}`;

/**
 * __useGetPromptByIdQuery__
 *
 * To run a query within a React component, call `useGetPromptByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromptByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromptByIdQuery({
 *   variables: {
 *      getPromptByIdId: // value for 'getPromptByIdId'
 *   },
 * });
 */
export function useGetPromptByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPromptByIdQuery, GetPromptByIdQueryVariables> & ({ variables: GetPromptByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPromptByIdQuery, GetPromptByIdQueryVariables>(GetPromptByIdDocument, options);
      }
export function useGetPromptByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPromptByIdQuery, GetPromptByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPromptByIdQuery, GetPromptByIdQueryVariables>(GetPromptByIdDocument, options);
        }
export function useGetPromptByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPromptByIdQuery, GetPromptByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPromptByIdQuery, GetPromptByIdQueryVariables>(GetPromptByIdDocument, options);
        }
export type GetPromptByIdQueryHookResult = ReturnType<typeof useGetPromptByIdQuery>;
export type GetPromptByIdLazyQueryHookResult = ReturnType<typeof useGetPromptByIdLazyQuery>;
export type GetPromptByIdSuspenseQueryHookResult = ReturnType<typeof useGetPromptByIdSuspenseQuery>;
export type GetPromptByIdQueryResult = Apollo.QueryResult<GetPromptByIdQuery, GetPromptByIdQueryVariables>;
export const MyFavoritePromptsDocument = gql`
    query MyFavoritePrompts {
  myFavoritePrompts {
    id
    prompt {
      ...Prompt
    }
    user {
      ...User
    }
  }
}
    ${PromptFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useMyFavoritePromptsQuery__
 *
 * To run a query within a React component, call `useMyFavoritePromptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFavoritePromptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFavoritePromptsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFavoritePromptsQuery(baseOptions?: Apollo.QueryHookOptions<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>(MyFavoritePromptsDocument, options);
      }
export function useMyFavoritePromptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>(MyFavoritePromptsDocument, options);
        }
export function useMyFavoritePromptsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>(MyFavoritePromptsDocument, options);
        }
export type MyFavoritePromptsQueryHookResult = ReturnType<typeof useMyFavoritePromptsQuery>;
export type MyFavoritePromptsLazyQueryHookResult = ReturnType<typeof useMyFavoritePromptsLazyQuery>;
export type MyFavoritePromptsSuspenseQueryHookResult = ReturnType<typeof useMyFavoritePromptsSuspenseQuery>;
export type MyFavoritePromptsQueryResult = Apollo.QueryResult<MyFavoritePromptsQuery, MyFavoritePromptsQueryVariables>;
export const PromptsDocument = gql`
    query Prompts($limit: Int!, $cursor: String) {
  prompts(limit: $limit, cursor: $cursor) {
    prompts {
      ...Prompt
    }
    hasMore
  }
}
    ${PromptFragmentDoc}`;

/**
 * __usePromptsQuery__
 *
 * To run a query within a React component, call `usePromptsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePromptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePromptsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePromptsQuery(baseOptions: Apollo.QueryHookOptions<PromptsQuery, PromptsQueryVariables> & ({ variables: PromptsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PromptsQuery, PromptsQueryVariables>(PromptsDocument, options);
      }
export function usePromptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PromptsQuery, PromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PromptsQuery, PromptsQueryVariables>(PromptsDocument, options);
        }
export function usePromptsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PromptsQuery, PromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PromptsQuery, PromptsQueryVariables>(PromptsDocument, options);
        }
export type PromptsQueryHookResult = ReturnType<typeof usePromptsQuery>;
export type PromptsLazyQueryHookResult = ReturnType<typeof usePromptsLazyQuery>;
export type PromptsSuspenseQueryHookResult = ReturnType<typeof usePromptsSuspenseQuery>;
export type PromptsQueryResult = Apollo.QueryResult<PromptsQuery, PromptsQueryVariables>;
export const GetPromptsUserByIdDocument = gql`
    query GetPromptsUserById($getPromptsUserById: Int!) {
  getPromptsUserById(id: $getPromptsUserById) {
    ...Prompt
  }
}
    ${PromptFragmentDoc}`;

/**
 * __useGetPromptsUserByIdQuery__
 *
 * To run a query within a React component, call `useGetPromptsUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromptsUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromptsUserByIdQuery({
 *   variables: {
 *      getPromptsUserById: // value for 'getPromptsUserById'
 *   },
 * });
 */
export function useGetPromptsUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables> & ({ variables: GetPromptsUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables>(GetPromptsUserByIdDocument, options);
      }
export function useGetPromptsUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables>(GetPromptsUserByIdDocument, options);
        }
export function useGetPromptsUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables>(GetPromptsUserByIdDocument, options);
        }
export type GetPromptsUserByIdQueryHookResult = ReturnType<typeof useGetPromptsUserByIdQuery>;
export type GetPromptsUserByIdLazyQueryHookResult = ReturnType<typeof useGetPromptsUserByIdLazyQuery>;
export type GetPromptsUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetPromptsUserByIdSuspenseQuery>;
export type GetPromptsUserByIdQueryResult = Apollo.QueryResult<GetPromptsUserByIdQuery, GetPromptsUserByIdQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const GetUserPromptsDocument = gql`
    query GetUserPrompts {
  getUserPrompts {
    ...Prompt
  }
}
    ${PromptFragmentDoc}`;

/**
 * __useGetUserPromptsQuery__
 *
 * To run a query within a React component, call `useGetUserPromptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPromptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPromptsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPromptsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPromptsQuery, GetUserPromptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPromptsQuery, GetUserPromptsQueryVariables>(GetUserPromptsDocument, options);
      }
export function useGetUserPromptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPromptsQuery, GetUserPromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPromptsQuery, GetUserPromptsQueryVariables>(GetUserPromptsDocument, options);
        }
export function useGetUserPromptsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserPromptsQuery, GetUserPromptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPromptsQuery, GetUserPromptsQueryVariables>(GetUserPromptsDocument, options);
        }
export type GetUserPromptsQueryHookResult = ReturnType<typeof useGetUserPromptsQuery>;
export type GetUserPromptsLazyQueryHookResult = ReturnType<typeof useGetUserPromptsLazyQuery>;
export type GetUserPromptsSuspenseQueryHookResult = ReturnType<typeof useGetUserPromptsSuspenseQuery>;
export type GetUserPromptsQueryResult = Apollo.QueryResult<GetUserPromptsQuery, GetUserPromptsQueryVariables>;