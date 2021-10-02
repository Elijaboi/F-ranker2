var NFTContract = artifacts.require("NFTContract");
module.exports = function(deployer, network, accounts) {
 deployer.deploy(NFTContract,{from: accounts[0]});
};