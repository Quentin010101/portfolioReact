import { useEffect } from 'react'
import '../pages/Acceuil.css'
import { theme } from '../theme'
import { SetUp, OnResize, distance, map } from './CanvasSetUp'
import { AmbientLight, SpotLight, PointLight } from './CanvasLight'
import * as THREE from 'three'
import { gsap } from "gsap";


export const Canvas = () => {

    useEffect(() => {
        let size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const palette = theme()

        const row = 10
        const col = 10
        const shapeSize = 4
        const gap = 2
        const shapeColor = new THREE.Color(palette.primary.light)
        const bgColor = palette.neutre.dark
        const material = {
            color: shapeColor,
            metalness: .58,
            emissive: '#000000',
            roughness: .05,
        }
        let meshes = []

        // Set up Scene
        const canva = document.getElementById('canva')
        const [scene, camera, renderer] = SetUp(size.width, size.height, canva, bgColor)

        // On resize
        window.addEventListener('resize', function () {
            OnResize(camera, renderer)
        })

        // Light
        AmbientLight(scene)
        PointLight(scene)
        SpotLight(scene)

        // Draw

        //----------- GROUP
        const group = new THREE.Object3D()
        group.position.x = -(col * shapeSize + col * gap) / 2 
        group.position.y = -(row * shapeSize + row * gap) / 2 
        scene.add(group)

        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {

                const boxGeometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize)
                const boxMaterial = new THREE.MeshPhysicalMaterial(material)
                const mesh = new THREE.Mesh(boxGeometry, boxMaterial)

                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.position.x = shapeSize * i + gap * i
                mesh.position.y = shapeSize * j + gap * j

                group.add(mesh)
                meshes[i][j] = mesh;
            }
        }

        //------------ PLANE
        const planeGeometry = new THREE.PlaneGeometry(1000,1000)
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 'white'
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.position.z = -20

        scene.add(plane)

        // Raycaster
        const mouse = new THREE.Vector2()
        const ray = new THREE.Raycaster()
        ray.setFromCamera(mouse, camera)

        const intersect = ray.intersectObject(plane)
        console.log(meshes)
        if(intersect.length){

            const { x, z } = intersect[0].point;
            for (let i = 0; i < col; i++) {
                for (let j = 0; j < row; j++) {
                    // const mesh = meshes[i][j]

                    // const mouseDistance = distance(x, z,
                    //     mesh.position.x + group.position.x,
                    //     mesh.position.z + group.position.z);
    
                    // const y = map(mouseDistance, 7, 0, 0, 6);
                    // gsap.to(mesh.position, { y: y < 1 ? 1 : y });
                }
            }
        }


        // Animation
        function animate() {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

    }, [])

    return (
        <div>
            <div id="canva"></div>
        </div>
    )
}