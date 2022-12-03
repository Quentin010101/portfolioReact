import './Acceuil.css'
import { theme } from '../theme'
import { Canvas } from '../components/Canvas'
// import { gsap } from "gsap";


export const Acceuil = () => {
    const palette = theme()

    
    return (
        <section id="acceuil" className="section" >
            <Canvas />
        </section>

    )
}