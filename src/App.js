import './App.css';
import { Acceuil } from './pages/Acceuil';
import { Projects } from './pages/Projects';
import { Apropos } from './pages/Apropos';
import { NavBar } from './global/NavBar'
import { Social } from './global/Social'
import {theme} from './theme'

function App() {
  const palette = theme()
  return (
    <div className="App" style={{color: palette.text.neutre}}>
        <NavBar />
        <Social/>
        <Acceuil/>
        <Apropos/>
        <Projects/>
    </div>
  );
}

export default App;
