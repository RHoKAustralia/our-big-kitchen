import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Events from './events';
import Home from './home';
import Login from './login';
import { firebase } from './firebase/init.js';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			user: null,
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ loading: false, user });
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<div className="App-header">
						<h2>Welcome to Our Big Kitchen</h2>
					</div>

					{this.state.loading && <div>Loading...</div>}
					{!this.state.loading &&
						this.state.user &&
						<div>
							<Route exact path="/" component={Home} />
							<Route path="/events" component={Events} />
						</div>}

					{!this.state.loading && !this.state.user && <div><Login /></div>}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
