import { call, apply, put, takeEvery } from 'redux-saga/effects'
import web3 from '../../ethereum/web3'

import { betWizardActionTypes, betWizardUIStates } from '../actions/index.js'


const compiledMatchContract = require('../../ethereum/build/Match.json')

export function* betSaga(action) {

	yield put({
          type: betWizardActionTypes.SHOW_SENDING_BET_MESSAGE,
          UIState: betWizardUIStates.SENDING_BET,
          match: action.payload.match,
          tie: action.payload.tie,
          winnerIndex: action.payload.team_id
         })
	
	const accounts = yield call(web3.eth.getAccounts)

  const matchContract = new web3.eth.Contract(
    JSON.parse(compiledMatchContract.interface))

  const transaction = matchContract.deploy({
          data:compiledMatchContract.bytecode,
          arguments:[action.payload.match.teams[0].id,
          action.payload.match.teams[1].id]
        })

  const deployedContract = yield call(
    transaction.send,  
    {from:accounts[0], gas:'1000000'}
    )

  yield put({
          type: betWizardActionTypes.SHOW_SUCCESS_MESSAGE,
          UIState: betWizardUIStates.BET_COMPLETE,
         })

 
} 

export function* watchBetAction() {
  yield takeEvery(betWizardActionTypes.BET, betSaga)
}
