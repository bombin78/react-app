import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { TextSize } from 'shared/ui/Text/ui/Text';
// https://github.com/bvaughn/react-virtualized/tree/master
import {
    AutoSizer, List, ListRowProps, WindowScroller,
} from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, idx) => (
        <ArticleListItemSkeleton
            key={idx}
            className={cls.card}
            view={view}
        />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
    } = props;

    const { t } = useTranslation();

    const isBig = view === ArticleView.BIG;
    // TODO: Число элементов в строке (для отображения плиткой, для простоты указано 3, но в
    // дальнейшем необходимо высчитывать количество элементов в зависимости от ширины элемента)
    const itemsPerRow = isBig ? 1 : 3;
    // Количество отрисовываемых строк
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRenderer = ({
        index, isScrolling, key, style,
    }: ListRowProps) => {
        const items = [];

        // Определяем от какого и до какого индекса отрисовывать элементы
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    className={cls.card}
                    article={articles[i]}
                    view={view}
                    target={target}
                    key={`str${articles[i].id}`}
                />,
            );
        }

        return (
            <div
                className={cls.row}
                style={style}
                key={key}
            >
                {items}
            </div>
        );
    };

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.articleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('No articles found')} />
            </div>
        );
    }

    return (
        // https://github.com/bvaughn/react-virtualized/blob/master/source/WindowScroller/WindowScroller.example.js
        <WindowScroller
            onScroll={() => console.log('scroll')}
            scrollElement={document.getElementById(PAGE_ID) as HTMLElement}
        >
            {({
                width,
                height,
                registerChild,
                onChildScroll,
                isScrolling,
                scrollTop,
            }) => (
                <div
                    ref={registerChild}
                    className={classNames(cls.articleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <List
                        height={height ?? 700}
                        rowCount={rowCount}
                        rowHeight={isBig ? 700 : 330}
                        rowRenderer={rowRenderer}
                        width={width ? width - 80 : 700}
                        autoHeight
                        onScroll={onChildScroll}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                    />
                    {isLoading && getSkeletons(view)}
                </div>

            )}
        </WindowScroller>
    );
});
