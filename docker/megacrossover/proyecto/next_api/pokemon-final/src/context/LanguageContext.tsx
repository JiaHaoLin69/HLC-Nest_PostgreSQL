'use client';

import { createContext, useContext, useState } from 'react';
import { getDictionary } from './diccionario';

// Definición del tipo de datos que compartirá nuestro contexto
type LanguageContextType = {
    idioma: string;
    setIdioma: (lang: string) => void;
    dict: any; // Objeto con todas las traducciones
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// Provider: Componente que envuelve la app y "provee" el estado del idioma
export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [idioma, setIdioma] = useState('en'); // Idioma por defecto: Inglés
    const dict = getDictionary(idioma); // Carga el diccionario según el idioma actual

    return (
        // Pasamos los valores (idioma, setter, diccionario) a todos los hijos
        <LanguageContext.Provider value={{ idioma, setIdioma, dict }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom Hook: Facilita el acceso al contexto desde cualquier componente
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
    }
    return context; // Retorna { idioma, setIdioma, dict }
};
