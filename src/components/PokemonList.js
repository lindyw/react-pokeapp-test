import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// try using styled-components
const styledLink = styled(Link)`
	text-decoration: none;
	color: black;
	&:foucs,
	&:hover,
	&visited,
	&link,
	&active {
		text-decoration: none;
	}
`;

class PokemonList extends React.Component {
	state = {
		name: "",
		index: ""
	};

	componentDidMount() {
		const { name, url } = this.props;
		const index = url.split("/")[url.split("/").length - 2];

		this.setState({
			name,
			index
		});
	}
	render() {
		return (
			<li>
				<Link to={`pokemon/${this.state.index}`}>
					{this.state.name}
				</Link>
			</li>
		);
	}
}
export default PokemonList;
