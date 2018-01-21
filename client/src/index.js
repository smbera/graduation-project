import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Index from './containers/Index'
import reducers from './reducers/index'
import 'antd/dist/antd.css'
import "./style/index.css"

const store = createStore(
	reducers,
	applyMiddleware(thunk)
)

ReactDOM.render(
  	<Provider store={store}>
		<Index />
  	</Provider>,
 	document.getElementById('root')
);
