import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match} from 'react-router';
import './css/App.css';
import Login from './components/Login'; 
import App from './components/App';
// import NotFound from './components/NotFound';

const Root = () =>{
	return (
		<BrowserRouter >
			<div>
				<Match exactly pattern="/" component={Login} />
				<Match exactly pattern="/gameboard/:userName" component={App} />
			</div>
		</BrowserRouter>
		);
}

render(<Root/>, document.querySelector('#root'));