'use client';

// Importaciones
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';

// Componente Header (Barra de navegación)
const Header = () => {
    // Hooks para idiomas y estado del menú
    const { dict: t, idioma: language, setIdioma: setLanguage } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Renderizado del Header
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">Pokemon App</Link>
                </div>
                <button
                    className={styles.mobileToggle}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {/* Navegación Principal */}
                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                    <Link href="/" className={styles.link}>{t.home}</Link>

                    {/* Menú desplegable de Generaciones */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <span className={styles.link}>{t.generations} ▾</span>

                        {dropdownOpen && (
                            <div className={styles.dropdownContent}>
                                <Link href="/generacion/1">{t.gen1}</Link>
                                <Link href="/generacion/2">{t.gen2}</Link>

                                {/* Submenú para más generaciones */}
                                <div className={styles.submenuTrigger} style={{ padding: '0.75rem 1rem', cursor: 'pointer' }}>
                                    {t.more_generations}
                                    <div className={styles.submenu}>
                                        <Link href="/generacion/3">{t.gen3}</Link>
                                        <Link href="/generacion/4">{t.gen4}</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/contacto" className={styles.link}>{t.contact}</Link>

                    {/* Selector de Idioma */}
                    <div className={styles.langSwitcher}>
                        <button
                            className={language === 'es' ? styles.activeLang : ''}
                            onClick={() => setLanguage('es')}
                        >
                            SP
                        </button>
                        <button
                            className={language === 'en' ? styles.activeLang : ''}
                            onClick={() => setLanguage('en')}
                        >
                            EN
                        </button>
                        <button
                            className={language === 'fr' ? styles.activeLang : ''}
                            onClick={() => setLanguage('fr')}
                        >
                            FR
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
