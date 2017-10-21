import React from 'react';

import { Route, Link } from 'react-router-dom';

import { base } from '../firebase/init';
import EditUser from './edit';
import ListUsers from './list';

export default class UsersIndex extends React.Component {
	render() {
		return (
			<div>
				<h2>Users</h2>
				<Route exact path={`${this.props.match.url}`} component={ListUsers} />
				<Route path={`${this.props.match.url}/:id`} component={EditUser} />
			</div>
		);
	}
}
