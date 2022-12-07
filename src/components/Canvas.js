import { useEffect } from 'react'
import '../pages/Acceuil.css'
import { theme } from '../theme'
import { SetUp, OnResize, OnMouseMove, distance, map } from './CanvasSetUp'
import { AmbientLight, SpotLight, PointLight, RectLight } from './CanvasLight'
import * as THREE from 'three'
import { gsap } from "gsap";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// import kenia from '../assets/fonts/Kenia_Regular.json'
import kenia from '../assets/fonts/Montserrat_Bold.json'
import { color } from '@mui/system'

export const Canvas = () => {

    useEffect(() => {
        let size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const palette = theme()
        const shapeSize = 1.78
        const row = 9
        const col = 15
        const gap = 0
        const shapeColor = new THREE.Color(palette.neutre.dark)
        const planeColor = new THREE.Color(palette.neutre.dark)
        const bgColor = palette.neutre.dark
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
            metalness: .38,
            roughness: .58,
            transparent: true,
            opacity: 1
        }
        const planematerial = {
            color: shapeColor,
            metalness: .38,
            roughness: .58,
            transparent: true,
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
        AmbientLight(scene, lightColor.p.l)
        PointLight(scene, lightColor.p.s, { x: -100, y: 0, z: 10 })
        PointLight(scene, lightColor.p.l, { x: 100, y: 0, z: 8 })
        PointLight(scene, lightColor.p.l, { x: 50, y: -20, z: 15 })
        SpotLight(scene, lightColor.p.l)
        RectLight(scene, lightColor.p.s)

        // Draw

        //----------- GROUP
        const group = new THREE.Object3D()
        group.position.x = -(col * shapeSize + col * gap) / 2 + 1
        group.position.y = -(row * shapeSize + row * gap) / 2 + 0.8
        scene.add(group)

        const boxMaterial = new THREE.MeshPhysicalMaterial(material)

        //--------------------------- FONT
        const font = new FontLoader().parse(kenia);

          const geometry = new TextGeometry( 'Quentin Cozic', {
              font: font,
              size: 1.3,
              height: 2,
              curveSegments: 1,
          } );
          var textMaterial = new THREE.MeshStandardMaterial( 
              { 
                color: shapeColor,
                metalness: .48,
                roughness: .58,
            }
            );
            var meshi = new THREE.Mesh( geometry, textMaterial );
              meshi.position.z = 0
              meshi.position.y = -0.8
              meshi.position.x = -6.5
              meshi.receiveShadow = true
              meshi.castShadow = true
            scene.add( meshi );


        //---------------------------

        for (let i = 0; i < col; i++) {
            meshes[i] = []
            for (let j = 0; j < row; j++) {

                const boxGeometry = new THREE.BoxGeometry(shapeSize, shapeSize, shapeSize)
                if ((j < 3 || j > 5) || (i < 3 || i > 11)) {

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

                        if ((j < 3 || j > 5) || (i < 3 || i > 11)) {


                        const mesh = meshes[i][j]

                        const mouseDistance = distance(x, y,
                            mesh.position.x + group.position.x,
                            mesh.position.y + group.position.y);

                        const zValue = map(mouseDistance, 5, 0, 0, 8);

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