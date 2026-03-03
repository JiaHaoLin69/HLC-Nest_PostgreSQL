'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './not-found.module.css';

// Componente de página 404 personalizada
export default function NotFound() {
    const { dict: t } = useLanguage();

    return (
        <div className={styles.container}>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.message}>{t.notFound}</h2>
            {/* Link de Next.js para navegación sin recarga */}
            <Link href="/" className={styles.link}>
                {t.home}
            </Link>
        </div>
    );
}
