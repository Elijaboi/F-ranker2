Moralis.start({ serverUrl: "https://cr7ge1kve9u7.moralishost.com:2053/server", appId: "EcXFhXVLhnGqUZNx9h8IyhtbZfwZCHYKbyIIlcZ3" });
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

async function fetchNFTMetadata(NFTs){
  $("#btn-logout").show(); 
  let promises = [];
  console.log(NFTs.length)
  for (let i = 0; i < NFTs.length; i++) {
    let nft = NFTs[i];
    let id = nft.token_id;
  // call moralis clous fn ->static JSON file

promises.push(
  fetch("https://cr7ge1kve9u7.moralishost.com:2053/server/functions/getNFT?_ApplicationId=EcXFhXVLhnGqUZNx9h8IyhtbZfwZCHYKbyIIlcZ3&nftId=" + id)
// then(res => res.json())
//.then(res => JSON.parse(res.result))
.then(res => res.json())
//.then(res => JSON.parse(res.result))
//.then(res => console.log(res.result.data))
.then(res =>(nft.metadata = res))
.then(()=>{return nft;}))
console.log(nft.metadata);   
  }
  return Promise.all(promises);
}
function renderInventory(NFTs){

  const parent =document.getElementById("app1");
  
  for (let i = 0; i < NFTs.length; i++) {
   // console.log("renderinventy");
    let nft = NFTs[i];
   // console.log(nft.metadata);
    let htmlString = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${nft.metadata.result.data.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nft.metadata.result.data.name}</h5>
      <p class="card-text">${nft.metadata.result.data.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`
  let col = document.createElement("div");
  col.className = "col col-md-3";
  col.innerHTML = htmlString;
  
  parent.appendChild(col);
    
  }
}
async function NFTMarket(){
  $("#game").hide();
  $("#login_button").hide();
  $("#logo1").hide(); /*change this when routing*/
  
  const options = { address: "0x26Be870A5c9f45D5b2eEb247bCB19452c623D84b", chain: "rinkeby" };
  let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
//const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
 // const tokenMetadata = await Moralis.Web3API.token.getTokenIdMetadata({ address: "0x918e8776743aaa9e04ea2fb6bb50baa11ee4c28b",token_id: "1", chain: "rinkeby" })
  
  console.log(NFTs);
  ///console.log(tokenMetadata.result);
  let NFTmeta = await fetchNFTMetadata(NFTs.result);
  //console.log(NFTmeta);
  $("#NFTdisp").show(); 
  renderInventory(NFTmeta);
  
  


}





init();

document.getElementById("btn-logout").onclick = logOut;
document.getElementById("market1").onclick = NFTMarket;


