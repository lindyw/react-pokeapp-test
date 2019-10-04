import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header'

 class Pokemon extends Component {

 	state = {
 		name: '',
 		index: '',
 		imageUrl: '',
 		types: [],
 		description: '',
 		stats: {
 			hp:"",
 			attack: "",
 			defense: "",
 			speed: "",
 			specialAttack:"",
 			specialDefense: ""
 		},
 		height: "",
 		weight:"",
 		eggGroup: "",
 		abilities: "",
 		genderRatioMale: '',
 		genderRatioFemale:'',
 		evs: "",
 		hatchSteps: ""
 	};

 	async componentDidMount() {
 		const {index} = this.props.match.params;
 		// Urls for pokemon detail information
 		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
 		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
 		// Get Information
 		const pokemonData = await axios.get(pokemonUrl);
 		const name = pokemonData.data.name;
 		const imageUrl = pokemonData.data.sprites.front_default;

 		this.setState({name});
 		this.setState({imageUrl});

 		let {hp, attack, defense, speed, specialAttack, specialDefense } = '';

 		pokemonData.data.stats.map(stat => {
 			switch(stat.stat.name) {
 				case 'hp':
 					hp = stat['base_stat'];
 					break;
 				case 'attack':
 					attack = stat['base_stat'];
 					break;
 				case 'defense':
 					defense = stat['base_stat'];
 					break;
 				case 'speed':
 					speed = stat['base_stat'];
 					break;
 				case 'special-attack':
 					specialAttack = stat['base_stat'];
 					break;
 				case 'special-defense':
 					specialDefense = stat['base_stat'];
 					break;
 			}
 		});

 	}
	render() {
		return (
			<div>
			<Header view={this.state.name}/>
			<h1>{this.state.name}</h1>
			</div>
	
		)
	}
}
export default Pokemon;