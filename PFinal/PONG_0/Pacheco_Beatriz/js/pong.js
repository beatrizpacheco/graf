// --
// Práctica final PONG - Beatriz Pacheco Piñero
// --
// Implementadas todas las funcionalidades básicas
// --
// Implementados todos los extras propuestos: columnas, shadows, iluminacion pelota, texturas
// --
// Otros extras: selector de dificultal al inicio de juego (controla que metas numero correcto)
//               sonidos de fondo, cuando gana y cuando pierde
// --


// GLOBAL VARIABLES
const WIDTH = 640,
      HEIGHT = 360;

var gameCanvas;

// Set some camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight, spotLight;

// Set up the sphere vars
const RADIUS = 5,
      SEGMENTS = 6,
      RINGS = 6;

var sphere;
var plane;
var playerPaddle;
var cpuPaddle;

//Plane
const FIELD_WIDTH = 400,
      FIELD_HEIGTH = 200;
const PLANE_WIDTH = FIELD_WIDTH,
      PLANE_HEIGTH = FIELD_HEIGTH,
      PLANE_QUALITY = 10;

//Paddle
const PADDLE_WIDTH = 10,
      PADDLE_HEIGTH = 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;

var playerPaddleDirY = 1,
    cpuPaddleDirY = 1,
    paddleSpeed = 3;

//mvto pelota
var ballDirX = 1,
    ballDirY = 1,
    ballSpeed = 2,
    constballSpeed = 2;

//puntuaciones
var score1 = 0,
    score2 = 0,
    maxScore = 3;//3

// set opponent reaction rate (0 - easiest, 1 - hardest)
var difficulty = 0;

//columnas
const COLUMN_WIDTH =  20,
      COLUMN_HEIGHT =  20,
      COLUMN_DEPTH = 120;

//sonidos de fondo, ganar o perder
var soundWin = new Sound ("sonidos/aplauso.mp3");;
var soundLose = new Sound("sonidos/abucheo.mp3");;
var soundf = new Sound("sonidos/fondo.mp3");;

// GAME FUNCTIONS

function setup()
{
	createScene();
    addPlaneMesh(); //campo de juego
    addFloorMesh(); //suelo
    addSphereMesh(); //balon
    addCubeMeshPlayer(); //pala jugador
    addCubeMeshCPU(); //pala cpu
    addColumMesh(); //columnas
    addLight(); //iluminacion (puntual y spot)
    soundf.play(); //música de fondo
    soundf.loop = true; //es corta, para que se repita
    requestAnimationFrame(draw); //dibujaaa
}

function Sound(src) {
    this.Sound = document.createElement("audio");
    this.Sound.src = src;
    this.Sound.setAttribute("preload", "auto");
    this.Sound.setAttribute("controls", "none");
    this.Sound.style.display = "none";
    document.body.appendChild(this.Sound);
    this.play = function(){
        this.Sound.play();
    }
    this.stop = function(){
        this.Sound.pause();
    }
}


function createScene()
{
    // Set up all the 3D objects in the scene

	  // Get the DOM element to attach to
    gameCanvas = document.getElementById('gameCanvas');

    // Create a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    gameCanvas.appendChild(renderer.domElement); //añade webGL a pagina html

    document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
    document.getElementById("scores").innerHTML = score1 + " - " + score2;

    //Selector de dificultad
    chooseDif(); //elegir dificultad de la cpu
}

function addPlaneMesh()
{
    var geometry = new THREE.PlaneGeometry(
        PLANE_WIDTH,
        PLANE_HEIGTH );

    var textura = new THREE.TextureLoader().load('texturas/pista.jpg');
    var material = new THREE.MeshLambertMaterial({map:textura});

    // Create a new mesh with sphere geometry
    plane = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    plane.position.z = -302;

    // Finally, add the sphere to the scene and shadows
    scene.add(plane);
    plane.receiveShadow = true;
    plane.castShadow = true;

}

function addFloorMesh()
{
    var geometry = new THREE.PlaneGeometry(
        PLANE_WIDTH +50,
        PLANE_HEIGTH +260);
    var textura = new THREE.TextureLoader().load('texturas/cesped.jpg');
    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    textura.repeat.set (5,5);
    var material = new THREE.MeshLambertMaterial({map:textura});

    // Create a new mesh with sphere geometry
    floor = new THREE.Mesh(geometry, material);

    floor.position.z = -305;

    // Finally, add the sphere to the scene and shadows
    scene.add(floor);
    floor.receiveShadow = true;
    floor.castShadow = true;

}

