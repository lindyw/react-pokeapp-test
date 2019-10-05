import React, { Component } from "react";
import axios from "axios";
import "./Search.css";
// Components
import Header from "./Header";
import PokemonList from "./PokemonList";

class Search extends Component {
	// state
	state = {
		url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964",
		pokemons: [],
		filter: ""
	};

	async componentDidMount() {
		const res = await axios.get(this.state.url);
		//
		this.setState({ pokemons: res.data["results"] });
	}

	updateSearch(event) {
		this.setState({ filter: event.target.value.substr(0, 20) });
	}

	// JSX render
	render() {
		// Return filtered results
		let filteredNames = this.state.pokemons.filter(pokemon => {
			return pokemon.name.indexOf(this.state.filter) !== -1;
		});
		return (
			<React.Fragment>
				<Header view="search" />
				{this.state.pokemons ? (
					<div className="searchList">
						<ul>
							<input
								type="text"
								value={this.state.filter}
								placeholder="Filter by name"
								onChange={this.updateSearch.bind(this)}
							/>
							{filteredNames.map(pokemon => (
								<PokemonList
									key={pokemon.name}
									name={pokemon.name}
									url={pokemon.url}
								/>
							))}
						</ul>
					</div>
				) : (
					<h1>Loading Pokemons</h1>
				)}
			</React.Fragment>
		);
	}
}
export default Search;
