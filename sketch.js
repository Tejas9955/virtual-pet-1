var dog_image, happyDog_image, database, foodS, foodStock;
var dog;

function preload()
{
  dog_image = loadImage("images/dogImg.png");
  happyDog_image = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);



  dog = createSprite(250,250,10,10);
  dog.addImage(dog_image);
  dog.scale=0.2;

 
  
}


function draw() {  
  background(46, 139, 87)
  if(foodS !== undefined){
    textSize(20);
    fill(255);
    text("NOTE: press UP_ARROW to feed DRAGO milk",50,50);
    text("food remaining: "+foodS,150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog_image);
    }
    if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dog_image);
    }
  }

  if(foodS === 0){
    foodS = 20;
  }
 

  

  drawSprites();
  //add styles 
  dog.display();


}


function writeStock(x){

  if(c<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function readStock (data){
  foodS=data.val();
}