function addSphereMesh()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var textura = new THREE.TextureLoader().load('texturas/pelota.jpg');
    var material = new THREE.MeshLambertMaterial({map:textura});

    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.z = -296;

    // Finally, add the sphere to the scene and shadows
    scene.add(sphere);
    sphere.receiveShadow = true;
    sphere.castShadow = true;

}

function addCubeMeshPlayer(){
	var geometry = new THREE.BoxGeometry(
      PADDLE_WIDTH,
      PADDLE_HEIGTH ,
      PADDLE_DEPTH);
	var material = new THREE.MeshLambertMaterial(
    {
      color: '#0000FF'
    });
	playerPaddle = new THREE.Mesh( geometry, material ); //crea el cubo

  // Move the Sphere back in Z so we can see it
	playerPaddle.position.z = -296;
	playerPaddle.position.x = -190;

  // Finally, add the sphere to the scene and shadows
	scene.add( playerPaddle );
  playerPaddle.receiveShadow = true;
  playerPaddle.castShadow = true;

  //POSICION DE LA CAMARA RESPECTO DE LA PALA DEL JUGADOR
  camera.position.x = playerPaddle.position.x - 250;//200
  camera.position.z = playerPaddle.position.z + 100;//
  camera.rotation.y = -Math.PI/2;
  camera.rotation.z = -Math.PI/2;
  camera.rotation.x = 0;
}

function addCubeMeshCPU(){
	var geometry = new THREE.BoxGeometry(
      PADDLE_WIDTH,
      PADDLE_HEIGTH ,
      PADDLE_DEPTH);
	var material = new THREE.MeshLambertMaterial(
    {
      color: '#FFFF00'
    });
	cpuPaddle = new THREE.Mesh( geometry, material ); //crea el cubo

  // Move the Sphere back in Z so we can see it
	cpuPaddle.position.z = -296;
	cpuPaddle.position.x = 190;

  // Finally, add the sphere to the scene and shadows
	scene.add( cpuPaddle );
  cpuPaddle.receiveShadow = true;
  cpuPaddle.castShadow = true;

}

function addColumMesh(){
  var geometry = new THREE.BoxGeometry(COLUMN_WIDTH, COLUMN_HEIGHT, COLUMN_DEPTH);
  var textura = new THREE.TextureLoader().load('texturas/ladrillo.jpg');
  textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
  textura.repeat.set (5,5);
  var material = new THREE.MeshLambertMaterial({map:textura});

  columRight1 = new THREE.Mesh(geometry, material);
  columRight2 = new THREE.Mesh(geometry, material);
  columRight3 = new THREE.Mesh(geometry, material);
  columLeft1 = new THREE.Mesh(geometry, material);
  columLeft2 = new THREE.Mesh(geometry, material);
  columLeft3 = new THREE.Mesh(geometry, material);
  columnas = [columRight1, columRight2, columRight3, columLeft1, columLeft2, columLeft3];

  for (col in columnas){
    scene.add( columnas[col] );
    columnas[col].castShadow = true;
    columnas[col].recieveShadow = true;
  }

  columRight1.position.z = -300;
  columRight1.position.y = -120;
  columRight1.position.x = -120;

  columRight2.position.z = -300;
  columRight2.position.y = -120;
  columRight2.position.x = 0;

  columRight3.position.z = -300;
  columRight3.position.y = -120;
  columRight3.position.x = 120;

  columLeft1.position.z = -300;
  columLeft1.position.y = 120;
  columLeft1.position.x = 120;

  columLeft2.position.z = -300;
  columLeft2.position.y = 120;
  columLeft2.position.x = 0;

  columLeft3.position.z = -300;
  columLeft3.position.y = 120;
  columLeft3.position.x = -120;

}

function addLight()
{
    // Create a point light
    pointLight =
			new THREE.PointLight(0xf0f0f0);

    // Set its position
    pointLight.position.x = 10;
    pointLight.position.y = 25;
    pointLight.position.z = 130;

    // Add to the scene
    scene.add(pointLight);

    // Create a spot light
    spotLight =
			new THREE.SpotLight(0xF8D898);

    // Set its position and attributes
    spotLight.position.set(0, 0, 200);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;

    // Add to the scene
    scene.add(spotLight);

    //Create a WebGLRenderer and turn on shadows in the renderer
    renderer.shadowMap.enabled = true;
}

function reiniciar(message){

  if(window.confirm(message) == true){
    score1 = 0;//reiniciar marcadores y velocidad pelota
    score2 = 0;
    document.getElementById("scores").innerHTML = score1 + " - " + score2;
    ballSpeed = 2;
    chooseDif();
    soundf.play();//reiniciar musica fondo
    soundf.loop = true;
  }else{
    sphere.position.x = 0;
    sphere.position.y = 0;
    ballDirX = 0;
    ballDirY = 0;
  }

}

