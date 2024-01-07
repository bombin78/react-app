export type BuildMode = 'production' | 'development';

export interface BuildPaths {
	src: string;
	entry: string;
	build: string;
	html: string;
	locales: string;
	buildLocales: string;
}

export interface BuildEnv {
	mode: BuildMode;
	port: number;
	apiUrl: string;
}

export interface BuildOptions {
	mode: BuildMode;
	paths: BuildPaths;
	isDev: boolean;
	port: number;
	apiUrl: string;
	project: 'storybook' | 'frontend' | 'jest';
}
