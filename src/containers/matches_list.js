import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, Grid, Header } from 'semantic-ui-react'

import { openBetWizard } from '../actions/index.js'



class MatchesList extends Component {

	renderList() {
		return this.props.matches.map((match) => {
			return (
          <Grid.Row key={match.id} className='match'>
              <Grid.Column
					onClick = {() => this.props.openBetWizard(match, false, 0)}
					className='match-bet'
					textAlign='right'
					width={7}>
    			<Header as='h4' className='match-bet-button'>{match.teams[0].name}</Header>
              </Grid.Column>
              <Grid.Column className='match-bet' textAlign='center' width={2}>
    					     <Header as='h4' className='match-bet-button'>X</Header>
              </Grid.Column >
              <Grid.Column className='match-bet' textAlign='left' width={7}>
                   <Header  as='h4' className='match-bet-button'>{match.teams[1].name}</Header>
              </Grid.Column>
          </Grid.Row>
        )
			})
	}

	render() {
		return <Grid className='matches-list' padded='horizontally'>
			{this.renderList()}
		</Grid>;
	}
}

function mapStateToProps(state) {
	return {
		matches: state.matches
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({openBetWizard}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);
