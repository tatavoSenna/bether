pragma solidity ^0.4.23;

contract Match {

    uint16[2] public teams;

    struct Bet {
        bool tie;
        uint team_id;
        address player_address;
    }

    Bet[] public bets;

    constructor(uint16 first_team_id, uint16 second_team_id) public {
        teams = [first_team_id, second_team_id];
    }

    function betWinner( uint16 team_id ) public payable {
        Bet memory newBet = Bet({
            tie: false,
            team_id: team_id,
            player_address: msg.sender
        });
        bets.push(newBet);
    }

    function betTie() public payable {
        Bet memory newBet = Bet({
            tie: true,
            team_id: 0,
            player_address: msg.sender
        });
        bets.push(newBet);
    }

    function getBetsQuantity() public view returns (uint) {
      return bets.length;
    }

}