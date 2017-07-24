import React from 'react';

import { base } from '../firebase/init';
import { withRouter, Link } from 'react-router-dom';

export default withRouter(
	class EditEvent extends React.Component {
		constructor(props) {
			super(props);

			this.state = {};
		}

		componentDidMount() {
			base.syncState(`opportunities/${this.props.match.params.id}`, {
				context: this,
				state: 'event',
			});
		}

		onChange(key, event) {
			const newValue = event.target.value;

			this.setState(state => ({
				event: {
					...state.event,
					[key]: newValue,
				},
			}));
		}

		onDelete(event) {
			base
				.remove(`opportunities/${this.props.match.params.id}`)
				.then(result => this.props.history.push('/events'))
				.catch(error => {
					this.setState({
						error,
					});
				});
		}

		render() {
			const event = this.state.event;

			return event
				? <div>
						{this.state.error && <div>Error: {this.state.error.message}</div>}
						<div>
							<label>
								Title: <input type="text" value={event.title} onChange={this.onChange.bind(this, 'title')} />
							</label>
						</div>
						<div>
							<label>
								Description:{' '}
								<input type="text" value={event.description} onChange={this.onChange.bind(this, 'description')} />
							</label>
						</div>
						<div>
							<label>
								Event Type:{' '}
								<input type="text" value={event.event_type} onChange={this.onChange.bind(this, 'event_type')} />
							</label>
						</div>
						<div>
							<label>
								Start: <input type="text" value={event.start} onChange={this.onChange.bind(this, 'start')} />
							</label>
						</div>
						<div>
							<label>
								End: <input type="text" value={event.finish} onChange={this.onChange.bind(this, 'finish')} />
							</label>
						</div>
						<div>
							<label>
								Spots Left:{' '}
								<input type="text" value={event.spots_left} onChange={this.onChange.bind(this, 'spots_left')} />
							</label>
						</div>
						<div>
							<label>
								Max Volunteers:{' '}
								<input type="text" value={event.max_volunteers} onChange={this.onChange.bind(this, 'max_volunteers')} />
							</label>
						</div>
						<button onClick={this.onDelete.bind(this)}>Delete</button>
						<Link to="/events">Back</Link>
					</div>
				: <div>Loading...</div>;
		}
	}
);
