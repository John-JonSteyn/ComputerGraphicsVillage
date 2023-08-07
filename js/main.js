import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const barnTexture = textureLoader.load('assets/barn.png');
const doorTexture = textureLoader.load('assets/door.png');
const grassTexture = textureLoader.load('assets/grass.png');
const roofTexture = textureLoader.load('assets/roof.png');
const treeTopTexture = textureLoader.load('assets/tree1.png');
const treeMiddleTexture = textureLoader.load('assets/tree2.png');
const treeBottomTexture = textureLoader.load('assets/tree3.png');
const trunkTexture = textureLoader.load('assets/trunk.png');
const waterTexture = textureLoader.load('assets/water.png');
const windowTexture = textureLoader.load('assets/window.png');

// Add the skybox
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);

// Material for the day scene (blue sky)
const daySkyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });

// Material for the night scene (black sky)
const nightSkyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });

const skybox = new THREE.Mesh(skyboxGeometry, daySkyboxMaterial);
scene.add(skybox);

// Day Scene
const sunLight = new THREE.DirectionalLight(0xfffcc1, 1);
sunLight.position.set(1, 1, 1);
scene.add(sunLight);

const sunRadius = 1;
const sunSegments = 32;
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xe3e3e3 });
const sunGeometry = new THREE.SphereGeometry(sunRadius, sunSegments, sunSegments);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(20, 20, 20);
scene.add(sun);

// Night Scene
const moonLight = new THREE.DirectionalLight(0xaaaaaa, 0.5);
moonLight.position.set(0, 1, -1);
scene.add(moonLight);

// Garden light positions
const gardenLight1Position = new THREE.Vector3(10, 1, 5);
const gardenLight2Position = new THREE.Vector3(-10, 1, -5);
const gardenLight3Position = new THREE.Vector3(0, 1, 10);

// Garden light spheres
const gardenLightSphereGeometry = new THREE.SphereGeometry(0.2, 8, 8);
const gardenLightSphereMaterial = new THREE.MeshStandardMaterial({ color: 0xfffcc1 });

const gardenLight1 = new THREE.PointLight(0xffffff, 1, 10);
gardenLight1.position.copy(gardenLight1Position);
scene.add(gardenLight1);

const gardenLight2 = new THREE.PointLight(0xffffff, 1, 10);
gardenLight2.position.copy(gardenLight2Position);
scene.add(gardenLight2);

const gardenLight3 = new THREE.PointLight(0xffffff, 1, 10);
gardenLight3.position.copy(gardenLight3Position);
scene.add(gardenLight3);

const gardenLight1Sphere = new THREE.Mesh(gardenLightSphereGeometry, gardenLightSphereMaterial);
gardenLight1Sphere.position.copy(gardenLight1Position);
scene.add(gardenLight1Sphere);

const gardenLight2Sphere = new THREE.Mesh(gardenLightSphereGeometry, gardenLightSphereMaterial);
gardenLight2Sphere.position.copy(gardenLight2Position);
scene.add(gardenLight2Sphere);

const gardenLight3Sphere = new THREE.Mesh(gardenLightSphereGeometry, gardenLightSphereMaterial);
gardenLight3Sphere.position.copy(gardenLight3Position);
scene.add(gardenLight3Sphere);

// Garden light poles
const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8); // Slightly more narrow poles
const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });

const gardenLight1Pole = new THREE.Mesh(poleGeometry, poleMaterial);
gardenLight1Pole.position.copy(gardenLight1Position);
gardenLight1Pole.position.y = 0.5; // Adjusted height to 0.5
scene.add(gardenLight1Pole);

const gardenLight2Pole = new THREE.Mesh(poleGeometry, poleMaterial);
gardenLight2Pole.position.copy(gardenLight2Position);
gardenLight2Pole.position.y = 0.5; // Adjusted height to 0.5
scene.add(gardenLight2Pole);

const gardenLight3Pole = new THREE.Mesh(poleGeometry, poleMaterial);
gardenLight3Pole.position.copy(gardenLight3Position);
gardenLight3Pole.position.y = 0.5; // Adjusted height to 0.5
scene.add(gardenLight3Pole);

// Garden light pedestals
const pedestalGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.1, 8);
const pedestalMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });

const gardenLight1Pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
gardenLight1Pedestal.position.copy(gardenLight1Position);
gardenLight1Pedestal.position.y = 0.05; // Adjusted height to 0.05
scene.add(gardenLight1Pedestal);

