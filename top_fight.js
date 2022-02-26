
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

var yLimit;
var xLimit;

let turn=0;
 user = Moralis.User.current();
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
    this.load.image('sky', 'assets/octagon.jpg');
    this.load.image('circle', 'assets/circle.png');
    this.load.image('p2', 'assets/player2.png');
    this.load.image('grey_tile', 'assets/grey_tile.png');   
    this.load.image('nft','assets/ngannou.png');
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
    let query = new Moralis.Query('Playerpos');
let subscription = await query.subscribe();
subscription.on('create', (plocation) => {
if(plocation.get("player")!=user.get("ethAddress")){
    if(opponent[plocation.get("player")]==undefined){
        opponent[plocation.get("player")]= this.add.image(plocation.get("x"),plocation.get("y"),'p2').setScale(0.4);
    }
    else
    {
        opponent[plocation.get("player")].x=plocation.get("x");
        opponent[plocation.get("player")].y=plocation.get("y");
        opponent[plocation.get("player")].angle=plocation.get("r");
    }
    console.log('someone moved');


     }});   
  
   if(Math.hypot(player.x, opponent.y) < 100)
{
    console.log("proximity");
player.add.tween(sprite.scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
}

}
async function  update ()
{
    //if (turn%2==0){
if (Phaser.Input.Keyboard.JustDown(cursors.left) && player.x <= xLimit) { 
player.body.x -= 50;
turn++;

                                                         }
else if (Phaser.Input.Keyboard.JustDown(cursors.right) && player.x <= xLimit) {
player.body.x += 50;
turn++;                                                                       
                                                                  }
//else {player.setVelocityX(0);  }

if (Phaser.Input.Keyboard.JustDown(cursors.up) && player.y >=0) {                                                                                
player.body.y -= 50;
turn++;
}
else  if (Phaser.Input.Keyboard.JustDown(cursors.down) && player.y <=yLimit) {                                                                           
player.body.y += 50;
turn++;
}                                                                                                 
else {player.setVelocityY(0);                                                            }
//}


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
   
if(player.lastX!=player.x || player.lastY!=player.y || player.lastr!=player.angle){
    let user =Moralis.User.current();
    const Playerpos = Moralis.Object.extend("Playerpos");
    const playerpos = new Playerpos();
    playerpos.set("player", user.get("ethAddress"));
    playerpos.set("x",player.x);
    playerpos.set("y",player.y);
    playerpos.set("r",player.angle);
    player.lastX=player.x;
    player.lastY=player.y;
    player.lastr=player.angle;
    await playerpos.save();
    
}




}

