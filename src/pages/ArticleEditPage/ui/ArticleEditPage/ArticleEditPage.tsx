// TODO: доделать страницу создания/редактирования статьи
// Предполагается, что для логики по созданию/редактированию статьи
// будет создан компонент: фича или виджет в зависимости от сложности
// Например, это может быть виджет "articleEditForm" обобщающий фичи:
// - создание текстового блока
// - создание блока с изображением
// - создание блока с кодом
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.articleEditPage, {}, [className])}>
            {isEdit
                ? t('Editing an article with an ID = ') + id
                : t('Creating a new article')}
        </Page>
    );
});

export default ArticleEditPage;
