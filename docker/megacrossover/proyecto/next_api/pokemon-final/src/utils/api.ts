import { Pokemon } from '@/types';

const API_URL = 'https://pokeapi.co/api/v2';

// Función para obtener datos de un Pokemon específico por su ID
export const getPokemonById = async (id: number): Promise<Pokemon | null> => {
    try {
        const res = await fetch(`${API_URL}/pokemon/${id}`);
        if (!res.ok) return null; // Si falla la respuesta, retornamos null
        const data = await res.json();

        // Mapeamos los datos de la API a nuestro tipo 'Pokemon' simplificado
        return {
            id: data.id,
            name: data.name,
            // Priorizamos la imagen "Official Artwork", si no existe usamos la default
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name),
            // Extraemos estadísticas base específicas
            stats: {
                hp: data.stats.find((s: any) => s.stat.name === 'hp').base_stat,
                attack: data.stats.find((s: any) => s.stat.name === 'attack').base_stat,
                defense: data.stats.find((s: any) => s.stat.name === 'defense').base_stat,
            }
        };
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        return null;
    }
};

export const getRandomPokemon = async (min: number, max: number): Promise<Pokemon | null> => {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return getPokemonById(id);
};

// Función para obtener 10 pokemons aleatorios de una generación específica
export const getGenerationPokemon = async (genId: number): Promise<Pokemon[]> => {
    // Definimos rangos de ID según la generación seleccionada (Gen 1, 2 o 3)
    let min = 1, max = 151;
    if (genId === 2) { min = 152; max = 251; }
    if (genId === 3) { min = 252; max = 386; }
    if (genId === 4) { min = 387; max = 493; }

    const promises = [];
    // Usamos un Set para asegurar que los IDs sean únicos (no repetidos)
    const ids = new Set<number>();
    while (ids.size < 10) {
        ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    // Creamos un array de promesas para buscar todos los pokemons en paralelo
    for (const id of Array.from(ids)) {
        promises.push(getPokemonById(id));
    }

    // Esperamos a que todas las peticiones terminen
    const results = await Promise.all(promises);
    // Filtramos posibles nulos en caso de error en alguna petición
    return results.filter((p): p is Pokemon => p !== null);
};
