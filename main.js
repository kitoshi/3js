import './style.css';
import * as THREE from 'three';

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
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function animate() {
  //tell browser to repaint
  requestAnimationFrame(animate);

  //animate here
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}
animate();
