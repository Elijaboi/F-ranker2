
//import './dist/rexuiplugin.min.js'
var config = {
       
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'topf',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { z: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

    
};

var game = new Phaser.Game(config); //initialise global variables
var player;
var opponent = {};
var obstacles;
var cursors;
var oppmove=0;
var state={};

//var buttonsLocked = {}

var yLimit;
var xLimit;
var context;
let turn=0;
 //user = Moralis.User.current();
//(function launch(){
  //  let user = Moralis.User.current();
    //if (!user){
      //  console.log("no user");
        //user = await Moralis.Web3.authenticate(); 
   // }
    //else
    //{
      //  console.log(user.get("ethAddress")+" "+'logged in');
      //  game = new Phaser.Game(config);
 //   }
//})()

function preload ()
{   //this.load.scenePlugin({
    //key: 'rexuiplugin',
    //url: 'rexuiplugin.min.js',
    //sceneKey: 'rexUI'
    //})
    context = this;
    this.load.image('sky', 'assets/octagon.jpg');
    this.load.image('circle', 'assets/circle.png');
    this.load.image('p2', 'assets/player2.png');
    this.load.image('grey_tile', 'assets/grey_tile.png');   
    this.load.image('nft','assets/ngannou.png');
    ping();
}

async function create ()
{   var scene=this,
    background = this.add.image(0, 0, 'sky');
 item1 = this.add.image(380, 320, 'grey_tile');
 item2 = this.add.image(310, 320, 'grey_tile');
 item3 = this.add.image(450, 320, 'grey_tile');
 item4 = this.add.image(380, 250, 'grey_tile');
 item5 = this.add.image(310, 250, 'grey_tile');
 item6 = this.add.image(450, 250, 'grey_tile');
 item8 = this.add.image(380, 390, 'grey_tile');
 item9 = this.add.image(310, 390, 'grey_tile');
 item10 = this.add.image(450, 390, 'grey_tile');
 nft = this.add.image(450, 390, 'nft').setScale(0.2).setAlpha(0);
 background.x = background.displayWidth / 2;
 background.y = background.displayHeight/1.5;
 xLimit = background.displayWidth; //the player cannot go beyond these x and
 yLimit = background.displayHeight;
    //var particles = this.add.particles('circle');
 player = this.physics.add.sprite(380, 320, 'circle');
 //player2 = this.physics.add.sprite(80, 80, 'p2') //create the player sprite
    player.setScale(0.4);
    cursors = this.input.keyboard.createCursorKeys(); 
    item1.setInteractive().on('pointerover', function() {item1.setTint(0x39FF14)});
    item1.setInteractive().on('pointerout', function() {item1.setTint()});
    W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);  
    this.input.keyboard.on('keydown-M', function (event) {
      player.angle += 45;
                                                         }); 
    this.input.keyboard.on('keydown-Q', function (event) {
      player2.angle += 45;
                                                         });
    //let query = new Moralis.Query('Playerpos');
//let subscription = await query.subscribe();
//subscription.on('create', (plocation) => {
    //if(plocation.get("player")!=user.get("ethAddress")){
    //if(opponent[plocation.get("player")]==undefined){
     //   opponent[plocation.get("player")]= this.add.image(plocation.get("x"),plocation.get("y"),'p2').setScale(0.4);
   // }
    //else
    //{
      //  opponent[plocation.get("player")].x=plocation.get("x");
        //opponent[plocation.get("player")].y=plocation.get("y");
        //opponent[plocation.get("player")].angle=plocation.get("r");
   // }
    //console.log('someone moved'+ + oppmove);


     //}});   
     let query = new Moralis.Query("GameState");
      let subscription = await query.subscribe();
      query.equalTo("stateType", "globalGameState");
      subscription.on('update', (object) => {
        state = object.get("state");
        console.log("The updated state is",state);
      });
     state = await Moralis.Cloud.run("getState");
 // console.log(Math.hypot(player.x, opponent[plocation.get("player")].y));
 //  if(Math.hypot(player.x, opponent[plocation.get("player")].y) < 100)
//{
   // console.log("proximity");
//player.add.tween(sprite.scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
//console.log(oppmove);
//}

}
async function  update ()
{ //const params =  { cursors: cursors };
    //if (turn%2==0){
        //try this one first

//if (Phaser.Input.Keyboard.JustDown(cursors.left) && player.x <= xLimit) { 
//player.body.x -= 50;
//turn++;}
if (Phaser.Input.Keyboard.JustDown(cursors.left) && player.x <= xLimit) { 
    
    //if(!buttonsLocked["left"]){
      //  console.log('A is pressed');
        //buttonsLocked["up"]=true;
        await Moralis.Cloud.run("move", {direction:"left"});
       // buttonsLocked["up"]=false;
    }
    
else if (Phaser.Input.Keyboard.JustDown(cursors.right) && player.x <= xLimit) {
  await Moralis.Cloud.run("move", {direction:"right"});
//player.body.x += 50;
turn++;                                                                       
                                                                  }
//else {player.setVelocityX(0);  }

if (Phaser.Input.Keyboard.JustDown(cursors.up) && player.y >=0) {  
  await Moralis.Cloud.run("move", {direction:"up"});                                                                              
//player.body.y -= 50;
turn++;
}
else  if (Phaser.Input.Keyboard.JustDown(cursors.down) && player.y <=yLimit) {     
  await Moralis.Cloud.run("move", {direction:"down"});                                                                      
//player.body.y += 50;
turn++;
}                                                                                                 
else {player.setVelocityY(0);                                                            }
//}
//drawState();

if (Math.hypot(player.x, player.y) < 100){
    console.log("hit");
    this.tweens.add({
        targets: image,
       // setAlpha:1,
        scaleX: 2,
        scaleY: 2,
        ease: 'Power1',
        duration: 3000
    });
}
if(Phaser.Math.Distance.Chebyshev(player.x,player.y,opponent.x,opponent.y)<100)
{//console.log(Phaser.VERSION);
    nft.setPosition(player.x,player.y);

    this.tweens.add({
        targets: nft,
        alpha:1,
        scaleX: 0.6,
        scaleY: 0.6,
        ease: 'Power1',
        duration: 3000
    });
    zone = this.add.zone(nft.x+30, nft.y+180, 20, 20).setRectangleDropZone(50, 10);
    //item1.setTint(0x39FF14);
   // player.add.tween(sprite.scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
   graphics = this.add.graphics();
   graphics.lineStyle(2, 0xffff00);
   graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
}
else {item1.setTint();}

//if(player)
//{
//player.setScale(turn++);
//}
   //**WORKING DOUBLE LOAD OF OPP AND PLAYR SAVE FOR ACTIONS**//
//if(player.lastX!=player.x || player.lastY!=player.y || player.lastr!=player.angle){
  //  let user =Moralis.User.current();
    //oppmove++;
    //if(user){
    //const Playerpos = Moralis.Object.extend("Playerpos");
    //const playerpos = new Playerpos();
    //playerpos.set("player", user.get("ethAddress"));
    //playerpos.set("x",player.x);
    //playerpos.set("y",player.y);
    //playerpos.set("r",player.angle);
    //playerpos.set("oppmove",oppmove);
    //player.lastX=player.x;
    //player.lastY=player.y;
    //player.lastr=player.angle;
    //console.log(oppmove);
    //await playerpos.save();}
    drawState();
    
//}
}
async function ping(){
    setTimeout(ping,1000)
    await Moralis.Cloud.run("ping");
  }

  function drawState(){

    console.log("This is the state",JSON.stringify(state));
    for (let userId in state) { 

      // new player that we haven't seen - need to load image, create sprite
      if(!player[userId]){

        player[userId] = {loading:true}

       // const svgBlob = new Blob([state[userId].svg], {type:"image/svg+xml;charset=utf-8"})
        //const url = URL.createObjectURL(svgBlob)

       // context.load.image('player'+userId,url).on('filecomplete', function(){
         // if(sprites[userId].loading)
          //{
            //sprites[userId].loading = false
            //setTimeout(function(){ //had to add this delay for images to always show
            opponent[userId]= context.physics.add.sprite(state[userId].x, state[userId].y,'p2').setScale(0.4);
            //  sprites[userId] =  context.physics.add.image(state[userId].x, state[userId].y, 'player'+userId).setScale(0.5,0.5).setOrigin(0,0);
            //},1000)
          //}
        }//, context);
        //context.load.start()
     // }
      // existing player - just move around existing sprite
      else{

        if(player[userId].x<state[userId].x)
          player[userId].x+=5;

        else if(player[userId].x>state[userId].x)
            player[userId].x-=5;



        if(player[userId].y<state[userId].y)
            player[userId].y+=5;

        else if(player[userId].y>state[userId].y)
            player[userId].y-=5;

      }
    }

  }

