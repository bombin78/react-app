// import CSS modules in Typescript with Webpack
declare module '*.scss' {
	interface IClassNames {
	  [className: string]: string
	}
	const classNames: IClassNames;
	export = classNames;
  }