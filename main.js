import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// Cria uma cena
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );


// Cria uma câmera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1;

// Cria um objeto WebGLRenderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set( 3, 1, 1 );
document.body.appendChild( renderer.domElement );


const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambientLight );

// Carrega o modelo GLTF
const loader = new GLTFLoader();
loader.load(
    // URL do arquivo GLTF
    './public/Model/scene.gltf',
    // Função de callback chamada quando o modelo foi carregado
    function ( gltf ) {
        // Adiciona o modelo à cena
        scene.add( gltf.scene );
    },
    // Função de callback para o progresso do carregamento
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% carregado' );
    },
    // Função de callback para tratamento de erros
    function ( error ) {
        console.error( error );
    }
);



// Renderiza a cena
function animate() {
  
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}
animate();
