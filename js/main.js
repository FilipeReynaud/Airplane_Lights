var camera, scene, airplane, directionalLight;
var width = window.innerWidth;
var height = window.innerHeight;
var rotateY = [false, 0], rotateX = [false, 0];
var plane; 
var spotlight1_bool = true;
var spotlight2_bool = true;
var spotlight3_bool = true;
var spotlight4_bool = true;
var spotlight1, spotlight2, spotlight3, spotlight4;

function animate(){
    if(rotateY[0] || rotateX[0])
      rotateAirplane();
    refreshSpotLights();
    render();
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
    /*directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    directionalLight.position.set(20, 20, 20);
    scene.add(directionalLight); */
}

function refreshSpotLights() {
    if(spotlight1_bool)
        scene.add(spotlight1);
    else
        scene.remove(spotlight1);
    if(spotlight2_bool)
        scene.add(spotlight2);
    else
        scene.remove(spotlight2);
    if(spotlight3_bool)
        scene.add(spotlight3);
    else
        scene.remove(spotlight3);
    if(spotlight4_bool)
        scene.add(spotlight4);
    else
        scene.remove(spotlight4);
}

function addSpotlights() {
    spotlight1 = spotlight(10, 0, 10, 0xffffff);
    spotlight2 = spotlight(-10, 0, 10, 0xffffff);
    spotlight3 = spotlight(10, 0, -10, 0xffffff);
    spotlight4 = spotlight(-10, 0, -10, 0xffffff)
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
        case 65: //Tecla 'a' -> alternar entre wireframe e solid color
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 49:
            spotlight1_bool = !spotlight1_bool;
            break;
        case 50:
            spotlight2_bool = !spotlight2_bool;
            break;
        case 51:
            spotlight3_bool = !spotlight3_bool;
            break;
        case 52:
            spotlight4_bool = !spotlight4_bool;
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
    createLight();
    render();

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;

}
