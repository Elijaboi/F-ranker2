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
    $("#logo1").hide(); /*change this when routing*/

}

init();

document.getElementById("btn-logout").onclick = logOut;