function movSphere(){
  //MOVER EL BALON
  sphere.position.x += ballDirX * ballSpeed;
  sphere.rotation.x += Math.sin(0.5);
  sphere.rotation.y += Math.cos(0.5);
    //CHOCAR PALA
    if ((sphere.position.x <= playerPaddle.position.x  + PADDLE_WIDTH/2 && (sphere.position.y <= playerPaddle.position.y +  PADDLE_HEIGTH/2 && sphere.position.y >= playerPaddle.position.y -  PADDLE_HEIGTH/2))||
        (sphere.position.x >= cpuPaddle.position.x - PADDLE_WIDTH/2 && (sphere.position.y <= cpuPaddle.position.y +  PADDLE_HEIGTH/2 && sphere.position.y >= cpuPaddle.position.y -  PADDLE_HEIGTH/2))){
      ballDirX = -ballDirX;
      ballSpeed += 0.5; //AUMENTAR VELOCIDAD AL CHOCAR CON LA PALA
      if (ballSpeed >= constballSpeed*2){
        ballSpeed = constballSpeed*2
      }
    }
  sphere.position.y += ballDirY * ballSpeed;
  if (sphere.position.y >= PLANE_HEIGTH/2 || sphere.position.y <= -PLANE_HEIGTH/2){
    ballDirY = -ballDirY;
    ballSpeed += 0.2; //AUMENTAR VELOCIDAD PELOTA AL CHOCAR PAREDES ARRIBA Y ABAJO
    if (ballSpeed >= constballSpeed*2){
      ballSpeed = constballSpeed*2
    }
  }
}

function movLightSpot(){
  //SEGUIR LA BOLA CON LA LUZ
  spotLight.position.x = -sphere.position.x;
  spotLight.position.y = -sphere.position.y;
}

function movCPU(){
  //MOVER PALA CPU
  cpuPaddleDirY = (sphere.position.y - cpuPaddle.position.y)*difficulty;

  // control de la velocidad
  if (Math.abs(cpuPaddleDirY) <= paddleSpeed){
      cpuPaddle.position.y += cpuPaddleDirY;
  }else{
  	if (cpuPaddleDirY > paddleSpeed){
  		cpuPaddle.position.y += paddleSpeed;
  	}else if (cpuPaddleDirY < -paddleSpeed){
  		cpuPaddle.position.y -= paddleSpeed;
  	}
  }
}

function movPlayer(){
    //MOVER LA PALA JUGADOR
    if (Key.isDown(Key.A)){
      if (playerPaddle.position.y <= (PLANE_HEIGTH/2 - PADDLE_HEIGTH/2)){
        playerPaddle.position.y += playerPaddleDirY * paddleSpeed;
      }
    }
    if (Key.isDown(Key.D)){
      if (playerPaddle.position.y >= (-PLANE_HEIGTH/2 + PADDLE_HEIGTH/2)){
        playerPaddle.position.y += -playerPaddleDirY * paddleSpeed;
      }
    }
}

function goal(){
  //METER GOL
  if (sphere.position.x >= PLANE_WIDTH/2){
    sphere.position.x = 0;
    ballDirX = -ballDirX;
    score1 += 1;
    document.getElementById("scores").innerHTML = score1 + " - " + score2;
    ballSpeed = 2;//PARA VOLVER A PONER LA VELOCIDAD INICIAL
    if (score1 == maxScore){
      soundf.stop();
      soundWin.play();
      reiniciar("GANASTE.. ¿Quieres volver a jugar?");

    }
  }
  if (sphere.position.x <= -PLANE_WIDTH/2){
    sphere.position.x = 0;
    ballDirX = -ballDirX;
    score2 += 1;
    document.getElementById("scores").innerHTML = score1 + " - " + score2;
    ballSpeed = 2;//PARA VOLVER A PONER LA VELOCIDAD INICIAL
    if (score2 == maxScore){
      soundf.stop();
      soundLose.play();
      reiniciar("PERDISTE.. ¿Quieres volver a jugar?");

    }
  }
}

function chooseDif(){
  difficulty = prompt("Choose the dificult of game", "(0 - easiest, 10 - hardest)");
  while (isNaN(parseInt(difficulty))){
      alert("No has elegido un número correcto");
      difficulty = prompt("Choose the dificult of game", "(0 - easiest, 10 - hardest)");
  };
  difficulty = 0.1*difficulty;
}

function draw(){

    movSphere(); //mover el balon
    movLightSpot(); //luz spot que sigue al balon
    movCPU(); //pala cpu
    movPlayer(); //pala player
    goal(); //gol??

    // Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);
}
