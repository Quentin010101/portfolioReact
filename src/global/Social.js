import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Global.css'
import { Box } from '@mui/material'
import { theme } from '../theme'


export const Social = () => {
    const items = [<GitHubIcon sx={{ fontSize: 16 }} />, <LinkedInIcon sx={{ fontSize: 16 }} />, <EmailIcon sx={{ fontSize: 16 }} />, <Box sx={{ fontSize: 12, fontWeight: 700 }}>CV</Box>]
    
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