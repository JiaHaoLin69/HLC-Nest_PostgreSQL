'use client';

// Importaciones
import React, { useState } from 'react';
import { Pokemon } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PokemonCard.module.css';
import PokemonModal from './PokemonModal';

// Tarjeta individual de Pokemon
const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    const { dict: t } = useLanguage();
    // Estado para mostrar/ocultar el modal de detalles
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Tarjeta Visual */}
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <span className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</span>
                    <h3 className={styles.name}>{pokemon.name}</h3>
                    {/* Botón para abrir detalles */}
                    <button className={styles.button} onClick={() => setShowModal(true)}>
                        {t.details}
                    </button>
                </div>
            </div>

            {/* Modal de Detalles (se muestra si showModal es true) */}
            {showModal && (
                <PokemonModal pokemon={pokemon} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default PokemonCard;
