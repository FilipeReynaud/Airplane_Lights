var camera, scene, airplane, directionalLight, mesh;
var day = true;
var mm = [];
var mm2 = [];
var lambert = true;
var width = window.innerWidth;
var height = window.innerHeight;
var rotateY = [false, 0], rotateX = [false, 0];
var plane;
var spotlight1_bool = true;
var spotlight2_bool = true;
var spotlight3_bool = true;
var spotlight4_bool = true;
var spotlight1, spotlight2, spotlight3, spotlight4;
var d_light = true;
var directionalLight;
var calculate = true;
var sp1, sp2, sp3, sp4;

function animate(){
    if(rotateY[0] || rotateX[0])
      rotateAirplane();
    refreshSpotLights();
    updateMaterial();
    updateCalculus();
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
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    directionalLight.position.set(0, 20, 0);
    scene.add(directionalLight);
}

function refreshSpotLights() {
    if(spotlight1_bool){
        scene.add(spotlight1);
        sp1.children[1].material = mm2[1];
    }
    else{
        scene.remove(spotlight1);
        sp1.children[1].material = mm2[0];
    }
    if(spotlight2_bool){
        scene.add(spotlight2);
        sp2.children[1].material = mm2[1];
    }
    else{
        scene.remove(spotlight2);
        sp2.children[1].material = mm2[0];
    }
    if(spotlight3_bool){
        scene.add(spotlight3);
        sp3.children[1].material = mm2[1];
    }
    else{
        scene.remove(spotlight3);
        sp3.children[1].material = mm2[0];
    }
    if(spotlight4_bool){
        scene.add(spotlight4);
        sp4.children[1].material = mm2[1];
    }
    else{
        scene.remove(spotlight4);
        sp4.children[1].material = mm2[0];
    }
}

function updateMaterial(){
  if(calculate){
    if(lambert)
      airplane.material = mm[0];

    else
      airplane.material = mm[1];

  }
}

function updateCalculus(){
  if(calculate)
    airplane.material = mm[0];
  else
    airplane.material = mm[2];
}

function addSpotlights() {
    var spotLightHelper1, spotLightHelper2, spotLightHelper3, spotLightHelper4;

    sp1 = createSpotlights(10, 0, 10);
    spotlight1 = spotlight(10, 0, 10, 0xffffff);
    //spotLightHelper1 = new THREE.SpotLightHelper( spotlight1 );

    sp2 = createSpotlights(-10, 0, 10);
    spotlight2 = spotlight(-10, 0, 10, 0xffffff);
    //spotLightHelper2 = new THREE.SpotLightHelper( spotlight2 );

    sp3 = createSpotlights(10, 0, -10);
    spotlight3 = spotlight(10, 0, -10, 0xffffff);
    //spotLightHelper3 = new THREE.SpotLightHelper( spotlight3 );

    sp4 = createSpotlights(-10, 0, -10);
    spotlight4 = spotlight(-10, 0, -10, 0xffffff);
    //spotLightHelper4 = new THREE.SpotLightHelper( spotlight4 );

    //scene.add( spotLightHelper1, spotLightHelper2, spotLightHelper3, spotLightHelper4 );
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
        case 37: //LEFT
            if(!rotateY[0]) {
                rotateY[0] = true;
                rotateY[1] = -1;
            }
            break;
        case 38: //UP
            if(!rotateX[0]) {
                rotateX[0] = true;
                rotateX[1] = 1;
            }
            break;
        case 39: //RIGHT
            if(!rotateY[0]) {
                rotateY[0] = true;
                rotateY[1] = 1;
            }
            break;
        case 40: //DOWN
            if(!rotateX[0]) {
                rotateX[0] = true;
                rotateX[1] = -1;
            }
            break;
        case 49: //1
            spotlight1_bool = !spotlight1_bool;
            break;
        case 50: //2
            spotlight2_bool = !spotlight2_bool;
            break;
        case 51: //3
            spotlight3_bool = !spotlight3_bool;
            break;
        case 52: //4
            spotlight4_bool = !spotlight4_bool;
            break;
        case 65: //Tecla 'a' -> alternar entre wireframe e solid color
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 71: //Gourand/Phong
            lambert = !lambert;
            break;
        case 76: //Tecla 'l' -> ilumination calculus
            calculate = !calculate;
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
    window.addEventListener('keyup', onKeyUp);

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;

}
