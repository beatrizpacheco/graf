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
var renderer, scene, camera, pointLight;

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
    paddleSpeed = 3,
    constpaddleSpeed = 3;

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
var difficulty = 0.2;

//columnas
const COLUMN_WIDTH =  40,
      COLUMN_HEIGHT =  20,
      COLUMN_DEPTH = 30;

// GAME FUNCTIONS

function setup()
{
	createScene();
    addPlaneMesh();
    addFloorMesh();
    addSphereMesh(); //añade objeto
    addCubeMeshPlayer();
    addCubeMeshCPU();
    addColumMeshRight();
    addLight(); //añade iluminacion
    requestAnimationFrame(draw); //dibujaaa
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
    //CAMARA.POSITION Y CAMARA.ROTATION
    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    gameCanvas.appendChild(renderer.domElement); //añade webGL a pagina html

    document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
    document.getElementById("scores").innerHTML = score1 + " - " + score2;
}

function addPlaneMesh()
{
    var geometry = new THREE.PlaneGeometry(
        PLANE_WIDTH,
        PLANE_HEIGTH );
    var material = new THREE.MeshLambertMaterial(
      {
        color: '#F8F8FF'
      });
    // Create a new mesh with sphere geometry
    plane = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    plane.position.z = -302;

    // Finally, add the sphere to the scene
    scene.add(plane);

}

function addFloorMesh()
{
    var geometry = new THREE.PlaneGeometry(
        PLANE_WIDTH +50,
        PLANE_HEIGTH +60);
    var material = new THREE.MeshLambertMaterial(
      {
        color: '#FF0000'
      });
    // Create a new mesh with sphere geometry
    floor = new THREE.Mesh(geometry, material);

    floor.position.z = -305;

    // Finally, add the sphere to the scene
    scene.add(floor);

}

function addSphereMesh()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var material = new THREE.MeshLambertMaterial(
      {
        color: '#00FF00'
      });
    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.z = -296;

    // Finally, add the sphere to the scene
    scene.add(sphere);

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
	playerPaddle.position.z = -300;
	playerPaddle.position.x = -190;

  // Finally, add the sphere to the scene
	scene.add( playerPaddle ); //añado el cubo a la escena

}

function addCubeMeshCPU(){
	var geometry = new THREE.BoxGeometry(
      PADDLE_WIDTH,
      PADDLE_HEIGTH ,
      PADDLE_DEPTH);
	var material = new THREE.MeshLambertMaterial(
    {
      color: '#FF0000'
    });
	cpuPaddle = new THREE.Mesh( geometry, material ); //crea el cubo

  // Move the Sphere back in Z so we can see it
	cpuPaddle.position.z = -300;
	cpuPaddle.position.x = 190;

  // Finally, add the sphere to the scene
	scene.add( cpuPaddle ); //añado el cubo a la escena

}

function addColumMeshRight(){
  var geometry = new THREE.BoxGeometry(COLUMN_WIDTH, COLUMN_HEIGHT, COLUMN_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#87CEEB'
      });
  columRight1 = new THREE.Mesh( geometry, material );
  scene.add( columRight1 );
  columRight1.position.z = -300;
  columRight1.position.y = -120;
  columRight1.position.x = -120;

  columRight2 = new THREE.Mesh( geometry, material );
  scene.add( columRight2 );
  columRight2.position.z = -300;
  columRight2.position.y = -120;
  columRight2.position.x = 0;

  columRight3 = new THREE.Mesh( geometry, material );
  scene.add( columRight3 );
  columRight3.position.z = -300;
  columRight3.position.y = -120;
  columRight3.position.x = 120;

  columLEFT1 = new THREE.Mesh( geometry, material );
  scene.add( columLEFT1 );
  columLEFT1.position.z = -300;
  columLEFT1.position.y = 120;
  columLEFT1.position.x = 120;

  columLEFT2 = new THREE.Mesh( geometry, material );
  scene.add( columLEFT2 );
  columLEFT2.position.z = -300;
  columLEFT2.position.y = 120;
  columLEFT2.position.x = 0;

  columLEFT3 = new THREE.Mesh( geometry, material );
  scene.add( columLEFT3 );
  columLEFT3.position.z = -300;
  columLEFT3.position.y = 120;
  columLEFT3.position.x = -120;
}

function addLight()
{
    // Create a point light
    pointLight =
			new THREE.DirectionalLight(0xffffff);

    // Set its position
    pointLight.position.x = 10;
    pointLight.position.y = 25;
    pointLight.position.z = 130;

    // Add to the scene
    scene.add(pointLight);


    //Create a WebGLRenderer and turn on shadows in the renderer
    // var renderer = new THREE.WebGLRenderer();
    // renderer.shadowMap.enabled = true;
}

function reiniciar(message){

  if(window.confirm(message) == true){
    score1 = 0;
    score2 = 0;
    document.getElementById("scores").innerHTML = score1 + " - " + score2;
    ballSpeed = 2;
  }else{
    sphere.position.x = 0;
    sphere.position.y = 0;
    ballDirX = 0;
    ballDirY = 0;
  }

}

function draw()
{
    //PERPECTIVA CÁMARA
    camera.position.x = playerPaddle.position.x - 250;//200
    camera.position.z = playerPaddle.position.z + 100;//
    camera.rotation.y = -Math.PI/2;
    camera.rotation.z = -Math.PI/2;
    camera.rotation.x = 0;

    //MOVER EL BALON
    sphere.position.x += ballDirX * ballSpeed;
      //CHOCAR PALA
      if ((sphere.position.x <= playerPaddle.position.x  && (sphere.position.y <= playerPaddle.position.y +  PADDLE_HEIGTH/2 && sphere.position.y >= playerPaddle.position.y -  PADDLE_HEIGTH/2))||
          (sphere.position.x >= cpuPaddle.position.x  && (sphere.position.y <= cpuPaddle.position.y +  PADDLE_HEIGTH/2 && sphere.position.y >= cpuPaddle.position.y -  PADDLE_HEIGTH/2))){
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

    //MOVER PALA CPU
    cpuPaddleDirY = (sphere.position.y - cpuPaddle.position.y)*difficulty;
    cpuPaddle.position.y += cpuPaddleDirY * paddleSpeed;
    //Falta controlar la velocidad de su pala



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

    //METER GOL
    if (sphere.position.x >= PLANE_WIDTH/2){
      sphere.position.x = 0;
      ballDirX = -ballDirX;
      score1 += 1;
      document.getElementById("scores").innerHTML = score1 + " - " + score2;
      ballSpeed = 2;//PARA VOLVER A PONER LA VELOCIDAD INICIAL
      if (score1 == maxScore){
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
        reiniciar("PERDISTE.. ¿Quieres volver a jugar?");
      }
    }

    // Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);
}
