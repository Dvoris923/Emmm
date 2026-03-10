import React from 'react';
import styles from './TrustBlock.module.scss';
import { useTranslation } from 'react-i18next';

const logos = [
  {
    id: 1,
    src: './public/img/image 29.png',
    alt: 'Speech Therapy',
  },
  { id: 2, src: './public/img/image 30.png', alt: 'Therapy' },
  { id: 3, src: './public/img/image 31.png', alt: 'Mental Health' },
  { id: 4, src: './public/img/image 32.png', alt: 'Health' },
  {
    id: 5,
    src: './public/img/image 33.png',
    alt: 'Speech Therapy Blue',
  },
];

export const TrustBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.trustBlock}>
      <h2 className={styles.trustBlock__title}>{t('trust_title')}</h2>
      <div className={styles.logos_grid}>
        {logos.map(logo => (
          <div key={logo.id} className={styles.logo_item}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};
