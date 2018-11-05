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
  var material1, material2;
  var sp = new Objeto();

  material1 = new THREE.MeshBasicMaterial({color: 0x696969, wireframe:false});
  sp.addElement(x, y, z, new THREE.SphereGeometry(1, 32, 32), material1);
  material2 = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:false});
  sp.addElement(x, y, z, new THREE.ConeGeometry(1, 2, 32), material2);
  sp.children[1].rotateZ(-Math.PI/2);
  sp.children[1].rotateX(Math.PI/4);
  sp.children[1].lookAt(0,500,0);
  mm2.push(material1);
  mm2.push(material2);

  scene.add(sp);
  return sp;

}
