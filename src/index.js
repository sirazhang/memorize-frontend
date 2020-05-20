import React from "react";
import ReactDOM from "react-dom";

import App from './App';

import {Provider} from 'react-redux';
import cfgStore from './store/configureStore';

const store = cfgStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	rootElement
);
