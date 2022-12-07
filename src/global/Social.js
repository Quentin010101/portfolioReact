import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Global.css'
import { Box } from '@mui/material'
import { theme } from '../theme'
import { useState } from 'react'


export const Social = () => {
    const items = [<GitHubIcon sx={{ fontSize: 14 }} />, <LinkedInIcon sx={{ fontSize: 14 }} />, <EmailIcon sx={{ fontSize: 14 }} />, <Box sx={{ fontSize: 10, fontWeight: 700 }}>CV</Box>]
    
    const palette = theme()

    const listeSocial = items.map((item, index) => 
    <li  key={index} >
        <div style={{ cursor: 'pointer'}}>
            {item}
        </div>
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