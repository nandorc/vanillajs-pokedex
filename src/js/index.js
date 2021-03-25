class ActivePokemonName {
    constructor(name, type) {
        this.buildText(name);
        if (type) {
            this.buildIcon(type);
        }
    }
    buildText(name) {
        const text = document.querySelector('.o-pokemon-info_name_text');
        if (null !== text) {
            text.innerHTML = name.toUpperCase();
            this.text = text;
        }
    }
    buildIcon(type) {
        const icon = document.querySelector('.o-pokemon-info_name_icon');
        if (null !== icon) {
            icon.setAttribute('src', `img/icons/${type.toLowerCase()}.svg`);
            this.icon = icon;
        }
    }
}
class ActivePokemonStat {
    static buildStat(label, value) {
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
    constructor(pokemon) {
        if (pokemon.stats) {
            this.name = new ActivePokemonName(pokemon.name, pokemon.stats.type);
            this.buildStats(pokemon.stats);
        }
        else {
            this.name = new ActivePokemonName(pokemon.name);
        }
        this.buildImage(pokemon.name);
    }
    buildImage(name) {
        const image = document.querySelector('.o-pokemon-info_image');
        if (null !== image) {
            image.setAttribute('src', `img/pokemons/${name}.png`);
            this.image = image;
        }
    }
    buildStats(stats) {
        const pokemonStats = document.querySelector('.o-pokemon-stats');
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
    static build(pokemon) {
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
const charizard = {
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
const squirtle = { name: 'Squirtle' };
const mewtwo = { name: 'Mewtwo' };
const solgaleo = { name: 'Solgaleo' };
const snorlax = { name: 'Snorlax' };
const pokemonList = [charizard, squirtle, mewtwo, solgaleo, snorlax];
const active = new ActivePokemon(charizard);
const othersList = document.querySelector('.o-others');
if (null != othersList) {
    for (let i = 1; i < pokemonList.length; i++) {
        othersList.appendChild(InactivePokemon.build(pokemonList[i]));
    }
}
