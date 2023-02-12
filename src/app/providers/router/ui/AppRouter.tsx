import React, {
	Suspense,
} 								from 'react';
import { 
	Routes,
	Route,
} 								from 'react-router-dom';
import { useTheme } 			from 'app/providers/ThemeProvider';
import { classNames } 			from 'shared/lib/classNames/classNames';
import { AboutPage } 			from 'pages/AboutPage';
import { MainPage } 			from 'pages/MainPage'
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{Object.values(routeConfig).map(({element, path}) => (
					<Route 
						key={path}
						element={element}
						path={path}
					/>
				))}
			</Routes>
		</Suspense>
	);
};

export default AppRouter;