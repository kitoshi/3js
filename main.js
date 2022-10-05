import './style.css';
import * as THREE from 'three';

//to move with mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//dom element to render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//move camera along z axis
camera.position.setZ(30);
//draw

//add object

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//basic needs no light
/* const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true
});
 */
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//need light for std material

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//light helper: shows position
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
//avatar

const dogFaceTexture = new THREE.TextureLoader().load('../public/dogface.jpg');
const dogface = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: dogFaceTexture })
);
scene.add(dogface);

function addFloatingDog() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ map: dogFaceTexture })
  );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addFloatingDog);

//moon

const dogTexture = new THREE.TextureLoader().load('../public/dog.jpg');
const dog = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: dogTexture
  })
);
scene.add(dog);

//background, can show loading bar with callback
const grassTexture = new THREE.TextureLoader().load(
  '../public/grassy-hill-bg.jpg'
);
scene.background = grassTexture;
function animate() {
  //tell browser to repaint
  requestAnimationFrame(animate);

  //animate here
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();

  renderer.render(scene, camera);
}
animate();
