'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActivePokemonName = function () {
    function ActivePokemonName(name, type) {
        _classCallCheck(this, ActivePokemonName);

        this.buildText(name);
        if (type) {
            this.buildIcon(type);
        }
    }

    _createClass(ActivePokemonName, [{
        key: 'buildText',
        value: function buildText(name) {
            var text = document.querySelector('.o-pokemon-info_name_text');
            if (null !== text) {
                text.innerHTML = name.toUpperCase();
                this.text = text;
            }
        }
    }, {
        key: 'buildIcon',
        value: function buildIcon(type) {
            var icon = document.querySelector('.o-pokemon-info_name_icon');
            if (null !== icon) {
                icon.setAttribute('src', 'img/icons/' + type.toLowerCase() + '.svg');
                this.icon = icon;
            }
        }
    }]);

    return ActivePokemonName;
}();

var ActivePokemonStat = function () {
    function ActivePokemonStat() {
        _classCallCheck(this, ActivePokemonStat);
    }

    _createClass(ActivePokemonStat, null, [{
        key: 'buildStat',
        value: function buildStat(label, value) {
            var container = document.createElement('div');
            container.classList.add('m-stat');
            var statLabel = document.createElement('h3');
            statLabel.classList.add('m-stat_label');
            var upperCaseLabel = label.toUpperCase();
            statLabel.innerHTML = upperCaseLabel;
            container.appendChild(statLabel);
            var statValue = document.createElement('span');
            statValue.classList.add('m-stat_value');
            statValue.innerHTML = upperCaseLabel === 'HEIGHT' || upperCaseLabel === 'WEIGHT' ? value : value.toUpperCase();
            container.appendChild(statValue);
            return [container, { label: statLabel, value: statValue }];
        }
    }]);

    return ActivePokemonStat;
}();

var ActivePokemon = function () {
    function ActivePokemon(pokemon) {
        _classCallCheck(this, ActivePokemon);

        if (pokemon.stats) {
            this.name = new ActivePokemonName(pokemon.name, pokemon.stats.type);
            this.buildStats(pokemon.stats);
        } else {
            this.name = new ActivePokemonName(pokemon.name);
        }
        this.buildImage(pokemon.name);
    }

    _createClass(ActivePokemon, [{
        key: 'buildImage',
        value: function buildImage(name) {
            var image = document.querySelector('.o-pokemon-info_image');
            if (null !== image) {
                image.setAttribute('src', 'img/pokemons/' + name + '.png');
                this.image = image;
            }
        }
    }, {
        key: 'buildStats',
        value: function buildStats(stats) {
            var pokemonStats = document.querySelector('.o-pokemon-stats');
            if (null !== pokemonStats) {
                this.stats = [];
                for (var stat in stats) {
                    var _ActivePokemonStat$bu = ActivePokemonStat.buildStat(stat, stats[stat]),
                        _ActivePokemonStat$bu2 = _slicedToArray(_ActivePokemonStat$bu, 2),
                        container = _ActivePokemonStat$bu2[0],
                        pokemonStat = _ActivePokemonStat$bu2[1];

                    this.stats.push(pokemonStat);
                    pokemonStats.appendChild(container);
                }
            }
        }
    }]);

    return ActivePokemon;
}();

var InactivePokemon = function () {
    function InactivePokemon() {
        _classCallCheck(this, InactivePokemon);
    }

    _createClass(InactivePokemon, null, [{
        key: 'build',
        value: function build(pokemon) {
            var button = document.createElement('button');
            button.classList.add('m-other');
            button.setAttribute('type', 'button');
            var image = document.createElement('img');
            image.setAttribute('src', 'img/pokemons/' + pokemon.name + '.png');
            image.setAttribute('alt', 'Minitura del pokemon ' + pokemon.name);
            image.classList.add('m-other_image');
            button.appendChild(image);
            return button;
        }
    }]);

    return InactivePokemon;
}();

var charizard = {
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
var squirtle = { name: 'Squirtle' };
var mewtwo = { name: 'Mewtwo' };
var solgaleo = { name: 'Solgaleo' };
var snorlax = { name: 'Snorlax' };
var pokemonList = [charizard, squirtle, mewtwo, solgaleo, snorlax];
var active = new ActivePokemon(charizard);
var othersList = document.querySelector('.o-others');
if (null != othersList) {
    for (var i = 1; i < pokemonList.length; i++) {
        othersList.appendChild(InactivePokemon.build(pokemonList[i]));
    }
}