// Set the scene size
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var container;

// Set some camera attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

// Set up the sphere vars
const RADIUS = 60;
const SEGMENTS = 16;
const RINGS = 16;

var sphere;
var cube;

function setup()
{
	createScene();
    addSphereMesh(); //añade objeto
		addCubeMesh();
    addLight(); //añade iluminacion
    requestAnimationFrame(draw); //dibujaaa
}

function createScene()
{
    // Set up all the 3D objects in the scene

	// Get the DOM element to attach to
    container = document.getElementById("#container");

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
    document.body.appendChild(renderer.domElement); //añade webGL a pagina html
}

function addSphereMesh()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var material = new THREE.MeshLambertMaterial(//LambertMaterial //PARA CAMBIAR EL TIPO DE MATERIAL!!!!!!!!!!!!!!!!!!
        {
          color: 0xCC0000
        });
    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.z = -300;

    // Finally, add the sphere to the scene
    scene.add(sphere);

}

function addCubeMesh(){
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshNormalMaterial(  ); //{ color: 0x00ff00 } rojo, verde, azul. Verde por ff
	cube = new THREE.Mesh( geometry, material ); //crea el cubo
	// Move the Sphere back in Z so we can see it
	cube.position.z = -10;
	cube.position.x = 3;

	// Finally, add the sphere to the scene
	scene.add( cube ); //añado el cubo a la escena

}

function addLight()
{
    // Create a point light
    pointLight =
			//new THREE.AmbientLight( 0x404040 );
			//new THREE.PointLight(0xFFFFFF);
			new THREE.DirectionalLight( 0xffffff, 1 ); // EL NÚMERO ES LA INTENSIDAD

    // Set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // Add to the scene
    scene.add(pointLight);
}

function draw()
{
		//PARA QUE LA ESFERA SE MUEVA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		sphere.rotation.x += 0.01;
		sphere.rotation.y += 0.01;

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;


		// Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);
}
