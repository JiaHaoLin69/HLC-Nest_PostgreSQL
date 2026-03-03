'use client';

import React, { useEffect, useState } from 'react';
import { Pokemon } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PokemonModal.module.css';

interface Props {
    pokemon: Pokemon;
    onClose: () => void;
}

// Modal (Ventana emergente) con detalles del Pokemon
import { getPokemonById } from '@/utils/api';

const PokemonModal = ({ pokemon: initialPokemon, onClose }: Props) => {
    const { dict: t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [pokemon, setPokemon] = useState(initialPokemon);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';

        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    // Actualizar pokemon si cambia la prop (aunque normalmente no pasa en este contexto modal)
    useEffect(() => {
        setPokemon(initialPokemon);
    }, [initialPokemon]);

    // Función para manejar el cierre con animación
    const handleClose = () => {
        setIsVisible(false); 
        setTimeout(onClose, 300);
    };

    const handlePrev = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (pokemon.id <= 1 || loading) return;

        setLoading(true);
        const prev = await getPokemonById(pokemon.id - 1);
        if (prev) {
            setPokemon(prev);
        }
        setLoading(false);
    };

    const handleNext = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        const next = await getPokemonById(pokemon.id + 1);
        if (next) {
            setPokemon(next);
        }
        setLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={handleClose}>×</button>

                <div className={styles.header} style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                    <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
                    <h2 className={styles.name}>{pokemon.name} <span className={styles.id}>#{pokemon.id}</span></h2>
                </div>

                <div className={styles.statsLayout} style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>HP</span>
                        <div className={styles.barContainer}>
                            <div
                                className={`${styles.bar} ${styles.hp}`}
                                style={{ '--stat-width': `${Math.min(pokemon.stats?.hp || 0, 100)}%` } as React.CSSProperties}
                            />
                        </div>
                        <span className={styles.statValue}>{pokemon.stats?.hp}</span>
                    </div>

                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Attack</span>
                        <div className={styles.barContainer}>
                            <div
                                className={`${styles.bar} ${styles.attack}`}
                                style={{ '--stat-width': `${Math.min(pokemon.stats?.attack || 0, 100)}%` } as React.CSSProperties}
                            />
                        </div>
                        <span className={styles.statValue}>{pokemon.stats?.attack}</span>
                    </div>

                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Defense</span>
                        <div className={styles.barContainer}>
                            <div
                                className={`${styles.bar} ${styles.defense}`}
                                style={{ '--stat-width': `${Math.min(pokemon.stats?.defense || 0, 100)}%` } as React.CSSProperties}
                            />
                        </div>
                        <span className={styles.statValue}>{pokemon.stats?.defense}</span>
                    </div>
                </div>

                <div className={styles.navigation}>
                    <button
                        className={styles.navBtn}
                        onClick={handlePrev}
                        disabled={pokemon.id <= 1 || loading}
                    >
                        ← Prev
                    </button>
                    <button
                        className={styles.navBtn}
                        onClick={handleNext}
                        disabled={loading || pokemon.id >= 1000}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;
