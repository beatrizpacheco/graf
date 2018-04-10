// GLOBAL VARIABLES

// Set the scene size
const WIDTH = 640;//window.innerWidth;
const HEIGHT = 360;//window.innerHeight;
var container;

// Set some camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

// Set up the sphere vars
const RADIUS = 5;
const SEGMENTS = 6;
const RINGS = 6;
var sphere;

// Set up the plane vars:
const FIELD_WIDTH = 400,
      FIELD_HEIGTH = 200;
const PLANE_WIDTH = FIELD_WIDTH;
      PLANE_HEIGTH = FIELD_HEIGTH;
      PLANE_QUALITY = 10;
var plane;
// Set up the cubes vars:
const PADDLE_WITH = 10,
      PADDLE_HEIGTH = 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;
var   playerPaddleDirY = 0,
      cpuPaddleDirY = 0,
      paddleSpeed = 3;
var   playerPaddle,
      cpuPaddle;
var pale1;
var pale2;
// GAME FUNCTIONS
function setup()
{
        createScene();
    // addMesh();
    addSphere();
    addPlane();
    addPale();
    addPale1();
    addLight();
    requestAnimationFrame(draw);
}

function createScene()
{
    // Set up all the 3D objects in the scene

    // Get the DOM element to attach to
    container = document.getElementById("gameCanvas"); //ATENSION CANVAS.

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
    container.appendChild(renderer.domElement); //AQUI ES DONDE LO PASAMOS AL CANVAS
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

// CREACIÓN DE OBJETOS DE LA ESCENA:

function addSphere()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);

    var material = new THREE.MeshLambertMaterial(
        {
          color: 0xFFFFFF
        });
    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.z = -300;

    // Finally, add the sphere to the scene
    scene.add(sphere);
}

function addPlane()
{
    var geometry = new THREE.PlaneGeometry( PLANE_WIDTH, PLANE_HEIGTH);
    var material = new THREE.MeshLambertMaterial(
        {
          color: 0x26A9FF
        });
    // Create a new mesh with sphere geometry
    plane = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    plane.position.z = -300;

    // Finally, add the sphere to the scene
    scene.add(plane);
}

function addPale()
{
    var geometry = new THREE.BoxGeometry( PADDLE_WITH, PADDLE_HEIGTH, PADDLE_DEPTH );
    var material = new THREE.MeshLambertMaterial(
        {
          color: 0xA6FF26
        });
    // Create a new mesh with sphere geometry
    pale1 = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    pale1.position.z = -300;
    pale1.position.x = -150;

    // Finally, add the sphere to the scene
    scene.add(pale1);
}
function addPale1()
{
    var geometry = new THREE.BoxGeometry( PADDLE_WITH, PADDLE_HEIGTH, PADDLE_DEPTH );
    var material = new THREE.MeshLambertMaterial(
        {
          color: 0xC126FF
        });
    // Create a new mesh with sphere geometry
    pale2 = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    pale2.position.z = -300;
    pale2.position.x = 150;

    // Finally, add the sphere to the scene
    scene.add(pale2);
}
