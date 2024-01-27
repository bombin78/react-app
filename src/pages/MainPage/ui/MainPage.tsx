import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Main page')}
            <HStack>
                <div>acrefa frae</div>
                <ListBox
                    defaultValue="Выберите значение"
                    onChange={(value) => {}}
                    value={undefined}
                    items={[
                        { value: '1', content: '121' },
                        { value: '2', content: '122' },
                        { value: '3', content: '123', disabled: true },
                        { value: '4', content: '124' },
                        { value: '5', content: '125' },
                    ]}
                />
            </HStack>
        </Page>
    );
});

export default MainPage;
