import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const styledLink = styled(Route)`
		text-decoration: none;
		color:black;
		&:foucs,
		&:hover,
		&visited,
		&link,
		&active {
			text-decoration:none;
		}`;

 class PokemonList extends React.Component {

	state = {
		name: '',
		imageUrl: '',
		index: ''
	}

	componentDidMount() {
		const { name, url } = this.props;
		const index = url.split('/')[url.split('/').length - 2];
		const imageUrl = `https//github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png`;

		this.setState({
			name, imageUrl, index
		})
		
		
	}
	render() {
		const { name, url } = this.props;
		
		return (
			<li>
			<Link to={`pokemon/${this.state.index}`}>
				{this.state.name}
			</Link>
			</li>
	
		)
	}
	
}
export default PokemonList;