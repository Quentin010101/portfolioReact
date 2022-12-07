import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Global.css'
import { Box } from '@mui/material'
import { theme } from '../theme'
import {  useState } from 'react';


export const Social = () => {

    const palette = theme()

    const items = [<GitHubIcon sx={{ fontSize: 14 }} />, <LinkedInIcon sx={{ fontSize: 14 }} />, <EmailIcon sx={{ fontSize: 14 }} />, <Box sx={{ fontSize: 10, fontWeight: 700 }}>CV</Box>]
    
    const arr = new Array(items.length)
    arr.fill(palette.primary.dark, 0)

    const [color, setColor] = useState(arr)
    
    const onMouseEnter = (index) =>{
        const newcolor = arr
        newcolor[index] = palette.primary.light
        setColor(newcolor)
        console.log('r')
    }
    const onMouseLeave = (index) =>{
        const newcolor = arr
        newcolor[index] = palette.primary.dark
        setColor(newcolor)
    }
    
    
    const listeSocial = items.map((item, index) => 
    <li  key={index} onMouseEnter={()=> onMouseEnter(index)} onMouseLeave={()=> onMouseLeave(index)} style={{ color: color[index] }}>
            {item}
        </li>
    )
    return (
        <div className='social'>
            <ul className='social-liste'>
                {listeSocial}
            </ul>
        </div>
    )
}