import * as THREE from 'three'

export const SetUp = (width, height, canva, bgColor) => {
    // Set up
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(bgColor)

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000,
    )
    camera.position.set(0, 0, 50)
    scene.add(camera)

    // Renderer
    const renderer = new THREE.WebGLRenderer(
        {
            alpha: true,
            antialias: true
        })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    canva.appendChild(renderer.domElement)

    return [scene, camera, renderer]
}

export const OnResize = (camera, renderer) => {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
}

export const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export const map = (value, start1, stop1, start2, stop2) => {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
  }
