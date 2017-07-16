var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
	apiKey: 'AIzaSyC97oIiToe-R803x6NtTzTql4fU4t9QNgs',
	authDomain: 'voluncheering-c3ae7.firebaseapp.com',
	databaseURL: 'https://voluncheering-c3ae7.firebaseio.com',
	projectId: 'voluncheering-c3ae7',
	storageBucket: 'voluncheering-c3ae7.appspot.com',
	messagingSenderId: '150221963070',
});
var db = firebase.database(app);
var base = Rebase.createClass(db);

export { firebase, base };
