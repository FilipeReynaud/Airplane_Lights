class SpotLight extends Objeto{
  constructor(){
    super();
  }

}

function spotlight(x, y, z, color, scene) {
    var spotlight = new THREE.SpotLight(color, 1, 1000);
    spotlight.position.set(x, y, z);
    spotlight.target.position.set(0,0,0);
    spotlight.target.updateMatrixWorld();

    return spotlight;
}

function createSpotlights(x, y, z){
  var sp = new Objeto();

  var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:false});
  sp.addElement(x, y, z, new THREE.SphereGeometry(5, 32, 32), material);
  scene.add(sp);
  return sp;

}
