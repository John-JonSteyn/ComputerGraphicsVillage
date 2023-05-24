import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const barnWidth = 3;
const barnHeight = 6;
const barnDepth = 3;
const barnColor = 0x823025;

const barnGeometry = new THREE.BoxGeometry(barnWidth, barnHeight, barnDepth);
const barnMaterial = new THREE.MeshBasicMaterial({ color: barnColor });
const barn = new THREE.Mesh(barnGeometry, barnMaterial);
scene.add(barn);

const roofColor = 0x953225;
const roofHeight = 2.2;
const roofGeometry = new THREE.CylinderGeometry(0, barnWidth / 1.5, roofHeight, 4);
const roofMaterial = new THREE.MeshBasicMaterial({ color: roofColor });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.y = Math.PI / 4;
roof.position.y = barnHeight / 2 + roofHeight / 2;
barn.add(roof);

const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x406821 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const pondGeometry = new THREE.PlaneGeometry(10, 10);
const pondMaterial = new THREE.MeshBasicMaterial({ color: 0x7ec4bb });
const pond = new THREE.Mesh(pondGeometry, pondMaterial);
pond.rotation.x = -Math.PI / 2;
pond.position.z = -10;
pond.position.y = 0.01;
scene.add(pond);

const tankGeometry = new THREE.CylinderGeometry(1, 1, 3, 16);
const tankMaterial = new THREE.MeshBasicMaterial({ color: 0x9ea4a3 });
const tank = new THREE.Mesh(tankGeometry, tankMaterial);
tank.position.x = 0;
tank.position.y = 1.5;
tank.position.z = -5;
scene.add(tank);

const platformGeometry = new THREE.BoxGeometry(2, 0.2, 2);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x9ea4a3 });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.x = 0;
platform.position.y = 0.1;
platform.position.z = -5;
scene.add(platform);

const treeTrunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
const treeTopGeometry = new THREE.ConeGeometry(1, 3, 8);
const treeMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xb78248 }),
  new THREE.MeshBasicMaterial({ color: 0x60b748 })
];

const treePositions = [
  { x: -10, z: 10 },
  { x: 10, z: 10 },
  { x: -10, z: -20 },
  { x: 10, z: -20 },
];

treePositions.forEach(position => {
  const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeMaterials[0]);
  const treeTop = new THREE.Mesh(treeTopGeometry, treeMaterials[1]);
  treeTop.position.y = 2;
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
  } else if (targetId === 'barn-rotation-toggle') {
    barnIsRotating = !barnIsRotating;
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

  renderer.render(scene, camera);
}

animate();

camera.position.set(0, cameraHeight, zoomDistance);
camera.lookAt(scene.position);
