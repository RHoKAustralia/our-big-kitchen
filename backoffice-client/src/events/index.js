import React from 'react';

import { Route, Link } from 'react-router-dom';

import { base } from '../firebase/init';
import EditEvent from './edit';
import ListEvents from './list';

export default class EventsIndex extends React.Component {
	render() {
		return (
			<div>
				<h1>Events</h1>
				<Route exact path={`${this.props.match.url}`} component={ListEvents} />
				<Route path={`${this.props.match.url}/add`} component={EditEvent} />
				<Route path={`${this.props.match.url}/:id`} component={EditEvent} />
			</div>
		);
	}
}
