// Types
interface Pokemon {
    name: string;
    stats?: PokemonStats;
}
interface PokemonStats {
    'no.': string;
    level: string;
    type: string;
    hability: string;
    height: string;
    weight: string;
}
// Pokemons
const charizard: Pokemon = {
    name: 'Charizard',
    stats: {
        'no.': '006',
        level: '100',
        type: 'Fire',
        hability: 'Flames',
        height: '1,7 m',
        weight: '90,5 kg'
    }
};
const squirtle: Pokemon = { name: 'Squirtle' };
const mewtwo: Pokemon = { name: 'Mewtwo' };
const solgaleo: Pokemon = { name: 'Solgaleo' };
const snorlax: Pokemon = { name: 'Snorlax' };
// List of Pokemons
const PokemonList: Pokemon[] = [charizard, squirtle, mewtwo, solgaleo, snorlax];
console.log(PokemonList);