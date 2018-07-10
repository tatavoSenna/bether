export const betWizardActionTypes = {
		OPEN_BET_WIZARD: 'OPEN_BET_WIZARD',
		CLOSE_BET_WIZARD: 'CLOSE_BET_WIZARD',
		BET: 'BET',
		SHOW_SENDING_BET_MESSAGE: 'SHOW_SENDING_MESSAGE',
		SHOW_SUCCESS_MESSAGE: 'SHOW_SUCCESS_MESSAGE'
	}
Object.freeze(betWizardActionTypes)


export const betWizardUIStates = {
	MODAL_CLOSED: 'CLOSED',
	CONFIRM_BET: 'CONFIRM_BET',
	SENDING_BET: 'SENDING_BET',
	BET_COMPLETE: 'BET_COMPLETE',
	BET_ERROR: 'BET_ERROR'
}
Object.freeze(betWizardUIStates)

export function openBetWizard(match, tie, winnerIndex) {
    return {
      	type: betWizardActionTypes.OPEN_BET_WIZARD,
	    UIState: betWizardUIStates.CONFIRM_BET,
	    payload: {match, tie, winnerIndex}
    };
}

export function closeBetWizard() {
    return {
      	type: betWizardUIStates.MODAL_CLOSED,
    };
}

export function bet(match, tie, winnerIndex) {
    return {
    	type: betWizardActionTypes.BET,
		UIState: betWizardUIStates.SENDING_BET,
	   payload: {match, tie, winnerIndex}
    };
}