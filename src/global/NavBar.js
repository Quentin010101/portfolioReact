import './Global.css'
import { Link } from 'react-scroll'

export const NavBar = () => {

    return (
        <div className='navbar'>
            <ul className='navbar-liste'>
                <li>
                    <Link activeClass="active" className="link" to="acceuil" smooth={true} spy={true} duration={300}>Acceuil</Link>
                </li>
                <li>
                    <Link activeClass="active" className="link" to="apropos" smooth={true} spy={true} duration={300}>A propos</Link>
                </li>
                <li>
                    <Link activeClass="active" className="link" to="projects" smooth={true} spy={true} duration={300}>Projets</Link>
                </li>
            </ul>         
        </div>
    )
}