import { combineReducers } from 'redux';

import matchesReducer from './matches_reducer'
import onGoingBetReducer from './ongoing_bet_reducer'

const rootReducer = combineReducers({
	matches: matchesReducer,
	onGoingBet: onGoingBetReducer
});

export default rootReducer
