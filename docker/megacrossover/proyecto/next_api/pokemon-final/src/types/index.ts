export type Language = 'es' | 'en' | 'fr';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types?: string[];
  stats?: {
    hp: number;
    attack: number;
    defense: number;
  };
}

export type Translations = {
  [key in Language]: {
    welcome: string;
    home: string;
    generations: string;
    gen1: string;
    gen2: string;
    gen3: string;
    gen4: string;
    more_generations: string;
    contact: string;
    details: string;
    footer_text: string;
    loading: string;
    error: string;
    height: string;
    weight: string;
    stats: string;
    language: string;
    notFound: string;
  };
};

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
