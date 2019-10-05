import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

import Header from "./Header";
class Welcome extends Component {
	render() {
		return (
			<div className="bg-block">
				<Header view="home" />
				<div className="mainContainer">
					<h2>Welcome to the PokeApp</h2>
					<Link
						to="/search"
						className="go"
						style={{ textDecoration: "none", color: "black" }}
					>
						Go!
					</Link>
				</div>
			</div>
		);
	}
}
export default Welcome;
