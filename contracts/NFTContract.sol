pragma solidity >=0.4.22 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable{

    uint256 public constant FighterFiteCard = 0;
    uint256 public constant FighterCard = 1;

    constructor() ERC1155("https://xvndizkxt57v.moralisweb3.com/{id}.json")
    {
        _mint(msg.sender,FighterFiteCard,1,"");
        _mint(msg.sender,FighterCard,2,"");
    }
    function mint(address account, uint256 id, uint256 amount) public onlyOwner
    {
    
        _mint (account, id, amount,"");
}
    
    function burn(address account, uint256 id, uint256 amount) public
    {   require((msg.sender == account));
        _burn(account, id, amount);
    }
}