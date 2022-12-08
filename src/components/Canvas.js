import { useEffect } from 'react'
import '../pages/Acceuil.css'
import { theme } from '../theme'
import { SetUp, OnResize, OnMouseMove, distance, map } from './CanvasSetUp'
import { AmbientLight, SpotLight, PointLight, RectLight } from './CanvasLight'
import * as THREE from 'three'
import { gsap } from "gsap";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// import newFont from '../assets/fonts/Kenia_Regular.json'
import newFont from '../assets/fonts/Montserrat_Bold.json'
// import newFont from '../assets/fonts/Aurore.json'
// import newFont from '../assets/fonts/Caveat.json'
import { color } from '@mui/system'
import { AnimationMixer } from 'three'

export const Canvas = () => {

    useEffect(() => {
        let size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const palette = theme()
        const shapeSize = 1.78
        const row = 15
        const col = 25
        const gap = 0
        const shapeColor = new THREE.Color(palette.neutre.dark)
        const bgColor = 'white'
        const lightColor = {
            p: {
                d: new THREE.Color(palette.primary.dark),
                l: new THREE.Color(palette.primary.dark),
                n: new THREE.Color(palette.primary.dark),
            },
            s: {
                d: new THREE.Color(palette.secondary.dark),
                l: new THREE.Color(palette.secondary.dark),
                n: new THREE.Color(palette.secondary.dark),
            },
            n: {
                d: new THREE.Color(palette.neutre.dark),
                l: new THREE.Color(palette.neutre.dark),
                n: new THREE.Color(palette.neutre.dark),
            }
        }
        const material = {
            color: shapeColor,
            metalness: .68,
            roughness: .58,
            transparent: true,
            opacity: 1,
        }
        const planematerial = {
            color: shapeColor,
            metalness: .68,
            roughness: .58,
            transparent: true,
            opacity: 1,
        }
        const meshes = []

        // Set up Scene
        const canva = document.getElementById('canva')
        const [scene, camera, renderer] = SetUp(size.width, size.height, canva, bgColor)

        // On resize
        window.addEventListener('resize', function () {
            size = OnResize(camera, renderer)
        })

        // On Mouse Move
        window.addEventListener('mousemove', function (event) {
            mouse = OnMouseMove(event, size.width, size.height)
            Raycasting()
        })

        // Light
        AmbientLight(scene, 'white')
        PointLight(scene, palette.primary.light, { x: -100, y: 30, z: 5 })
        PointLight(scene, palette.primary.light, { x: 100, y: 0, z: 8 })
        PointLight(scene, palette.secondary.light, { x: 50, y: -20, z: 22 })
        SpotLight(scene, palette.neutre.light)
        RectLight(scene, palette.neutre.light)

        // Draw

        //----------- GROUP
        const group = new THREE.Object3D()
        group.position.x = -(col * shapeSize + col * gap) / 2 + 1
        group.position.y = -(row * shapeSize + row * gap) / 2 + 0.8
        scene.add(group)

        const boxMaterial = new THREE.MeshPhysicalMaterial(material)

        //--------------------------- FONT
        const font = new FontLoader().parse(newFont);

        const geometry = new TextGeometry('Quentin Cozic', {
            font: font,
            size: 2,
            height: 1.5,
            // curveSegments: 1,
        });
        var textMaterial = new THREE.MeshStandardMaterial(
            {
                color: palette.neutre.light,
                metalness: 0.65,
                roughness: .88,
                emissive: lightColor.s.d,
                emissiveIntensity: 0.05,
            }
        );
        var meshi = new THREE.Mesh(geometry, textMaterial);

        geometry.center()
        meshi.position.z = -4
        meshi.receiveShadow = true
        meshi.castShadow = true

        scene.add(meshi)
        
        gsap.to(meshi.position, {z: 3, duration: 1.5, ease: 'elastic', delay: 3.2})

        //---------------------------

        for (let i = 0; i < col; i++) {
            meshes[i] = []
            for (let j = 0; j < row; j++) {

                const boxGeometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize)
                if ((j < (row / 2 - 2) || j > (row / 2 + 1)) || (i < (col / 2 - 5) || i > (col / 2 + 4))) {

                    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.position.x = shapeSize * i + gap * i
                    mesh.position.y = shapeSize * j + gap * j
                    mesh.position.z = 0

                    group.add(mesh)
                    meshes[i][j] = mesh
                }

            }

        }



        //------------ PLANE
        const planeGeometry = new THREE.PlaneGeometry(100, 100)
        const planeMaterial = new THREE.MeshStandardMaterial(planematerial)
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.material.opacity = 1
        plane.position.z = shapeSize

        scene.add(plane)

        // Raycaster
        let mouse = new THREE.Vector2()

        const Raycasting = () => {

            const ray = new THREE.Raycaster()
            ray.setFromCamera(mouse, camera)

            const intersect = ray.intersectObject(plane)
            if (intersect.length) {

                const { x, y } = intersect[0].point;
                for (let i = 0; i < col; i++) {
                    for (let j = 0; j < row; j++) {

                        if ((j < (row / 2 - 2) || j > (row / 2 + 1)) || (i < (col / 2 - 5) || i > (col / 2 + 4))) {


                            const mesh = meshes[i][j]

                            const mouseDistance = distance(x, y,
                                mesh.position.x + group.position.x,
                                mesh.position.y + group.position.y);

                            const zValue = map(mouseDistance, 6, 0, 0, 8);

                            // translate z
                            gsap.to(mesh.position, { z: zValue < 1 ? 0 : zValue });

                            // scale
                            const scaleFactor = mesh.position.z / 2.6;
                            const scale = scaleFactor < 1 ? 1 : scaleFactor;
                            gsap.to(mesh.scale, {
                                ease: 'power2',
                                x: scale,
                                y: scale,
                                z: scale,
                            });
                        }
                    }
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