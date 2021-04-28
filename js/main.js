// // ////@ts-check
var scene;
var camera;
var renderer;

function setup() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( - window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, - window.innerHeight / 2, 1, 1000 );
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);
    
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.y = 3;
    
    
    // cube.width = 1;
    
    // scene.add(cube);
    
    camera.position.z = 2;

}

setup();

// one main texture for displaying on screen and another helper texture for the shader
var mainTex;
var helperTex;

var customMaterial;
var plane;
var mesh;

function createMaterials(){
    buffer = new THREE.Scene();

    // main and temp textures for reading/writing state updates
    mainTex = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight);
    helperTex = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight);

    var uniforms = {
        dimensions : {type: 'v2', value: new THREE.Vector2(window.innerWidth,window.innerHeight)},
        smokeTexture: {type: 't', value: helperTex},
        mousePos : {type: 'v2', value: new THREE.Vector2(0,0)}
    }

    customMaterial = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      fragmentShader: document.getElementById( 'basicShader' ).innerHTML
    });

    plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );

    mesh = new THREE.Mesh( plane, customMaterial );
    scene.add(mesh);
  }

  createMaterials();

const animate = function() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // renderer.render(buffer,camera, mainTex, true);

    var temp = mainTex;
    mainTex = helperTex;
    helperTex = temp;

    mesh.material.map = mainTex;
    customMaterial.uniforms.smokeTexture.value = helperTex;

    renderer.render(scene, camera)
};

animate();