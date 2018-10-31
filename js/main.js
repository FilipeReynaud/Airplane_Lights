var camera, scene, airplane;
var width = window.innerWidth;
var height = window.innerHeight;
var rotateY = [false, 0], rotateX = [false, 0];
var d_light = true;
var directionalLight; // DirectionalLight = sun light;

function animate(){
    if(rotateY[0] || rotateX[0])
      rotateAirplane();
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScene(){
    scene = new THREE.Scene();
    createAirplane();
    scene.add(new THREE.AxesHelper( 20 ));
}

function createCamera(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(5, 2, 15);
    camera.lookAt(scene.position);
}

function render(){
    renderer.render(scene, camera);
}

function createLight(){
  directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
  directionalLight.position.set(20, 20, 20);
  scene.add(directionalLight);
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
