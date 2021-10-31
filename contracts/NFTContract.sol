pragma solidity >=0.4.22 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable{

    uint256 public constant FighterFiteCard = 0;
    uint256 public constant FighterCard = 1;
    uint256 public constant Femalefighter1 = 2;
    uint256 public constant Femalefighter2 = 3;
 


    constructor() ERC1155("https://cr7ge1kve9u7.moralishost.com/{id}.json")
    {
        _mint(msg.sender,FighterFiteCard,1,"");
        _mint(msg.sender,FighterCard,2,"");
        _mint(msg.sender,Femalefighter1,1,"");
        _mint(msg.sender,Femalefighter2,1,"");
        
      

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