var camera, scene, airplane, directionalLight;
var day = true;
var width = window.innerWidth;
var height = window.innerHeight;
var rotateY = [false, 0], rotateX = [false, 0];

function animate(){
    if(rotateY[0] || rotateX[0])
      rotateAirplane();
    render();
    createLight();
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
    camera.lookAt(scene.position);}

function render(){
    renderer.render(scene, camera);
}

function createLight(){
  directionalLight.position.set(20, 20, 20);
  if(day)
    scene.add(directionalLight);
  else
    scene.remove(directionalLight);
}

function rotateAirplane(){
    if(rotateY[0])
      geometry.rotateY(rotateY[1] * Math.PI / 180);
    if(rotateX[0])
      geometry.rotateX(rotateY[1] * Math.PI / 180);
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
            rotateX[1] = 1;
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
            rotateX[1] = -1;
          }
          break;
      case 39: //RIGHT
          if(!rotateY[0]){
            rotateY[0] = true;
            rotateY[1] = 1;
          }
          break;
      case 78: //sun
      console.log(scene);
        day = !day;
        break;
      case 76: //ilumination calculus
        break;
      case 71: //Gourand/Phong
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
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    createLight();
    render();

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keypress', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;

}
