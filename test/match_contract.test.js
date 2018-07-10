const ganache = require('ganache-cli');
const assert = require('assert');
import Web3 from'web3';

//import contracts
const compiledMatchContract = require('../ethereum/build/Match.json')

let accounts;
let matchContract;

const test_team1 = 109;
const test_team2 = 209;

const web3 = new Web3(ganache.provider());



beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	matchContract = await new web3.eth.Contract(JSON.parse(compiledMatchContract.interface))
	.deploy({data:compiledMatchContract.bytecode, arguments:[test_team1, test_team2]})
	.send({from:accounts[0], gas:'1000000'})
});

describe('Match', () => {
		it('deploys a contract', () => {
			assert.ok(matchContract.options.address)
		});

		it('stores the team ids', async () => {
			const team1 = await matchContract.methods.teams(0).call();
			assert.equal(team1, test_team1);
			const team2 = await matchContract.methods.teams(1).call();
			assert.equal(team2, test_team2);
		});

		it('is accepting bets', async () => {
			//bets on winner
			await matchContract.methods.betWinner(test_team1).send({
				from: accounts[1],
				value: web3.utils.toWei('0.1', 'ether')
			});

			//test if bet on winner was succesfull
			let bets_quantity = await matchContract.methods.getBetsQuantity().call() ;
			assert.equal(bets_quantity,1);
			let balance = await web3.eth.getBalance(matchContract.options.address)
			assert.equal(balance, web3.utils.toWei('0.1', 'ether'));
			let bet = await matchContract.methods.bets(0).call();
			assert.equal(bet.team_id, test_team1);

			//bets on betTie
			await matchContract.methods.betTie().send({
				from: accounts[2],
				value: web3.utils.toWei('0.1', 'ether')
			})

			//test if bet on tie was succesfull
			bets_quantity = await matchContract.methods.getBetsQuantity().call() ;
			assert.equal(bets_quantity,2);
			balance = await web3.eth.getBalance(matchContract.options.address)
			assert.equal(balance, web3.utils.toWei('0.2', 'ether'));
			bet = await matchContract.methods.bets(1).call();
			assert.equal(bet.team_id, 0);

		});
});
