function spotlight(x, y, z, color, scene) {
    var spotlight = new THREE.SpotLight(color, 1, 1000);
    spotlight.position.set(x, y, z);
    spotlight.target.position.set(0,0,0);
    spotlight.target.updateMatrixWorld();

    return spotlight;
}

function createSpotlights(x, y, z){
  var material;
  var sp = new Objeto();

  material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:false});
  sp.addElement(x, y, z, new THREE.SphereGeometry(1, 32, 32), material);
  sp.addElement(x, y, z, new THREE.ConeGeometry(1, 2, 32), material);
  sp.children[1].rotateZ(-Math.PI/2);
  sp.children[1].rotateX(Math.PI/4);
  sp.children[1].lookAt(0,500,0);

  scene.add(sp);
  return sp;

}
