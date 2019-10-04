import React, { Component }from 'react';

class PokemonList extends React.Component {

	render() {
		const name = this.props.name;
		const url = this.props.url;

		return (
			<li><a href={url} alt={name}>{name}</a></li>
	
		)
	}
	
}

export default PokemonList;