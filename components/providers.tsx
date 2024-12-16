'use client';

import CustomApolloProvider from '../app/apollo_client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type ProviderProps = {
	children: React.ReactNode;
	session: Session
};

const Provider = ({ children, session }: ProviderProps) => {

	return (
		<CustomApolloProvider>
			<SessionProvider key='session' session={session}>
				{children}
			</SessionProvider>
		</CustomApolloProvider>
	);
};

export default Provider;
