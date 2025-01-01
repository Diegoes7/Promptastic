'use client'

import React from 'react'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider as Provider,
	ApolloLink,
	HttpLink,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { PaginatedPrompts } from 'generated/graphql'

// Create an upload link for file uploads
const uploadLink = createUploadLink({
	uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL_API_INTERNAL,
	credentials: 'include', // Include credentials for file uploads as well
	headers: {
		'Apollo-Require-Preflight': 'true', // Required for file uploads
		'Content-Type': 'multipart/form-data',
	},
})

// Create a regular HTTP link for standard queries
const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL_API_INTERNAL,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Combine links using ApolloLink
const combinedLink = ApolloLink.split(
	// The function determines which link to use
	({ variables }) =>
		Object.values(variables).some(
			(value) => value instanceof File || value instanceof Blob
		),
	uploadLink, // Use the upload link for file uploads
	httpLink // Use the regular http link for normal queries
)

// Create Apollo Client
const client = new ApolloClient({
	link: combinedLink,
	cache: new InMemoryCache({
		typePolicies: {
			// Prompt: {
			// 	keyFields: ['id'], // Ensure prompts are uniquely identified by `id`
			// },
			Query: {
				fields: {
					prompts: {
						keyArgs: ['limit', 'cursor'],
						merge(
							existing: PaginatedPrompts | undefined,
							incoming: PaginatedPrompts
						): PaginatedPrompts {
							const incomingIds = new Set(
								incoming.prompts.map((prompt) => prompt.id)
							)
							const mergedPrompts = [
								...incoming.prompts,
								...(existing?.prompts.filter(
									(prompt) => !incomingIds.has(prompt.id)
								) || []),
							]
							return {
								...incoming,
								prompts: mergedPrompts,
							}
						},
					},
				},
			},
		},
	}),
})

// Custom Apollo Provider to wrap your application
const CustomApolloProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <Provider client={client}>{children}</Provider>
}

export default CustomApolloProvider
