function spotlight(x, y, z, color, scene) {
    var spotlight = new THREE.SpotLight(color, 1, 1000);
    spotlight.position.set(x, y, z);
    spotlight.target.position.set(0,0,0);
    
    return spotlight;
}