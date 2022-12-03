import * as THREE from 'three'

export const AmbientLight = (scene) =>{
    const light = new THREE.AmbientLight('white', 0.5)
    scene.add(light)
}
export const SpotLight = (scene) =>{
    const light = new THREE.SpotLight('white', 0.6, 1000);

    light.position.set(0, 27, 300);
    light.castShadow = true;

    scene.add(light);
}
export const PointLight = (scene) =>{
    const light = new THREE.PointLight('red', 1, 1000);
    light.castShadow = true;


    light.position.set(0, 40, 300);

    scene.add(light);
}