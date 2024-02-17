import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import { ArticleList } from 'entities/Article';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationList } from '../../api/articleRecommendationApi';

interface ArticleRecommendationListProps {
    className?: string;
}

export const ArticleRecommendationList = memo((
    props: ArticleRecommendationListProps,
) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        error,
        isLoading,
        data: articles,
    } = useArticleRecommendationList(3);

    if (isLoading || error || !articles) {
        // TODO: в случае с isLoading здесь необходимо отрисовывать спиннер,
        // в случае с error необходимо отрисовывать заглушку для ошибки, а
        // в случае отсутствия статей - заглушку для случая с их отсутствием
        return null;
    }

    return (
        <VStack
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text
                size={TextSize.L}
                title={t('We recommend')}
            />
            <ArticleList
                articles={articles}
                target="_blank"
                virtualized={false}
            />
        </VStack>
    );
});
