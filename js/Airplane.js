class Airplane extends THREE.Geometry{
  constructor(){
    super();
  }
}

function createAirplane(){
  geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-2, 2, -4), new THREE.Vector3(2, 2, -4), new THREE.Vector3(0, 0, 4), new THREE.Vector3(2, -2, -4), new THREE.Vector3(-2, -2, -4)); //main vertices
  geometry.vertices.push(new THREE.Vector3(1,1,0), new THREE.Vector3(1,-1,0), new THREE.Vector3(4,0,0)); //wing 1
  geometry.vertices.push(new THREE.Vector3(-1,1,0), new THREE.Vector3(-1,-1,0), new THREE.Vector3(-4,0,0)); //wing 2
  geometry.vertices.push(new THREE.Vector3(0,1,0), new THREE.Vector3(0,1.5,-2), new THREE.Vector3(0,3,-2)); //vertical flap
  geometry.vertices.push(new THREE.Vector3(0,2.25,-1.55), new THREE.Vector3(0,2.25,-1.75), new THREE.Vector3(1,2.05,-1.65)); //horizontal flap 1
  geometry.vertices.push(new THREE.Vector3(0,2.25,-1.55), new THREE.Vector3(0, 2.25, -1.75), new THREE.Vector3(-1,2.05, -1.65)); //horizontal flap 2
  geometry.vertices.push(new THREE.Vector3(-4/5,1.85,0.50), new THREE.Vector3(4/5,1.85,0.50), new THREE.Vector3(0, 0.2, 3.2), new THREE.Vector3(-4/5,0.82,0.50), new THREE.Vector3(4/5,0.82,0.50)); //cockpit

  var face = new THREE.Face3(0,1,2); //top of airplane
  face.color = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(3,1,2); //left of the airplane
  face.color = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(0,4,2); //right of the airplane
  face.color = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(4,3,2); //bottom of the airplane
  face.color = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(1,3,0); //half left of the back square
  face.color = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(3,4,0); //half riht of the back square
  face.color = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(5,6,7); //left wing
  face.color = new THREE.Color(0x9ACD32);
  geometry.faces.push(face);

  face = new THREE.Face3(8,9,10); //right wing
  face.color = new THREE.Color(0x9ACD32);
  geometry.faces.push(face);

  face = new THREE.Face3(11,12,13); //vertical flap
  face.color = new THREE.Color(0x9ACD32);
  geometry.faces.push(face);

  face = new THREE.Face3(14,15,16); //left horizontal flap
  face.color = new THREE.Color(0x9ACD32);
  geometry.faces.push(face);

  face = new THREE.Face3(17,18,19); //right horizontal flap
  face.color = new THREE.Color(0x9ACD32);
  geometry.faces.push(face);

  face = new THREE.Face3(20,21,22); //top of the cockpit
  face.color = new THREE.Color(0x333300);
  geometry.faces.push(face);

  face = new THREE.Face3(22, 20, 23); //left of the cockpit
  face.color = new THREE.Color(0x333300);
  geometry.faces.push(face);

  face = new THREE.Face3(21, 22, 24); //right of the cockpit
  face.color = new THREE.Color(0x333300);
  geometry.faces.push(face);

  face = new THREE.Face3(20, 21, 24); //left triangle of the back of the cockpit
  face.color = new THREE.Color(0x333300);
  geometry.faces.push(face);

  face = new THREE.Face3(20, 24, 23); //right triangle of the back of the cockpit
  face.color = new THREE.Color(0x333300);
  geometry.faces.push(face);

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var material_lambert = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors, side:THREE.DoubleSide});

  airplane = new THREE.Mesh(geometry,material_lambert);
  material_lambert.FlatShading = true;

  scene.add(airplane);

}
