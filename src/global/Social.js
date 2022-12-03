import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Global.css'
import { Box } from '@mui/material'
import {theme} from '../theme'



export const Social = ()=>{
    const palette = theme()

    return(
        <div className='social'>
            <ul className='social-liste'>
                <li>
                    <div className='line' style={{backgroundColor: palette.text.neutre}}></div>
                </li>
                <li className='link'>
                    <GitHubIcon sx={{ fontSize: 20}}/>
                </li>
                <li className='link'>
                    <LinkedInIcon sx={{ fontSize: 20}}/>
                </li>
                <li className='link'>
                    <EmailIcon sx={{ fontSize: 20}}/>
                </li>
                <li className='link'>
                    <Box sx={{ fontSize: 12, fontWeight: 700}}>
                        CV
                    </Box>
                </li>
            </ul>
        </div>
    )
}