var car, obstacleGroup, peopleGroup, walking, carImg, rockImg, game_over;
var gameState = 1;
var score = 0;

function preload(){
	game_over = loadSound("die.mp3");
	rockImg = loadImage("images/rock.png");
	carImg = loadImage("images/car.png");
	walking = loadAnimation("images/walk1.jpg","images/walk2.jpg","images/walk3.jpg","images/walk4.jpg", "images/walk5.jpg", "images/walk6.jpg");
}

function setup(){
	createCanvas(600,700);
	car=createSprite(300, 600, 30, 40);
	car.addImage("car", carImg);
	car.scale = 0.1
	edges= createEdgeSprites();
	obstacleGroup=createGroup();
	peopleGroup = createGroup();
}

function draw(){
	background(250)
	car.bounceOff(edges);
	fill("black")
	textSize(20)
	textStyle(BOLD)
	text("Score: " + score, 30, 40)
	car.shapeColor= "black"

	if(keyDown("r")){
		score = 0;
		gameState = 1;
	}

	if(gameState===1){
		score= score+Math.round(World.frameRate/60);
		if(keyDown(RIGHT_ARROW)){
		car.velocityX = 6
		}
	
		if(keyDown(LEFT_ARROW)){
		car.velocityX = -6
		}

		Obstacles();
		People();

		if(score>0&&score%100===0){
			obstacleGroup.setVelocityY= obstacleGroup.setVelocityY+4
		}
}

	if(gameState===0){
		obstacleGroup.setVelocityYEach(0);
		peopleGroup.setVelocityYEach(0);
		obstacleGroup.destroyEach();
		peopleGroup.destroyEach();
		car.velocityX=0;
		car.velocityY=0;
		fill("red")
		textStyle(BOLD)
		textSize(80);
		text("Game Over", 85, 300)
		textSize(40)
		text("Press 'R' to restart", 85, 400)
	}

	if(car.collide(obstacleGroup)||car.collide (peopleGroup)){
		game_over.play();
		gameState = 0;
	}
	
	drawSprites();
}

function Obstacles(){
	if (World.frameCount % 50 === 0){
		var obstacle = createSprite(300, 0, 30, 50);
		obstacle.addImage("obstacle", rockImg)
		obstacle.scale = 0.02
		obstacle.x= random(100, 300);
		obstacle.velocityY=5;
		obstacleGroup.add(obstacle)
	} 
}

function People(){
	if(World.frameCount % 60 === 0){
		var people = createSprite(200, 0, 15, 65);
		people.addAnimation("walk", walking);
		people.scale = 0.4;
		people.x = random(181, 299);
		people.velocityY = 6;
		peopleGroup.add(people)
	}
}