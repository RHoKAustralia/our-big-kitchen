import React from 'react';

import { base } from '../firebase/init';
import { withRouter, Link } from 'react-router-dom';

export default withRouter(
	class EditUser extends React.Component {
		constructor(props) {
			super(props);

			this.state = {};
		}

		componentDidMount() {
			base.syncState(`users/${this.props.match.params.id}/profile`, {
				context: this,
				state: 'profile',
			});
		}

		onChange(key, newValue) {
			this.setState(state => ({
				profile: {
					...state.profile,
					[key]: newValue,
				},
			}));
		}

		onTextboxChange(key, event) {
			const newValue = event.target.value;

			this.onChange(key, newValue);
		}

		onCheckboxChange(key, event) {
			const newValue = event.target.checked;

			this.onChange(key, newValue);
		}

		render() {
			const profile = this.state.profile;

			return profile
				? <div>
						{this.state.error && <div>Error: {this.state.error.message}</div>}
						<div>
							<label>
								Display Name:{' '}
								<input type="text" value={profile.displayName} onChange={this.onChange.bind(this, 'displayName')} />
							</label>
						</div>
						<div>
							<label>
								Email:{' '}
								<input type="text" value={profile.email} onChange={this.onChange.bind(this, 'email')} />
							</label>
						</div>
						<div>
							<label>
								Mobile:{' '}
								<input type="text" value={profile.mobile} onChange={this.onChange.bind(this, 'mobile')} />
							</label>
						</div>
						<div>
							<label>
								D.O.B.:{' '}
								<input type="text" value={profile.dob} onChange={this.onChange.bind(this, 'dob')} />
							</label>
						</div>
						<div>
							<label>
								WWCN:{' '}
								<input type="text" value={profile.wwcn} onChange={this.onChange.bind(this, 'wwcn')} />
							</label>
						</div>
						<div>
							<label>
								Is Admin:{' '}
								<input
									type="checkbox"
									checked={profile.isAdmin}
									onChange={this.onCheckboxChange.bind(this, 'isAdmin')}
								/>
							</label>
						</div>
						<div>
							<label>
								Is Super Admin:{' '}
								<input
									type="checkbox"
									checked={profile.isSuperAdmin}
									onChange={this.onCheckboxChange.bind(this, 'isSuperAdmin')}
								/>
							</label>
						</div>
						<Link to="/users">Back</Link>
					</div>
				: <div>Loading...</div>;
		}
	}
);
