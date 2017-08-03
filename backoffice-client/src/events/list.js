import React from 'react';
import moment from 'moment';

import { Route, Link } from 'react-router-dom';
import { base } from '../firebase/init';
import { withRouter } from 'react-router-dom';

const format = 'DD/MM/YYYY h:mma';

export default withRouter(
	class ListEvents extends React.Component {
		constructor(props) {
			super(props);

			this.state = { events: [] };
		}

		componentDidMount() {
			base.listenTo('opportunities', {
				context: this,
				asArray: true,
				keepKeys: true,
				then: data => {
					this.setState({
						events: data.map(event => ({
							...event,
							start: moment(event.start),
							finish: moment(event.finish),
						})),
					});
				},
			});
		}

		add(event) {
			base
				.push('opportunities', {
					data: { title: 'New Event' },
				})
				.then(result => {
					this.props.history.push(`${this.props.match.url}/${result.key}`);
				})
				.catch(error => {
					this.setState({
						error,
					});
				});
		}

		render() {
			return (
				<div>
					<Link to="/">Back</Link>
					{this.state.error && <div>{this.state.error.message}</div>}
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Description</th>
								<th>Type</th>
								<th>Start</th>
								<th>End</th>
								<th>Spots Left</th>
								<th>Max Volunteers</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{this.state.events.map(event =>
								<tr key={event.key}>
									<td>{event.title}</td>
									<td>{event.description}</td>
									<td>{event.event_type}</td>
									<td>{event.start.format(format)}</td>
									<td>{event.finish.format(format)}</td>
									<td>{event.spots_left}</td>
									<td>{event.max_volunteers}</td>
									<td>
										<Link to={`${this.props.match.url}/${event.key}`}>Edit</Link>
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<button onClick={this.add.bind(this)}>Add</button>
				</div>
			);
		}
	}
);
