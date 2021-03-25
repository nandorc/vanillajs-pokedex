// Interfaces
interface IPokemon {
    name: string;
    stats?: IPokemonStats;
}
interface IPokemonStats {
    'no.': string;
    level: string;
    type: string;
    hability: string;
    height: string;
    weight: string;
}
interface IActivePokemonStat {
    label: HTMLHeadingElement;
    value: HTMLElement;
}

// Classes
class ActivePokemonName {
    text: HTMLHeadingElement;
    icon: HTMLImageElement;
    constructor(name: string, type?: string) {
        this.buildText(name);
        if (type) {
            this.buildIcon(type);
        }
    }
    private buildText(name: string): void {
        const text = document.querySelector<HTMLHeadingElement>('.o-pokemon-info_name_text');
        if (null !== text) {
            text.innerHTML = name.toUpperCase();
            this.text = text;
        }
    }
    private buildIcon(type: string): void {
        const icon = document.querySelector<HTMLImageElement>('.o-pokemon-info_name_icon');
        if (null !== icon) {
            icon.setAttribute('src', `img/icons/${type.toLowerCase()}.svg`);
            this.icon = icon;
        }
    }
}
class ActivePokemonStat {
    static buildStat(label: string, value: string): [HTMLDivElement, IActivePokemonStat] {
        const container = document.createElement('div');
        container.classList.add('m-stat');
        const statLabel = document.createElement('h3');
        statLabel.classList.add('m-stat_label');
        const upperCaseLabel = label.toUpperCase();
        statLabel.innerHTML = upperCaseLabel;
        container.appendChild(statLabel);
        const statValue = document.createElement('span');
        statValue.classList.add('m-stat_value');
        statValue.innerHTML = (upperCaseLabel === 'HEIGHT' || upperCaseLabel === 'WEIGHT') ? value : value.toUpperCase();
        container.appendChild(statValue);
        return [container, { label: statLabel, value: statValue }];
    }
}
class ActivePokemon {
    name: ActivePokemonName;
    image: HTMLImageElement;
    stats: IActivePokemonStat[];
    constructor(pokemon: IPokemon) {
        if (pokemon.stats) {
            this.name = new ActivePokemonName(pokemon.name, pokemon.stats.type);
            this.buildStats(pokemon.stats);
        } else {
            this.name = new ActivePokemonName(pokemon.name);
        }
        this.buildImage(pokemon.name);
    }
    private buildImage(name: string): void {
        const image = document.querySelector<HTMLImageElement>('.o-pokemon-info_image');
        if (null !== image) {
            image.setAttribute('src', `img/pokemons/${name}.png`);
            this.image = image;
        }
    }
    private buildStats(stats: IPokemonStats) {
        const pokemonStats = document.querySelector<HTMLElement>('.o-pokemon-stats');
        if (null !== pokemonStats) {
            this.stats = [];
            for (let stat in stats) {
                let [container, pokemonStat] = ActivePokemonStat.buildStat(stat, stats[stat]);
                this.stats.push(pokemonStat);
                pokemonStats.appendChild(container);
            }
        }
    }
}
class InactivePokemon {
    static build(pokemon: IPokemon): HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add('m-other');
        button.setAttribute('type', 'button');
        const image = document.createElement('img');
        image.setAttribute('src', `img/pokemons/${pokemon.name}.png`);
        image.setAttribute('alt', `Minitura del pokemon ${pokemon.name}`);
        image.classList.add('m-other_image');
        button.appendChild(image);
        return button;
    }
}
// Pokemons
const charizard: IPokemon = {
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
const squirtle: IPokemon = { name: 'Squirtle' };
const mewtwo: IPokemon = { name: 'Mewtwo' };
const solgaleo: IPokemon = { name: 'Solgaleo' };
const snorlax: IPokemon = { name: 'Snorlax' };

// List of Pokemons
const pokemonList: IPokemon[] = [charizard, squirtle, mewtwo, solgaleo, snorlax];

// Componentes de la página
const active = new ActivePokemon(charizard);
const othersList = document.querySelector<HTMLElement>('.o-others');
if (null != othersList) {
    for (let i = 1; i < pokemonList.length; i++) {
        othersList.appendChild(InactivePokemon.build(pokemonList[i]));
    }
}