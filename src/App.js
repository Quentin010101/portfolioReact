import './App.css';
import { Acceuil } from './pages/Acceuil';
import { Projects } from './pages/Projects';
import { Apropos } from './pages/Apropos';
import { NavBar } from './global/NavBar'
import { Social } from './global/Social'
import {theme} from './theme'
import {useEffect, useState} from 'react'

function App() {
  const palette = theme()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, []);

  if(loading){
    return null
  } else{
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
}

export default App;
