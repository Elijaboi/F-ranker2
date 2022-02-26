$("#topf").hide();
$("#btn-logout").hide();
var user;
Moralis.start({ serverUrl: "https://cr7ge1kve9u7.moralishost.com:2053/server", appId: "EcXFhXVLhnGqUZNx9h8IyhtbZfwZCHYKbyIIlcZ3" });
async function init() {
  user = Moralis.User.current();
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
    location.reload();
    //$("#app1").hide();
   // $("#btn-logout").hide();
   // console.log("logged out");
  }

function renderGame(){
    $("#game").show();
    $("#login_button").hide();
    $("#logo1").hide();
    $("#topf").hide();
    $("#btn-logout").show();
     /*change this when routing*/

}

async function fetchNFTMetadata(NFTs){
  $("#btn-logout").show(); 
  let promises = [];
  //console.log("NFTs[n]",NFTs[1].metadata)
  for (let i = 0; i < NFTs.length; i++) {
    let nft = NFTs[i];
    let id = nft.token_id;
  // call moralis clous fn ->static JSON file

promises.push(
  fetch("https://cr7ge1kve9u7.moralishost.com:2053/server/functions/getNFT?_ApplicationId=EcXFhXVLhnGqUZNx9h8IyhtbZfwZCHYKbyIIlcZ3&nftId=" + id)
// then(res => res.json())
//.then(res => JSON.parse(res.result))
.then(res => res.json())
//.then(res => console.log("res.json",res.result.data.metadata.chin))
//.then(res => console.log(res))
//.then(res => JSON.parse(res.result))
//.then(res => console.log(res.result.data))
.then(res =>(nft.metadata = res))
.then(()=>{return nft;}))
//console.log(nft.metadata);   
  }
  return Promise.all(promises);
  console.log("promises",promises);
}
function renderInventory(NFTs) {
  const parent = document.querySelector("#app1");

  for (const NFT of NFTs) {
      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = NFT.metadata.result.data.image;
      image.className = "card-img-top";
      image.alt = "Card image cap";

      const playBtn = document.createElement("a");
      playBtn.textContent = "NEW CHALLENGER";
      playBtn.className = "ggl2";
      playBtn.href = "#";

      playBtn.addEventListener("click", function(event) {
          Playgame(`${NFT.token_id}`, NFT.metadata.result.data, `${NFTs.length}`);
          
          $("#btn-logout").show();
          $("#app1").hide();

      });

      card.appendChild(image);
      card.appendChild(playBtn);

      const column = document.createElement("div");
      column.className = "col col-md-3.5 mb-4 mt-4";

      column.appendChild(card);

      parent.appendChild(column);
  }
}
function renderInventory2(NFTs){

  const parent = document.getElementById("app1");
  
 for (let i = 0; i < NFTs.length; i++) {
       let nft = NFTs[i];
       let htmlString = `<div class="card" >
   <img class="card-img-top" src="${nft.metadata.result.data.image}" alt="Card image cap">
      <a href="#" class="ggl2" onclick="Playgame('${nft.token_id}','${NFTs.length}')">NEW CHALLENGER</a>
  </div>`
  let col = document.createElement("div");
  col.className = "col col-md-3.5 mb-4 mt-4";
  col.innerHTML = htmlString;
  
  parent.appendChild(col);
    
  }
}

async function NFTMarket(){
  $("#game").hide();
  $("#login_button").hide();
  $("#logo1").hide(); /*change this when routing*/
  $("#topf").hide();
  
  const options = { address: "0x26Be870A5c9f45D5b2eEb247bCB19452c623D84b", chain: "rinkeby" };
  let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
//const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
 // const tokenMetadata = await Moralis.Web3API.token.getTokenIdMetadata({ address: "0x918e8776743aaa9e04ea2fb6bb50baa11ee4c28b",token_id: "1", chain: "rinkeby" })
  console.log("NFTs:",NFTs);
  ///console.log(tokenMetadata.result);
  let NFTmeta = await fetchNFTMetadata(NFTs.result);
  //console.log(NFTmeta);
  $("#NFTdisp").show(); 
  renderInventory(NFTmeta);  
}

async function NFTGame(){
  $("#game").hide();
  $("#login_button").hide();
  $("#logo1").hide(); /* change this when routing */
  const options = { address: "0x26Be870A5c9f45D5b2eEb247bCB19452c623D84b", chain: "rinkeby" };
  let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
  let NFTmeta = await fetchNFTMetadata(NFTs.result);
  console.log(NFTmeta);
  $("#NFTdisp").show(); 
  $("#topf").hide();
  renderInventory(NFTmeta);  
}

async function Playgame(nft,NFTC,NFTlength){
  $("#topf").show();
  min=0;
  r = randomExcluded(min, NFTlength, nft);
  const options = { address: "0x26Be870A5c9f45D5b2eEb247bCB19452c623D84b",token_id: r, chain: "rinkeby" };
  let NFTOmeta = await Moralis.Web3API.token.getTokenIdMetadata(options);
  const NFTO = JSON.parse(NFTOmeta.metadata); //Is this secure or can anyone see these attributes?
  console.log("got it", NFTO);
 // const options2 = { address: "0x26Be870A5c9f45D5b2eEb247bCB19452c623D84b",token_id: nft, chain: "rinkeby" };
 // let NFTCC = await Moralis.Web3API.token.getTokenIdMetadata(options2);
 // const NFTC = JSON.parse(NFTCC.metadata);
  //Randomly select opponent (not fully secure until oracle is implemented) 
 console.log("NFTC.prop",NFTC.chin);
 //coinflip start
 if (NFTO.skill>NFTC.skill)
 {
   let red=NFTO;
   let blue=NFTC;
   console.log("red=",red,"blue=",blue);
 }
else if (NFTO.skill=NFTC.skill)
  {
    c= Math.round(Math.random());
    if(c){
      let red=NFTC;
      let blue =NFTO;
  }else{
    let red=NFTO;
    let blue =NFTC;
  }
  }
else 
 {
   let red=NFTC;
   let blue =NFTO;
   console.log("red=",red,"blue=",blue);
}

}
//else randomly assign

 

function randomExcluded(min, max, excluded) {
  var n = Math.floor(Math.random() * (max-1) + min);
  if (n >= excluded) n++;
 // console.log(n);
  return n;
}


init();

document.getElementById("btn-logout").onclick = logOut;
document.getElementById("market1").onclick = NFTMarket;
document.getElementById("play").onclick = NFTGame;
//document.getElementById("ggl").onclick = Playgame;



