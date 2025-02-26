import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "./Header";

const TYPE_COLORS = {
	bug: "success",
	dark: "dark",
	dragon: "info",
	electric: "warning",
	fairy: "info",
	fighting: "secondary",
	fire: "danger",
	flying: "primary",
	ghost: "light",
	grass: "success",
	ground: "dark",
	ice: "primary",
	normal: "secondary",
	poison: "danger",
	psychic: "warning",
	rock: "secondary",
	steel: "secondary",
	water: "primary"
};

class Pokemon extends Component {
	// States for holding all of the pokemon's information
	state = {
		name: "",
		index: "",
		imageUrl: "",
		types: [],
		moves: [],
		description: "",
		stats: {
			hp: "",
			attack: "",
			defense: "",
			speed: "",
			specialAttack: "",
			specialDefense: ""
		},
		height: "", //decimeters
		weight: "", // lbs
		eggGroups: "",
		abilities: "",
		efforts: "",
		hatchSteps: ""
	};

	// Methods
	async componentDidMount() {
		const { index } = this.props.match.params;
		// Urls for pokemon detail information
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}`;

		/* Pokemon: Get Information from pokemonUrl*/
		const pokemonData = await axios.get(pokemonUrl);
		const name = pokemonData.data.name;
		const imageUrl = pokemonData.data.sprites.front_default;

		this.setState({ name });
		this.setState({ imageUrl });

		let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

		pokemonData.data.stats.map(stat => {
			switch (stat.stat.name) {
				case "hp":
					hp = stat["base_stat"];
					break;
				case "attack":
					attack = stat["base_stat"];
					break;
				case "defense":
					defense = stat["base_stat"];
					break;
				case "speed":
					speed = stat["base_stat"];
					break;
				case "special-attack":
					specialAttack = stat["base_stat"];
					break;
				case "special-defense":
					specialDefense = stat["base_stat"];
					break;
				default:
					break;
			}
			return null;
		});

		const height = pokemonData.data["height"] + " dm";
		const weight = pokemonData.data["weight"] + " lbs";

		const types = pokemonData.data.types.map(type => type.type.name);
		// addition for styling: change the display color of type
		const typeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
		const moves = pokemonData.data.moves.map(move => move.move.name);
		// Deal with some abilities with dashes (and reformatting: Capitalization for the 1st letter)
		const abilities = pokemonData.data.abilities.map(ability => {
			return ability.ability.name
				.toLowerCase()
				.split("-")
				.map(a => a.charAt(0).toUpperCase() + a.substring(1))
				.join(" ");
		});

		// Only pass/map out when the effort > 0
		const efforts = pokemonData.data.stats
			.filter(stat => {
				if (stat.effort > 0) {
					return true;
				} else {
					return false; // effort 0 then we ignore it, don't pass it through
				}
			})
			.map(stat => {
				return `${stat.effort} ${stat.stat.name}`
					.toLowerCase()
					.split("-")
					.map(a => a.charAt(0).toUpperCase() + a.substring(1))
					.join(" ");
			})
			.join(", "); // join them with comma

		// Pass the information back to the state <- general
		this.setState({
			index,
			types,
			typeColor,
			moves,
			abilities,
			efforts,
			stats: {
				hp,
				attack,
				defense,
				speed,
				specialAttack,
				specialDefense
			},
			height,
			weight
		});

		/* PokemonSpecies: Get Pokemon's description, Catch Rate, EggGroups, Hatch Steps */
		const speciesData = await axios.get(pokemonSpeciesUrl);
		// await axios.get(pokemonSpeciesUrl).then(speciesData => {
		let description = "";
		// Need to get the English description from the entries (multiple languages flavor_text)
		speciesData.data.flavor_text_entries.some(flavor => {
			if (flavor.language.name === "en") {
				description = flavor.flavor_text;
				description = description.replace("\f", " "); // fix the display error
				return null;
			}
			return null;
		});

		// Capture_rate: the base rate is up to 255, round it back to 0-100
		const catchRate = Math.round(
			(100 / 255) * speciesData.data["capture_rate"]
		);

		// EggGroups: get all the names and join them back tgt
		const eggGroups = speciesData.data["egg_groups"]
			.map(group => {
				return group.name
					.toLowerCase()
					.split(" ")
					.map(a => a.charAt(0).toUpperCase() + a.substring(1))
					.join(" ");
			})
			.join(", ");

		// Hatch Steps: (255 * (hatch_counter + 1 ) steps before egg hatches)
		const hatchSteps = 255 * (speciesData.data["hatch_counter"] + 1);

		// Pass the information back to the state <- species
		this.setState({
			description,
			catchRate,
			eggGroups,
			hatchSteps
		});
	}

	// JSX
	render() {
		return (
			<div>
				<Header view={this.state.name} />
				<Card
					className="text-center mx-auto card h-100"
					style={{ width: "min-content", position: "inherit" }}
					border="warning"
				>
					<Card.Body>
						<Card.Title className="p-title p-text">
							{this.state.name}
						</Card.Title>
						<Card.Img
							variant="top"
							src={this.state.imageUrl}
							style={{ height: "25vh", width: "25vh" }}
						/>
						<br />
						<Card.Text style={{ padding: "15px" }}>
							<span className="p-text">Types: </span>
							{this.state.types.map(type => (
								<span
									key={type}
									className="badge badge-pill badge-primary mr-1 p-text"
								>
									{type}
								</span>
							))}
						</Card.Text>
						<span className="p-text">HP: </span>
						<ProgressBar
							striped
							variant="danger"
							now={this.state.stats.hp}
						/>
						<span className="p-text">Attack: </span>
						<ProgressBar
							striped
							variant={this.state.typeColor}
							now={this.state.stats.attack}
						/>
						<span className="p-text">Defense: </span>
						<ProgressBar
							striped
							variant={this.state.typeColor}
							now={this.state.stats.defense}
						/>
						<span className="p-text">Special Attack: </span>
						<ProgressBar
							striped
							variant={this.state.typeColor}
							now={this.state.stats.specialAttack}
						/>
						<span className="p-text">Sepcial Defense: </span>
						<ProgressBar
							striped
							variant={this.state.typeColor}
							now={this.state.stats.specialDefense}
						/>
						<br />
						<span className="p-description p-text">
							{this.state.description}
						</span>
						<hr />
						{/* More Details */}
						<Card.Title className="p-title">
							More Details
						</Card.Title>
						<Card.Text>
							<b>Height: </b> {this.state.height} <br />
							<b>Egg Groups: </b> {this.state.eggGroups} <br />
							<b>Weight:</b> {this.state.weight} <br />
							<b>Hatch Steps:</b> {this.state.hatchSteps} <br />
							<b>Catch Rate:</b> {this.state.catchRate}% <br />
							<b>Abilities:</b> {this.state.abilities} <br />
							<b>Efforts:</b> {this.state.efforts}
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
export default Pokemon;
