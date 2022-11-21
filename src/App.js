import './App.css';
import { Acceuil } from './components/Acceuil';
import { Projects } from './components/Projects';
import { Apropos } from './components/Apropos';
import { NavBar } from './global/NavBar'
import { Social } from './global/Social'

function App() {
  return (
    <div className="App">
        <NavBar />
        <Social/>
        <Acceuil/>
        <Apropos/>
        <Projects/>
    </div>
  );
}

export default App;
