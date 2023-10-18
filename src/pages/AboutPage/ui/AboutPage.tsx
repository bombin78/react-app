import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = memo(() => {
    const { t } = useTranslation();

    return (
        <div>
            {t('About us')}
        </div>
    );
});

export default AboutPage;
