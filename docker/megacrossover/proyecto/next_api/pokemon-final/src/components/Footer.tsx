'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

// Componente Footer (Pie de página)
const Footer = () => {
    const { dict: t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <p>{t.footer_text.replace('[Tu Nombre]', 'Jiahao')}</p>
        </footer>
    );
};

export default Footer;
