export type Environment = {
	environment: 'development' | 'production';
	backendApiEndpoint: string;
	googleMapsApiKey: string;
	sentry: {
		organization: string;
		project: string;
		authToken: string;
		dsn: string;
	};
};
