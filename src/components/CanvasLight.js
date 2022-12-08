import * as THREE from 'three'

export const AmbientLight = (scene, color) =>{
    const light = new THREE.AmbientLight(color, 1.5)
    scene.add(light)
}
export const SpotLight = (scene, color) =>{
    const light = new THREE.SpotLight(color, 1.5,1000);

    light.position.set(0, 0, 27);
    light.castShadow = true;

    scene.add(light);
}
export const PointLight = (scene, color, position) =>{
    const light = new THREE.PointLight(color, 1.2, 1000, 1);
    light.castShadow = true;


    light.position.set(position.x, position.y, position.z);

    scene.add(light);
}
export const RectLight = (scene, color) => {
    const light = new THREE.RectAreaLight(color, 0.2, 2000,2000);

    light.position.set(5, 50, 50);
    light.lookAt(0, 0, 0);

    scene.add(light);
  }