const gardenLight2Pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
gardenLight2Pedestal.position.copy(gardenLight2Position);
gardenLight2Pedestal.position.y = 0.05; // Adjusted height to 0.05
scene.add(gardenLight2Pedestal);

const gardenLight3Pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
gardenLight3Pedestal.position.copy(gardenLight3Position);
gardenLight3Pedestal.position.y = 0.05; // Adjusted height to 0.05
scene.add(gardenLight3Pedestal);

const moonRadius = 2;
const moonSegments = 32;
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xe3e3e3 });
const moonGeometry = new THREE.SphereGeometry(moonRadius, moonSegments, moonSegments);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, 20, -20);
scene.add(moon);

const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const stars = [];

function createStar(x, y, z) {
  // Define a threshold below which stars will not be created
  const starThreshold = 10;

  // Check if the y-coordinate is above the threshold before adding the star
  if (y > starThreshold) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(x, y, z);
    scene.add(star);
    stars.push(star);
  }
}

function createRandomStars(numStars, range) {
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * range - range / 2;
    const y = Math.random() * range - range / 2;
    const z = Math.random() * range - range / 2;
    createStar(x, y, z);
  }
}

createRandomStars(100, 50);

const dayButton = document.getElementById('day-toggle');
const nightButton = document.getElementById('night-toggle');

dayButton.addEventListener('click', () => switchScene(DAY_SCENE));
nightButton.addEventListener('click', () => switchScene(NIGHT_SCENE));

const DAY_SCENE = 'day';
const NIGHT_SCENE = 'night';
let currentScene = DAY_SCENE;

function switchScene(sceneType) {
  if (sceneType === currentScene) return;

  if (sceneType === DAY_SCENE) {
    // Switch to day scene
    gardenLight1.visible = false;
    gardenLight2.visible = false;
    gardenLight3.visible = false;
    sun.visible = true;
    moon.visible = false;
    stars.forEach(star => star.visible = false);
    sunLight.visible = true;
    skybox.material = daySkyboxMaterial;
    moonLight.intensity = 0;
    sunLight.intensity = 1;
    stars.forEach(star => star.visible = false);

    // Update button state
    dayButton.classList.add('active');
    nightButton.classList.remove('active');
    dayButton.disabled = true;
    nightButton.disabled = false;
  } else if (sceneType === NIGHT_SCENE) {
    // Switch to night scene
    gardenLight1.visible = true;
    gardenLight2.visible = true;
    gardenLight3.visible = true;
    sun.visible = false;
    moon.visible = true;
    stars.forEach(star => star.visible = true);
    sunLight.visible = false;
    skybox.material = nightSkyboxMaterial;
    moonLight.intensity = 0.5;
    sunLight.intensity = 0;
    stars.forEach(star => star.visible = true);

    // Update button state
    nightButton.classList.add('active');
    dayButton.classList.remove('active');
    nightButton.disabled = true;
    dayButton.disabled = false;
  }

  currentScene = sceneType;
}

// Keyboard callbacks
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'd') {
    // Switch to day scene
    switchScene(DAY_SCENE);
  } else if (event.key.toLowerCase() === 'n') {
    // Switch to night scene
    switchScene(NIGHT_SCENE);
  }
});

switchScene(DAY_SCENE);

const barnWidth = 3;
const barnHeight = 3;
const barnDepth = 6;
const barnColor = 0xb78248;

const barnGeometry = new THREE.BoxGeometry(barnWidth, barnHeight, barnDepth);
const barnMaterial = new THREE.MeshStandardMaterial({ map: barnTexture });
const barn = new THREE.Mesh(barnGeometry, barnMaterial);
barn.position.x = 2;
barn.position.y = 1.5;
barn.position.z = -3;
scene.add(barn);

const windowWidth = barnWidth * 0.8; // Adjust the window width as desired
const windowHeight = barnHeight / 2;
const windowColor = 0x9ea4a3;

// Window on the left side
const window1Geometry = new THREE.BoxGeometry(0.1, windowHeight, windowWidth);
const window1Material = new THREE.MeshStandardMaterial({ map: windowTexture });
const window1 = new THREE.Mesh(window1Geometry, window1Material);
window1.position.x = -barnWidth / 2 - window1Geometry.parameters.width / 2;
window1.position.y = 0; // Adjust the position of the window on the y-axis
window1.position.z = 0; // Adjust the position of the window on the z-axis
barn.add(window1);

