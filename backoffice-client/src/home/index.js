import React from 'react';

import { Link } from 'react-router-dom';

export default function Home(props) {
	return (
		<div>
			<h1>Home</h1>
			<ul>
				<li><Link to="/events">Users</Link></li>
				<li><Link to="/events">Events</Link></li>
			</ul>
		</div>
	);
}
