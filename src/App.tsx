import React, {
	Suspense,
} 							from 'react';
import { 
	Routes,
	Route,
	Link,
} 							from 'react-router-dom';
import { useTheme } 		from './theme/useTheme';
import { AboutPageAsync } 	from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } 	from './pages/MainPage/MainPage.async';
import './styles/index.scss';
import { classNames } from './helpers/classNames/classNames';


const App = () => {
	const {theme, toggleTheme} = useTheme();
	const bool = true;

	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>TOGGLE</button>
			<Link to={'/'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>

			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/'} element={<MainPageAsync/>} />
					<Route path={'/about'} element={<AboutPageAsync/>} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;