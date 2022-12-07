import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Global.css'
import { Box } from '@mui/material'
import { theme } from '../theme'


export const Social = () => {
    const items = [<GitHubIcon sx={{ fontSize: 15 }} />, <LinkedInIcon sx={{ fontSize: 15 }} />, <EmailIcon sx={{ fontSize: 15 }} />, <Box sx={{ fontSize: 11, fontWeight: 700 }}>CV</Box>]
    
    const palette = theme()

    const listeSocial = items.map((item, index) => 
    <li  key={index} className='link'>
        <div>
            {item}
        </div>
    </li>
    )
    return (
        <div className='social'>
            <ul className='social-liste' style={{color: palette.secondary.dark}}>
            <div className='line' style={{backgroundColor: palette.secondary.dark}}></div>
                {listeSocial}
            </ul>
        </div>
    )
}