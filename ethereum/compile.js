const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

// deletes the previous build
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

//compiles the contract
const matchContractPath = path.resolve(__dirname, 'contracts', 'match.sol')
const source = fs.readFileSync(matchContractPath, 'utf8')
const output = solc.compile(source,1).contracts


//save compilied contract
fs.ensureDirSync(buildPath)
for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(':','') + '.json'),
		output[contract]
		)
}