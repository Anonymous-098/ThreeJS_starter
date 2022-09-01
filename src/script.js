import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width -0.5;
    cursor.y = -(event.clientY / sizes.height -0.5);
})

const scene = new THREE.Scene();

const canvas = document.querySelector(".webgl");

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight,
}

window.addEventListener('resize',()=>{
    // console.log('Resized');
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
})

//CAMERA
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping=true;

//MATERIAL
const material = new THREE.MeshBasicMaterial();
material.side = THREE.DoubleSide;

//BOX
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    material
)
scene.add(box);

//RENDERER
const renderer = new THREE.WebGL1Renderer({
    canvas:canvas
});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const clock = new THREE.Clock();

const tick = () =>{
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene,camera);

    controls.update();
    renderer.setSize(sizes.width,sizes.height);

    window.requestAnimationFrame(tick);
}

tick();