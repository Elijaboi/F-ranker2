var NFTContract = artifacts.require("NFTContract1");
module.exports = function(deployer, network, accounts) {
 deployer.deploy(NFTContract1,{from: accounts[0]});
};