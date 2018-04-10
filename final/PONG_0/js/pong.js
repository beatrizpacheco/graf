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
var cube1;
var cube2;

//Plane
const FIELD_WIDTH = 400,
      FIELD_HEIGTH = 200;
const PLANE_WIDTH = FIELD_WIDTH,
      PLANE_HEIGTH = FIELD_HEIGTH,
      PLANE_QUALITY = 10;

//palas
const PADDLE_WIDTH = 10,
      PADDLE_HEIGTH = 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;

var playerPaddleDirY = 0,
    cpuPaddleDirY = 0,
    paddleSpeed = 3;

var playerPaddle,
    cpuPaddle;

// GAME FUNCTIONS

function setup()
{
	createScene();
    addCubeMesh1();
    addSphereMesh(); //añade objeto
    addPlaneMesh();

    addCubeMesh2();
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

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    gameCanvas.appendChild(renderer.domElement); //añade webGL a pagina html
}

function addPlaneMesh()
{
    var geometry = new THREE.PlaneGeometry(
        PLANE_WIDTH,
        PLANE_HEIGTH );
    var material = new THREE.MeshLambertMaterial(
      {
        color: '#FFF8DC'
      });
    // Create a new mesh with sphere geometry
    plane = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    plane.position.z = -300;

    // Finally, add the sphere to the scene
    scene.add(plane);

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
    sphere.position.z = -200;

    // Finally, add the sphere to the scene
    scene.add(sphere);

}

function addCubeMesh1(){
	var geometry = new THREE.BoxGeometry( PADDLE_WIDTH, PADDLE_HEIGTH , PADDLE_DEPTH);
	var material = new THREE.MeshLambertMaterial(
    {
      color: '#2E9AFE'
    }); //{ color: 0x00ff00 } rojo, verde, azul. Verde por ff
	cube1 = new THREE.Mesh( geometry, material ); //crea el cubo
	// Move the Sphere back in Z so we can see it
	cube1.position.z = -100;
	cube1.position.x = 30;
  console.log("paso por aqui 1");
	// Finally, add the sphere to the scene
	scene.add( cube1 ); //añado el cubo a la escena

}

function addCubeMesh2(){
	var geometry = new THREE.BoxGeometry( PADDLE_WIDTH, PADDLE_HEIGTH , PADDLE_DEPTH);
	var material = new THREE.MeshLambertMaterial(
    {
      color: '#FF0000'
    }); //{ color: 0x00ff00 } rojo, verde, azul. Verde por ff
	cube2 = new THREE.Mesh( geometry, material ); //crea el cubo
	// Move the Sphere back in Z so we can see it
	cube2.position.z = -100;
	cube2.position.x = -30;
  console.log("paso por aqui 2");
	// Finally, add the sphere to the scene
	scene.add( cube2 ); //añado el cubo a la escena

}

function addLight()
{
    // Create a point light
    pointLight =
			new THREE.PointLight(0xffffff);

    // Set its position
    pointLight.position.x = 10;
    pointLight.position.y = 25;
    pointLight.position.z = 130;

    // Add to the scene
    scene.add(pointLight);
}

function draw()
{

		// Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);
}
