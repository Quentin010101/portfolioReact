import './Acceuil.css'
import { theme } from '../theme'
import { Canvas } from '../components/Canvas'
import { useEffect, useState } from 'react'
// import { gsap } from "gsap";


export const Acceuil = () => {
    const palette = theme()
    const [text, setText] = useState({ text1: '', text2: '' })
    const [waitingTime, setWaitingTime] = useState(0)

    const span1 = 'Hello, i\'m'
    const span2 = 'and i\'m a web developper'


    const animation1 = () => {
        setTimeout(() => {
            const newText = span1.slice(0, text.text1.length + 1)
            setText({ text1: newText, text2: text.text2 })
        }, 70)
    }
    const animation2 = () => {
        setTimeout(() => {
            const newText2 = span2.slice(0, text.text2.length + 1)
            setText({ text1: text.text1, text2: newText2 })
        }, 70)
    }



    if (waitingTime === 0) {
        setTimeout(() => {
            setWaitingTime(1)
        }, 3000)
    } else if(waitingTime === 1){
        animation1()
        setTimeout(() => {
            setWaitingTime(2)
        }, 2500)
    } else {
        animation2()
    }


    return (
        <section id="acceuil" className="section" style={{ backgroundColor: palette.neutre.dark }}>
            <Canvas />
            <div id="title" style={{ color: palette.secondary.dark }}>
                <span>
                    {text.text1}
                </span>
                <span>
                    {text.text2}
                </span>
            </div>
        </section>

    )
}