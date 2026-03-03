'use client';

// Importaciones
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

// Página de Contacto
export default function Contact() {
    // Obtenemos el diccionario de traducciones
    const { dict: t } = useLanguage();

    return (
        <div className={styles.container}>
            {/* Tarjeta con efecto de cristal (glassmorphism) */}
            <div className={`${styles.card} glass`}>
                <h1 className={styles.title}>{t.contact}</h1>
                <p className={styles.text}>
                    {/* Reemplazamos el placeholder [Tu Nombre] dinámicamente */}
                    {t.footer_text.replace('[Tu Nombre]', 'Jiahao')}
                </p>
            </div>
        </div>
    );
}
