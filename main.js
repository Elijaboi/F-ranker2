Moralis.initialize("EcXFhXVLhnGqUZNx9h8IyhtbZfwZCHYKbyIIlcZ3"); // Application id from moralis.io
Moralis.serverURL = "https://cr7ge1kve9u7.moralishost.com:2053/server"; //Server url from moralis.io

async function init() {
  let user = Moralis.User.current();
  console.log(user);
  if (user) {
    renderGame();
  } else {
    $("#login_button").click(async () => {
      try {
        user = await Moralis.Web3.authenticate();
        renderGame();
       console.log(user);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

async function logOut() {
    await Moralis.User.logOut();
    $("#login_button").show();
    $("#logo1").show();
    $("#game").hide();
    console.log("logged out");
  }

function renderGame(){
    $("#game").show();
    $("#login_button").hide();
    $("#logo1").hide();
     /*change this when routing*/

}

async function NFTMarket(){
  $("#game").hide();
  $("#login_button").hide();
  $("#logo1").hide(); /*change this when routing*/
  const options = { address: "0x918e8776743aaa9e04ea2fb6bb50baa11ee4c28b", chain: "rinkeby" };
  let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
  renderInventory(NFTs);
  
  console.log(NFTs);
  //fetchNFTMetadata(NFTs);
  


}

function renderInventory(NFTs){
  for (let i = 0; i < NFTs.length; i++) {
    const element = NFTs[i];
    let htmlString = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${nft.metadata.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nft.metadata.name}</h5>
      <p class="card-text">${nft.metadata.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`
  let col = document.createElement("NFTdisp");
  col.className = "col col-md-3"
  col.innerHTML = htmlString;
    
  }
}

//function fetchNFTMetadata(NFTs){
  //for (let i = 0; i < NFTs.length; i++) {
    //let nft = NFTs[i];
    //let id = nft.token_id;
    //call moralis clous fn ->static JSON file

//fetch("https://cr7ge1kve9u7.moralishost.com:2053/server/functions/getNFT?_ApplicationId=EcXFhXVLhnGqUZNx9h8IyhtbZfwZCHYKbyIIlcZ3&nftId=" + id)
//.then(res =>(console.log(res)));
    
  //}
//}

init();

document.getElementById("btn-logout").onclick = logOut;
document.getElementById("market1").onclick = NFTMarket;


