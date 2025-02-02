/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	webpack: (config) => {
		config.ignoreWarnings = [
			{
				message:
					/Critical dependency: the request of a dependency is an expression/,
			},
		]
		if (!config.experiments) {
			config.experiments = {}
		}
		config.experiments.topLevelAwait = true
		config.resolve.alias = {
			...config.resolve.alias,
			'react-native-sqlite-storage': false,
			mysql: false,
			'@sap/hana-client/extension/Stream': false,
		}
		return config
	},
	images: {
		domains: ['lh3.googleusercontent.com', 'media.4-paws.org', 'static.wikia.nocookie.net', 'localhost'], // Add the domain you need to support
		loader: 'custom',
		// dangerouslyAllowAllDomains: true,
	},
}

export default nextConfig
