import { classNames } 	from 'shared/lib/classNames/classNames';
import cls 				from './PageLoader.module.scss';

interface PageLoaderProps {
	className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.pageLoader, {}, [className])}>
        {/* https://loading.io/css/ */}
        <div className={cls.ldsEllipsis}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);
