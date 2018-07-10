import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import{ createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { Container, Header, Grid } from 'semantic-ui-react';

import MatchesList from './containers/matches_list';
import BetWizzard from './containers/bet_wizzard'
import MainMenu from './components/main_menu'
import reducers from './reducers'
import { watchBetAction } from './sagas/betSaga'


const API_KEY = 'ainda não sei';

const App = () => {
	return
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
	)

sagaMiddleware.run(watchBetAction)

ReactDOM.render(
	<Provider store={store}>
		<Container>
			<Container className='main-header'>
				<Header as='h1' floated='left'> Bether </Header>
				<MainMenu floated='right'/>
			</Container>
			<Container>
				<h2> Matches </h2>
				<Grid padded='horizontally'>
					<Grid.Column width={12}>
						<MatchesList/>
					</Grid.Column>
					<Grid.Column width={4}>
					</Grid.Column>
				</Grid>
			</Container>
			<BetWizzard/>
		</Container>

	</Provider>
	, document.querySelector('.container'));
