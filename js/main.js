import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const barnWidth = 3;
const barnHeight = 3;
const barnDepth = 6;
const barnColor = 0x823025;

const barnGeometry = new THREE.BoxGeometry(barnWidth, barnHeight, barnDepth);
const barnMaterial = new THREE.MeshBasicMaterial({ color: barnColor });
const barn = new THREE.Mesh(barnGeometry, barnMaterial);
barn.position.x = 2;
barn.position.y = 1.5;
barn.position.z = -3;
scene.add(barn);

const roofColor = 0x953225;
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

// Create the roof geometry using ExtrudeGeometry
const roofGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

// Create the roof material
const roofMaterial = new THREE.MeshBasicMaterial({ color: roofColor });

// Create the roof mesh
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.x = Math.PI / 4 * 0;
roof.rotation.y = Math.PI / 4 * 0;
roof.rotation.z = Math.PI / 4 * -1.05;
roof.position.y = barnHeight / 2 + roofHeight / 2 - 1;
roof.position.x = -1.5;
roof.position.z = -3;
barn.add(roof);



const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x406821 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const pondRadius = 5;
const pondSegments = 32;

const pondMaterial = new THREE.MeshBasicMaterial({ color: 0x7ec4bb });

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
const tankMaterial = new THREE.MeshBasicMaterial({ color: 0x9ea4a3 });
const tank = new THREE.Mesh(tankGeometry, tankMaterial);
tank.position.x = 7;
tank.position.y = 1.48;
tank.position.z = -2;
scene.add(tank);

const openLidGeometry = new THREE.CircleGeometry(.8, 32);
const openLidMaterial = new THREE.MeshBasicMaterial({ color: 0x7ec4bb });
const openLid = new THREE.Mesh(openLidGeometry, openLidMaterial);
openLid.rotation.x = -Math.PI / 2;
openLid.position.copy(tank.position);
openLid.position.y = 3;
scene.add(openLid);

const platformGeometry = new THREE.BoxGeometry(2, 0.2, 2);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x9ea4a3 });
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
  new THREE.MeshBasicMaterial({ color: 0xb78248 }),
  new THREE.MeshBasicMaterial({ color: 0x2aaf75 }),
  new THREE.MeshBasicMaterial({ color: 0x45b35e }),
  new THREE.MeshBasicMaterial({ color: 0x60b748 })
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
