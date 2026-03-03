
import { Translations } from '@/types';

export const dictionary: Translations = {
    es: {
        welcome: "¡Bienvenido al Mundo Pokémon!",
        home: "Inicio",
        generations: "Generaciones",
        gen1: "Primera Generación",
        gen2: "Segunda Generación",
        gen3: "Tercera Generación",
        gen4: "Cuarta Generación",
        more_generations: "Más Generaciones",
        contact: "Contacto",
        details: "Ver detalle",
        footer_text: "Esta web está generada en NEXT por el alumno [Tu Nombre] del IES Cura Valera.",
        loading: "Cargando Pokémon...",
        error: "Ocurrió un error al cargar.",
        height: "Altura",
        weight: "Peso",
        stats: "Estadísticas",
        language: "Idioma",
        notFound: "Página no encontrada",
    },
    en: {
        welcome: "Welcome to the Pokemon World!",
        home: "Home",
        generations: "Generations",
        gen1: "First Generation",
        gen2: "Second Generation",
        gen3: "Third Generation",
        gen4: "Fourth Generation",
        more_generations: "More Generations",
        contact: "Contact",
        details: "View Details",
        footer_text: "This website is generated in NEXT by the student [Your Name] from IES Cura Valera.",
        loading: "Loading Pokemon...",
        error: "An error occurred while loading.",
        height: "Height",
        weight: "Weight",
        stats: "Stats",
        language: "Language",
        notFound: "Page Not Found",
    },
    fr: {
        welcome: "Bienvenue dans le monde Pokémon!",
        home: "Accueil",
        generations: "Générations",
        gen1: "Première Génération",
        gen2: "Deuxième Génération",
        gen3: "Troisième Génération",
        gen4: "Quatrième Génération",
        more_generations: "Plus de Générations",
        contact: "Contact",
        details: "Voir détails",
        footer_text: "Ce site est généré en NEXT par l'étudiant [Votre Nom] de l'IES Cura Valera.",
        loading: "Chargement Pokémon...",
        error: "Une erreur s'est produite.",
        height: "Taille",
        weight: "Poids",
        stats: "Statistiques",
        language: "Langue",
        notFound: "Page non trouvée",
    }
};

export const getDictionary = (lang: string) => {
    return dictionary[lang as keyof typeof dictionary] || dictionary.es;
};
