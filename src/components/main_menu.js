import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const items = [
  { key: 'my_bets', active: true, name: 'My Bets' },
  { key: 'rules', name: 'Rules' },
  { key: 'about_us', name: 'About Us' }
]

class MainMenu extends Component {

  render(){
    return <Menu items={items} floated={this.props.floated} margin='10px'/>
  }
}

export default MainMenu
