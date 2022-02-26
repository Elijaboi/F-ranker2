function jam(){
if(turn%2!=0){
    if (Phaser.Input.Keyboard.JustDown(A) && player2.x <= xLimit) {  
    player2.body.x -= 50;
    turn++;
                                                             }
    else if (Phaser.Input.Keyboard.JustDown(D) && player2.x <= xLimit) {
    player2.body.x += 50;
    turn++;                                                                       
                                                                      }
    else {player2.setVelocityX(0);  }
    
    if (Phaser.Input.Keyboard.JustDown(W) && player2.y >=0) {                                                                                
    player2.body.y -= 50;
    turn++;
    }
    else  if (Phaser.Input.Keyboard.JustDown(S) && player2.y <=yLimit) {                                                                           
    player2.body.y += 50;
    turn++;
    }                                                                                                 
    else {
    player2.setVelocityY(0);                                                            
    }}




}