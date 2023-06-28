import { FC, ReactNode, memo } from 'react';
import {
    Link,
    LinkProps,
} from 'react-router-dom';
import { classNames } 	from 'shared/lib/classNames/classNames';
import cls 				from './AppLink.module.scss';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
    // В react 18 надо будет указывать это свойство отдельно, т.к его нет в типе "FC"
    children?: ReactNode;
}

// Предполагаю, что в подавляющем большинстве случает у этого компонента - children
// будет строкой, поэтому здесь тоже использовал мемоизацию с помощью HOC memo().
// !!! Уточнить, может ли в качестве children передаваться примитив или это всегда ссылочный
// тип и будет ли работать memo(), если в качестве children передается ссылочный тип !!!
export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.appLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
