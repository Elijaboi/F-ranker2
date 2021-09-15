Moralis.initialize("L2xaZjXsySR9IHB6IND1FHaCK2cuK0wVvXA9yNdF"); // Application id from moralis.io
Moralis.serverURL = "https://xvndizkxt57v.moralisweb3.com:2053/server"; //Server url from moralis.io

async function init() {
    try {
        let user = Moralis.User.current();
        console.log(user);
        if(user=null){ 
                $("#login_button").click(async () => {user =await Moralis.Web3.authenticate();
                    console.log( "You clicked a paragraph!" );
                } )
                
            
             
        }
        renderGame();
      
    } catch (error) {
        console.log(error);
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
    $("#logo1").hide(); /*change this when routing*/

}

init();
document.getElementById("btn-logout").onclick = logOut;


