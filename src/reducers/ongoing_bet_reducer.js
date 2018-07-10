import web3 from '../../ethereum/web3'
import { betWizardActionTypes } from '../actions/index.js'

const compiledMatchContract = require('../../ethereum/build/Match.json')

export default function(state = null, action) {

    switch(action.type) {

      case betWizardActionTypes.CLOSE_BET_WIZARD:
        return {
            UIState: action.UIState
          }

      case betWizardActionTypes.OPEN_BET_WIZARD:
        return {
          UIState: action.UIState,
          match: action.payload.match,
          tie: action.payload.tie,
          winnerIndex: action.payload.winnerIndex
        }

      case betWizardActionTypes.SHOW_SENDING_BET_MESSAGE:
        return {
          UIState: action.UIState,
          match: state.match,
          tie: state.tie,
          winnerIndex: state.winnerIndex
        }

      case betWizardActionTypes.SHOW_SUCCESS_MESSAGE:
        return {
          UIState: action.UIState,
        }
        
      default:
        return { 
          UIState: null 
        }
    }

    return {showWizzard: false}
}
