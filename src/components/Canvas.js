import { useEffect } from 'react'
import '../pages/Acceuil.css'
import { theme } from '../theme'
import { SetUp, OnResize } from './CanvasSetUp'
import { AmbientLight, SpotLight, PointLight } from './CanvasLight'
import * as THREE from 'three'
import { height } from '@mui/system'

export const Canvas = () => {

    useEffect(() => {
        let size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const palette = theme()

        const row = 10
        const col = 10
        const shapeSize = 0.4
        const gap = 2
        const shapeColor = new THREE.Color(palette.primary.light)
        const bgColor = palette.neutre.dark
        const material = {
            color: shapeColor,
            metalness: .58,
            emissive: '#000000',
            roughness: .05,
        }

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
        group.position.x = -(col * shapeSize + col * gap) / 2 -1
        group.position.y = -(row * shapeSize + row * gap) / 2 - 0.8
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
            }
        }

        //------------ PLANE
        const planeGeometry = new THREE.PlaneGeometry(size.width,size.height)
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 'white'
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.position.z = -20

        scene.add(plane)



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