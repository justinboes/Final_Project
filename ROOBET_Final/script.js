//declaring new variables

let balance;
let bet;
let current;
let speed;
let rocket;
let rocketIcon;
let anim;
let click = false;
let pmouse = false;
let multipliers = [0,0,0,0,0,0,0,0,0,0,0];
let difficulty;

//loading up the rocket image
function preload(){rocketIcon = loadImage("images/rocket-ship-png-7.png");}

function setup() {
canvas.position=(0,0);  
createCanvas(windowWidth, windowHeight);
background(51);

//setting the balance
updateBalance(1000);
//setting the multiplier to 1 – current is the current multiplier (white on the side of the screen) 
current = 1;
//Speed is the speed the multiplier increases at
speed = 2; 
//this creates the rocket object  
rocket = new Rocket();
imageMode(CENTER);
//sets rocket to animation 0 and off the screen
anim = 0;
//creates input box needs
let input = createInput();
//sets position of input box  
input.position(width*0.1-input.width/2,height*0.315);
input.id("input");
}

function draw() {
fill(6,6,41)
strokeWeight(4);
stroke(255);
rect(width*0.015,height*0.66,width*0.17,height*0.22)

stroke(255);
rect(width*0.015,height*0.265,width*0.17,height*0.22)

noStroke();

background(0,0,35,20);
fill(255);
var galaxy = { 
locationX : random(width),
locationY : random(height),
size : random(5,10)}
ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);

  draw_multipliers();

  //switch statement has different cases. Switch anim is a bunch of if statements. If anim=1 rocket.animation 1, etc..

  switch(anim){
case 1:
rocket.anim1();
break;
case 2:
rocket.render();
break;
case 3:
rocket.anim2();
break;}

//Calls function to set up text and buttons 
drawtext();
//sets the value to whether the mouse is clicked in previous frame  
pmouse = mouseIsPressed;}

function drawtext(){
textAlign(CENTER);
textSize(60);
fill(255);
text("Balance:",width*0.1,height*0.1 );
text("$" + balance,width*0.1,height*0.17);
textSize(15);
text("Insert Bet Below:",width*0.1,height*0.22);
fill(255,0,0);
textSize(50);
fill(255)
fill(255, 165, 0);
text("START",width*0.1,height*0.38);

//hitbox for the click
if(clicked(width*0.038,height*0.33,width*0.125,height*0.06)){on_start();}
textSize(30);
fill(255);
textAlign(LEFT);
  
//When the code starts there would NaN as a value because it has no bet included. This function checks that it is a number.
if(current*bet){
text("Potential Earnings:",width*0.01,height*0.56)
textAlign(CENTER);
fill(0,255,0);
text("$" +round((current*bet),2),width*0.1,height*0.61)} else {
text("Potential Earnings:",width*0.01,height*0.56);
textAlign(CENTER);
fill(255);
text("$0",width*0.1,height*0.61)}
textAlign(CENTER);
textSize(33);
fill(0,255,0);
text("CASH OUT",width*0.1,height*0.45);
//hitbox for the click
if(clicked(width*0.038,height*0.405,width*0.125,height*0.06)){
  on_cash();}
  
textSize(20);
fill(255,255,0);
text("DIFFICULTY:",width*0.065,height*0.79 ); 
fill(255);
text("EASY",width*0.042,height*0.83);
fill(255,255,0);
if(clicked(width*0.022,height*0.808,width*0.042,height*0.03)){
easy();}  
fill(255);
text("HARD",width*0.13,height*0.83);
if(clicked(width*0.109,height*0.808,width*0.042,height*0.03)){
hard();}
fill(255,255,0);
text("Selected Difficulty:",width*0.92,height*0.1);
fill(255);
if(difficulty==2){
text("Hard",width*0.91+width*0.1/2,height*0.14);}
else{
text("Easy",width*0.91+width*0.1/2,height*0.14);}

textSize(20); 
fill(255,0,0);
text("Reset Balance",width*0.07,height*0.74);  

textSize(25); 
fill(255);
text("Game Settings",width*0.1,height*0.695);

text("Game Controls",width*0.1,height*0.305);



if(clicked(width*0.022,height*0.718,width*0.098,height*0.03)&& anim==0 )  {
  updateBalance(1000);
}
}


function clicked(x1,y1,w1,h1){
  //if mouse x is inbetween right and left side of the box
	if(mouseX > x1 && mouseX < x1 + w1){
      //if the mouse is above the top and the bottom of the box
	if(mouseY > y1 && mouseY < y1 + h1){
      //if the mouse is not pressed and it was pressed
	if(!mouseIsPressed && pmouse){
		return true;}}}
	    else return false;}

//function updates balance rounding to two decimals
function updateBalance(a){
balance = round(a,2);}


function draw_multipliers(){
  //takes width of screen / 5
let w = width/10;
  //for loop iterates through the 5 previous multipliers.
for(let i = 0; i < 10; i++){
textSize(20);
//if the current multiplier is greater, green
if(multipliers[i] > multipliers[i+1]){
fill(100,255,100); 
//if the current multiplier is less, red
} else if(multipliers[i] < multipliers[i+1]){
fill(255,100,100);
} else {
//if its the same just white
fill(255);}
//This shows the multipliers when they are greater than 1 
if(multipliers[i] >= 1){
text(multipliers[i] +"x",width/10 * i + width/20,20);}  
}
}


//this makes the variable stored only in the function
function Rocket(){
//sets the rocket x cordinate to x/2
this.x = width/2;
//sets size of rocket
this.s = width/4;
//position of spaceship when in view
this.targety = height * 0.65;
//position of spaceship when it is outside of the canvas
this.y = height + width;
//this is velocity of rocket moving on y axis
this.yvel = 0;

//to creates the multiplier based on difficulty	
this.randomize = function(){
  if(difficulty == 2){
   if(random(1) <= 1){this.crash = 1;} 
  else {this.crash = round(1/random(),2);} 
  }
  else{
   if(random(45) <= 1){this.crash = 1;} 
  else {this.crash = round(1/random(),2);}
 }} 
  

//Displays white multiplier next to rocket
this.displayCash = function(){
textSize(64);
text(round(current,2)+"x",width/2 + this.s * 0.9, this.y);}
  
//render is on the screen when the game is running
this.render = function(){
image(rocketIcon,this.x,this.y,this.s,this.s);
speed += 0.01;
current += speed*0.0005;
fill(255);
this.displayCash();
if(current >= this.crash)
anim = 3;}
 
this.anim1 = function(){
this.y = lerp(this.y,this.targety,0.04);
image(rocketIcon,this.x,this.y,this.s,this.s);
if(abs(this.y - this.targety) <= 3)
anim = 2;    
this.randomize();}
  
  
this.anim2 = function(){
image(rocketIcon,this.x,this.y,this.s,this.s);
speed = lerp(speed,2,0.05);
this.y+=this.yvel;
this.yvel+=0.3
fill(255,100,100);
this.displayCash();


fill(255);
//when the animation is over, this resets to the begining speeds and states of the game.  
if(this.y > height + this.s * 0.5 && speed <= 2.05){
  mult();
  anim = 0;this.yvel = 0;current = 1;speed = 2;
}}
}

function easy(){
difficulty=1;
}

function hard(){
difficulty=2;
}

function on_start(){
value = input.value;
if(anim == 0 && value > 0 && value <= balance){
anim = 1;
bet = value;
updateBalance(balance - value);
speed = 2;}
}

function on_cash(){
if(anim == 2){
updateBalance(balance + bet * current);
bet = 0;
}}

function mult(){
  multipliers.unshift(round(current,2));
multipliers.pop();
  
}
