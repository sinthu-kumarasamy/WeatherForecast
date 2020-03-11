import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App,Weather} from './App';
//import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Router>
	<div>
	    <Route path='/' component={App} />
	    <Route path='/weather' component={Weather} />
	</div>
  	</Router>, 
  	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();