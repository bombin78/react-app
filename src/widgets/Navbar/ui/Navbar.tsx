import { Link } 		from 'react-router-dom';
import { classNames } 	from 'shared/lib/classNames/classNames';
import cls 				from './Navbar.module.scss';


interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	
	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<div className={cls.links}>
				<Link className={cls.mainLink} to={'/'}>Главная</Link>
				<Link to={'/about'}>О сайте</Link>
			</div>
		</div>
	);
}

