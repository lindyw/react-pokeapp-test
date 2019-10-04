import React, { Component }from 'react';
import axios from 'axios';
import './Search.css';
// Components
import Header from './Header';

class Search extends Component {

	// state
	state = {
		pokeSearch: '',
		onLoad: false,
		data: {}
	};


	// JSX render
	render() {
		return (
			<div>
				<Header view="search"/>
				<h1>Search page</h1>
			</div>
		)
	}
}

export default Search;