// Window on the right side
const window2Geometry = new THREE.BoxGeometry(0.1, windowHeight, windowWidth);
const window2Material = new THREE.MeshStandardMaterial({ map: windowTexture });
const window2 = new THREE.Mesh(window2Geometry, window2Material);
window2.position.x = barnWidth / 2 + window2Geometry.parameters.width / 2;
window2.position.y = 0; // Adjust the position of the window on the y-axis
window2.position.z = 0; // Adjust the position of the window on the z-axis
barn.add(window2);

// Window on the back side
const window3Geometry = new THREE.BoxGeometry(windowWidth/2, windowHeight, 0.1);
const window3Material = new THREE.MeshStandardMaterial({ map: windowTexture });
const window3 = new THREE.Mesh(window3Geometry, window3Material);
window3.position.x = 0; // Adjust the position of the window on the x-axis
window3.position.y = 0; // Adjust the position of the window on the y-axis
window3.position.z = -barnDepth / 2 - window3Geometry.parameters.depth / 2;
barn.add(window3);

const doorWidth = 1;
const doorHeight = 2;
const doorColor = 0x5d3a19;

const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.1);
const doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.x = 0; // Adjust the position of the door on the x-axis
door.position.y = -barnHeight / 2 + doorHeight / 2;
door.position.z = barnDepth / 2 + 0.05; // Position the door on the front face of the barn
barn.add(door);

const roofColor = 0x5d3a19;
const roofHeight = 2;
const roofLength = 2;
const roofWidth = 6;

// Define the shape of the roof as a triangle
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, roofHeight);
shape.lineTo(roofLength, roofHeight);
shape.lineTo(0, 0);

// Define extrusion settings
const extrudeSettings = {
  steps: 2,
  depth: roofWidth, // Adjust the depth to match the desired height
  bevelEnabled: false
};

const roofGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture });

// Create the roof mesh
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.x = Math.PI / 4 * 0;
roof.rotation.y = Math.PI / 4 * 0;
roof.rotation.z = Math.PI / 4 * -1.05;
roof.position.y = barnHeight / 2 + roofHeight / 2 - 1;
roof.position.x = -1.5;
roof.position.z = -3;
barn.add(roof);

// Adjust texture tiling and position
roofMaterial.map.repeat.set(1, 1); // Adjust tiling
roofMaterial.map.offset.set(0, 0); // Adjust position


const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const pondRadius = 5;
const pondSegments = 32;

const pondMaterial = new THREE.MeshStandardMaterial({ map: waterTexture });

const pond1 = createPondSegment(pondRadius, pondSegments, pondMaterial, 0.01, 4, -10);
scene.add(pond1);

const pond2 = createPondSegment(pondRadius * 0.8, pondSegments, pondMaterial, 0.02, 5, -7);
pond2.rotation.z = Math.PI / 4;
scene.add(pond2);

const pond3 = createPondSegment(pondRadius * 0.6, pondSegments, pondMaterial, 0.03, 3, -14);
pond3.rotation.z = Math.PI / 6;
scene.add(pond3);

function createPondSegment(radius, segments, material, yPos, zPos, xPos) {
  const pondGeometry = new THREE.CircleGeometry(radius, segments);
  const pond = new THREE.Mesh(pondGeometry, material);
  pond.rotation.x = -Math.PI / 2;
  pond.position.x = xPos;
  pond.position.y = yPos;
  pond.position.z = zPos;
  return pond;
}

const tankGeometry = new THREE.CylinderGeometry(1, 1, 3, 16);
const tankMaterial = new THREE.MeshStandardMaterial({ color: 0x9ea4a3 });
const tank = new THREE.Mesh(tankGeometry, tankMaterial);
tank.position.x = 7;
tank.position.y = 1.48;
tank.position.z = -2;
scene.add(tank);

const openLidGeometry = new THREE.CircleGeometry(.8, 32);
const openLidMaterial = new THREE.MeshStandardMaterial({ map: waterTexture });
const openLid = new THREE.Mesh(openLidGeometry, openLidMaterial);
openLid.rotation.x = -Math.PI / 2;
openLid.position.copy(tank.position);
openLid.position.y = 3;
scene.add(openLid);

const platformGeometry = new THREE.BoxGeometry(2, 0.2, 2);
const platformMaterial = new THREE.MeshStandardMaterial({ color: 0x9ea4a3 });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.x = 7;
platform.position.y = 0.1;
platform.position.z = -2;
scene.add(platform);

const treeTrunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
const treeTopGeometries = [
  new THREE.ConeGeometry(1.5, 2, 8),
  new THREE.ConeGeometry(1.25, 1.5, 8),
  new THREE.ConeGeometry(1, 2, 8)
];
const treeMaterials = [
  new THREE.MeshStandardMaterial({ color: 0xb78248 }),
  new THREE.MeshStandardMaterial({ color: 0x2aaf75 }),
  new THREE.MeshStandardMaterial({ color: 0x45b35e }),
  new THREE.MeshStandardMaterial({ color: 0x60b748 })
];

const treePositions = [];

const numTrees = 30;
const minDistance = 11;
const maxX = 50;
const maxZ = 50;

for (let i = 0; i < numTrees; i++) {
  let x, z;
  do {
    x = Math.random() * (maxX * 2) - maxX;
    z = Math.random() * (maxZ * 2) - maxZ;
  } while (Math.sqrt(x * x + z * z) < minDistance);
  treePositions.push({ x, z });
}

treePositions.forEach(position => {
  const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeMaterials[0]);

  const treeTop = new THREE.Group();
  for (let i = 0; i < treeTopGeometries.length; i++) {
    const cone = new THREE.Mesh(treeTopGeometries[i], treeMaterials[i + 1]);
    cone.position.y = i + 1;
    treeTop.add(cone);
  }

  const tree = new THREE.Group();
  tree.add(treeTrunk);
  tree.add(treeTop);
  tree.position.set(position.x, 1, position.z);
  scene.add(tree);
});


const rotationToggleBtn = document.getElementById('camera-rotation-toggle');
const barnRotationToggleBtn = document.getElementById('barn-rotation-toggle');
const rotationDirectionBtn = document.getElementById('rotation-direction');
const speedSlider = document.getElementById('speed');
const zoomSlider = document.getElementById('zoom');
const heightSlider = document.getElementById('height');

let cameraIsRotating = false;
let barnIsRotating = false;
let rotationDirection = 1;
let rotationSpeed = 0.05;
let zoomDistance = 15;
let cameraHeight = 5;

rotationToggleBtn.addEventListener('click', toggleRotation);
barnRotationToggleBtn.addEventListener('click', toggleRotation);
rotationDirectionBtn.addEventListener('click', changeRotationDirection);
zoomSlider.addEventListener('input', updateZoomDistance);
heightSlider.addEventListener('input', updateCameraHeight);
speedSlider.addEventListener('input', updateRotationSpeed);

function toggleRotation(event) {
  const targetId = event.target.id;
  if (targetId === 'camera-rotation-toggle') {
    cameraIsRotating = !cameraIsRotating;
    rotationToggleBtn.classList.toggle('active', cameraIsRotating);
  } else if (targetId === 'barn-rotation-toggle') {
    barnIsRotating = !barnIsRotating;
    barnRotationToggleBtn.classList.toggle('active', barnIsRotating);
  }
}

function changeRotationDirection(event) {
  rotationDirection *= -1;
}

function updateZoomDistance(event) {
  const zoomValue = parseFloat(event.target.value);
  zoomDistance = mapRange(zoomValue, 0, 1, 5, 30);
}

function updateCameraHeight(event) {
  const minHeight = 1;
  const maxHeight = 10;
  const sliderValue = parseFloat(event.target.value);
  cameraHeight = mapRange(sliderValue, 0, 1, minHeight, maxHeight);
  camera.position.y = cameraHeight;
}

function updateRotationSpeed(event) {
  const speedValue = parseFloat(event.target.value);
  rotationSpeed = mapRange(speedValue, 0, 1, 0.01, 0.2);
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Default Values:
gardenLight1.visible = false;
gardenLight2.visible = false;
gardenLight3.visible = false;
moon.visible = false;
stars.forEach(star => star.visible = false);
sunLight.visible = true;
skybox.material = daySkyboxMaterial;
moonLight.intensity = 0;
sunLight.intensity = 1;
stars.forEach(star => star.visible = false);

// Update button state
dayButton.classList.add('active');
nightButton.classList.remove('active');
dayButton.disabled = true;
nightButton.disabled = false;

function animate() {
  requestAnimationFrame(animate);

  if (cameraIsRotating) {
    camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationDirection * rotationSpeed);
    camera.lookAt(scene.position);
  }

  if (barnIsRotating) {
    barn.rotation.y += rotationDirection * rotationSpeed;
  }

  const zoomVector = new THREE.Vector3(0, 0, zoomDistance);
  const zoomDirection = zoomVector.applyQuaternion(camera.quaternion);
  camera.position.copy(scene.position).add(zoomDirection);

  camera.position.setY(cameraHeight)
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

camera.position.set(0, cameraHeight, zoomDistance);
camera.lookAt(scene.position);
