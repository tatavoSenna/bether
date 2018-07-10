import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { closeBetWizard, bet, betWizardUIStates } from '../actions/index'

class BetWizzard extends Component {

  render() {
    switch(this.props.onGoingBet.UIState) {

      case betWizardUIStates.CONFIRM_BET:
        const winnerIndex =  this.props.onGoingBet.winnerIndex
        const looserIndex = winnerIndex ? 0 : 1
        return (
          <Modal
            open={true}
            size='small'
          >
            <Modal.Content>
              <span>Please confirm your bet of <strong>0.01 Ether</strong> that</span>
              <h1>{this.props.onGoingBet.match.teams[winnerIndex].name}</h1>
              <span> 
                will win the match against {this.props.onGoingBet.match.teams[looserIndex].name}
              </span>
            </Modal.Content>
            <Modal.Actions>
              <Button secondary onClick={this.props.closeBetWizard}>
                Cancel
              </Button>
              <Button primary onClick={() => this.props.bet(
                  this.props.onGoingBet.match,
                  this.props.onGoingBet.tie,
                  this.props.onGoingBet.winnerIndex
                )}>
                Bet on {this.props.onGoingBet.match.teams[winnerIndex].name}
              </Button>
            </Modal.Actions>
          </Modal>
        )

      case betWizardUIStates.SENDING_BET:
        return (
          <Modal
            open={true}
            size='small'
          >
            <Modal.Content>
              <h2>Sending bet to smart contract</h2>
            </Modal.Content>
          </Modal>
        )

      case betWizardUIStates.BET_COMPLETE:
        return (
          <Modal
            open={true}
            size='small'
          >
            <Modal.Content>
              <h2>Bet COMPLETE</h2>
            </Modal.Content>
            <Modal.Actions>
              <Button primary onClick={
                () => this.props.closeBetWizard()}>
                OK
              </Button>
            </Modal.Actions>
          </Modal>
        )

      default:
        return null
    }  
  } 
}

function mapStateToProps(state) {
	return {
		onGoingBet: state.onGoingBet
	}
}

function mapDispatchToProps(dispatch) {
 	return bindActionCreators({closeBetWizard, bet}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BetWizzard);

