import React from 'react'
import Navbar from '../components/navbar'
import Provider from '../components/providers'
import '../styles/globals.css'
import { Session } from 'next-auth'
import { CustomThemeProvider } from './theme_provider'
import ModalProvider from './utils/context_provider'
import { LoadingProvider } from '@app/utils/loading_provider'
import { LoadingHandler } from 'components/basic/global_loading/loading_handler'
import { LoadingOverlay } from 'components/basic/global_loading/loading_overlay'

export const metadata = {
	title: 'Promptastic',
	description: 'Discover, Share & enhance AI Prompts',
	icons: {
		icon: '/assets/icons/icons8-tiger-96.png',
	},
}

interface RootLayoutProps {
	children: React.ReactNode
	session: Session
}

const RootLayout = ({ children, session }: RootLayoutProps) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='bg-white dark:bg-slate-800'>
				<LoadingProvider>
					<LoadingHandler />
					<LoadingOverlay />
					<CustomThemeProvider>
						<Provider session={session}>
							<div className='main'>{/* <div className='gradient' /> */}</div>
							<ModalProvider>
								<main className='app bg-inherit'>
									<Navbar />
									{children}
								</main>
							</ModalProvider>
						</Provider>
					</CustomThemeProvider>
				</LoadingProvider>
			</body>
		</html>
	)
}

export default RootLayout
