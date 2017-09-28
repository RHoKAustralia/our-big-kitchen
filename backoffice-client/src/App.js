import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Events from './events';
import Home from './home';
import Login from './login';
import Users from './users';
import { firebase, base } from './firebase/init';

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

			if (this.syncRef) {
				base.removeBinding(this.syncRef);
			}

			if (user && user.uid) {
				this.syncRef = base.syncState(`users/${user.uid}/profile`, {
					context: this,
					state: 'userProfile',
				});
			}
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
					{!this.state.loading && !this.state.user && <div><Login /></div>}
					{!this.state.loading &&
						this.state.userProfile &&
						(this.state.userProfile.isAdmin
							? <div>
									<Route exact path="/" component={Home} />
									<Route path="/events" component={Events} />
									<Route path="/users" component={Users} />
								</div>
							: <div>You are logged in but not an admin! Get someone to give you admin powers!</div>)}

				</div>
			</BrowserRouter>
		);
	}
}

export default App;
