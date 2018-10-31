var fuselageMaterial, wingMaterial, propellerMaterial, stabilizersMaterial, wingShape, horizontalStabilizer, verticalStabilizer;
var fuselage, wings, propellers, stabilizers, cockpit, extrudeSettings;

class Airplane extends THREE.Geometry{
  constructor(){
    super();
  }

}

function createAirplane(){
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-2, 2, -4),new THREE.Vector3(2, 2, -4), new THREE.Vector3(0, 0, 4), new THREE.Vector3(2, -2, -4), new THREE.Vector3(-2, -2, -4));
  geometry.vertices.push(new THREE.Vector3(1,1,0), new THREE.Vector3(1,-1,0), new THREE.Vector3(4,0,0));
  geometry.vertices.push(new THREE.Vector3(-1,1,0), new THREE.Vector3(-1,-1,0), new THREE.Vector3(-4,0,0));

  var face = new THREE.Face3(0,1,2);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(1,3,2);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(0,2,4);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(2,3,4);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(1,3,0);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(0,4,3);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(5,6,7);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  face = new THREE.Face3(8,9,10);
  face.vertexColors[0] = new THREE.Color(0xFFFF00);
  geometry.faces.push(face);

  geometry.computeVertexNormals();

  console.log(geometry);

  var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors, side:THREE.DoubleSide});
  var mesh = new THREE.Mesh(geometry,material)
  material.FlatShading = true;
  material.FlatShading = false;
  geometry.normalsNeedUpdate = true;
  scene.add(mesh);

}

function createShape(shape, rectLength, rectWidth){
    shape.moveTo( 0, 0 );
    shape.lineTo( 0, rectWidth);
    shape.lineTo( rectLength, rectWidth );
    shape.lineTo( rectLength, 0 );
    shape.lineTo( 0, -15 );

    return shape;
}
