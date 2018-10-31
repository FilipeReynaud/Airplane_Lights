var camera, scene, airplane, directionalLight, mesh;
var day = true;
var mm = [];
var lambert = true;
var width = window.innerWidth;
var height = window.innerHeight;
var rotateY = [false, 0], rotateX = [false, 0];
var d_light = true;
var directionalLight; // DirectionalLight = sun light;

function animate(){
    if(rotateY[0] || rotateX[0])
      rotateAirplane();
    render();
    updateMaterial();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScene(){
    scene = new THREE.Scene();
    createAirplane();
    addSpotlights();
    scene.add(new THREE.AxesHelper( 20 ));
}

function createCamera(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(25,25,25);
    camera.lookAt(scene.position);
}

function render(){
    renderer.render(scene, camera);
}

function createLight(){
  directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(20, 20, 20);
  scene.add(directionalLight);
}

function updateMaterial(){
  if(lambert){
    mesh.material = mm[0];
  }
  else{
    mesh.material = mm[1];
  }
}

function addSpotlights() {
    //console.log(airplane.mesh);
    scene.add(spotlight(10, 0, 10, 0xffffff));
    scene.add(spotlight(-10, 0, 10, 0xffffff));
    scene.add(spotlight(10, 0, -10, 0xffffff));
    scene.add(spotlight(-10, 0, -10, 0xffffff));
}

function rotateAirplane(){
    if(rotateY[0])
      geometry.rotateY(rotateY[1] * Math.PI / 180);
    if(rotateX[0])
      geometry.rotateX(rotateX[1] * Math.PI / 180);
}

function onResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onKeyDown(event) {

    switch(event.keyCode){
      case 38: //UP
          if(!rotateX[0]){
            rotateX[0] = true;
            rotateX[1] = -1;
          }
          break;
      case 37: //LEFT
          if(!rotateY[0]){
            rotateY[0] = true;
            rotateY[1] = -1;
          }
          break;
      case 40: //DOWN
          if(!rotateX[0]){
            rotateX[0] = true;
            rotateX[1] = 1;
          }
          break;
      case 39: //RIGHT
          if(!rotateY[0]){
            rotateY[0] = true;
            rotateY[1] = 1;
          }
          break;
      case 76: //ilumination calculus
        break;
      case 71: //Gourand/Phong
        lambert = !lambert;
        console.log(lambert);
        break;
      case 49: //spotlight 1
        break;
      case 50: //spotlight 2
        break;
      case 51: //spotlight 3
        break;
      case 52: //spotlight 4
        break;
      case 65: //Tecla 'a' -> alternar entre wireframe e solid color
          scene.traverse(function (node){
              if(node instanceof THREE.Mesh){
                  node.material.wireframe = !node.material.wireframe;
              }
          });
          break;
      case 78: //Tecla 'n' -> alternar entre o modo dia e o modo noite
          directionalLight.visible = !d_light;
          d_light = !d_light;
      default: break;
    }
}

function onKeyUp(event) {

    switch(event.keyCode){
      case 38: //UP
          if(rotateX[0]){
            rotateX[0] = false;
          }
          break;
      case 37: //LEFT
          if(rotateY[0]){
            rotateY[0] = false;
          }
          break;
      case 40: //DOWN
          if(rotateX[0]){
            rotateX[0] = false;
          }
          break;
      case 39: //RIGHT
          if(rotateY[0]){
            rotateY[0] = false;
          }
          break;
      default: break;
    }
}

function init(){
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    createLight();
    render();

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keypress', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;

}
