import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const barnGeometry = new THREE.BoxGeometry(6, 4, 6);
const barnMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xcf4d39 }), // Roof
  new THREE.MeshBasicMaterial({ color: 0xaE2C19 }), // Walls
];
const barn = new THREE.Mesh(barnGeometry, barnMaterials);
barn.position.x = 0;
barn.position.y = 2;
barn.position.z = -5;
scene.add(barn);

const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x406821 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const pondGeometry = new THREE.PlaneGeometry(10, 10);
const pondMaterial = new THREE.MeshBasicMaterial({ color: 0x7ec4bb });
const pond = new THREE.Mesh(pondGeometry, pondMaterial);
pond.rotation.x = -Math.PI / 2;
pond.position.z = -10;
pond.position.y = 0.01; // Slightly above ground level
scene.add(pond);

const tankGeometry = new THREE.CylinderGeometry(1, 1, 3, 16);
const tankMaterial = new THREE.MeshBasicMaterial({ color: 0x9ea4a3 }); // Grey
const tank = new THREE.Mesh(tankGeometry, tankMaterial);
tank.position.x = 0;
tank.position.y = 1.5; // Raise the water tank
tank.position.z = -5; // Same z position as the barn
scene.add(tank);

const platformGeometry = new THREE.BoxGeometry(2, 0.2, 2);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x9ea4a3 }); // Same color as the tank
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.x = 0;
platform.position.y = 0.1; // Slightly above the ground
platform.position.z = -5; // Same z position as the barn and water tank
scene.add(platform);

const treeTrunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
const treeTopGeometry = new THREE.ConeGeometry(1, 3, 8);
const treeMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xb78248 }),
  new THREE.MeshBasicMaterial({ color: 0x60b748 }),
];

// Create four trees at fixed positions
const treePositions = [
  { x: -10, z: 10 },
  { x: 10, z: 10 },
  { x: -10, z: -20 },
  { x: 10, z: -20 },
];

treePositions.forEach((position) => {
  const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeMaterials[0]);
  const treeTop = new THREE.Mesh(treeTopGeometry, treeMaterials[1]);
  treeTop.position.y = 2;
  const tree = new THREE.Group();
  tree.add(treeTrunk);
  tree.add(treeTop);
  tree.position.x = position.x;
  tree.position.y = 1;
  tree.position.z = position.z;
  scene.add(tree);
});

camera.position.x = 20;
camera.position.y = 3;
camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
