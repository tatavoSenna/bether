
import Web3 from 'web3'

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  // web3 = new Web3(window.web3.currentProvider);
  web3 = new Web3(new Web3.providers.HttpProvider(
  	'HTTP://127.0.0.1:7545'
  	));
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.Provider(
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
  );
  web3 = new Web3(provider);
}

export default web3;