import React from 'react'
import { Box, Button,List,ListItem } from '@mui/material'
import { CreateOutlined } from '@mui/icons-material'
import styled from '@emotion/styled'
import {SIDEBAR_DATA} from '../config/Sidebar.config'
import ComposeMail from './ComposeMail'
import { useState } from 'react'
import { useParams,NavLink } from 'react-router-dom'
import { routes } from '../routes/routes'

const ComposeButton = styled(Button)({
    background:'#c2e7ff',
    color:'#001d35',
    padding:16,
    borderRadius: 16,
    minWidth:140,
    textTransform:'none'
})


const Container = styled(Box)({
    padding:8,
    '& > ul':{
        padding: '10px 0 0 5px',
        fontsize:14,
        fontWeight:500,
        cursor:'pointer',
        '& > a':{
            textDecoration:'none',
            color:'inherit'
        }
    },
    '& > ul > a >li > svg':{
        marginRight:20
    }
})
function SideBarContent() {
    const[openDialogBox,SetOpenDialogBox]=useState(false)

    const {type} =useParams();

    const onComposeClick =()=>{
        SetOpenDialogBox(true)
    }
  return (
 
        <Container>
        <ComposeButton onClick={() => onComposeClick()}>
           <CreateOutlined />Compose
        </ComposeButton>
        
        <List style={{ fontFamily: 'sans-serif' }}>
            {
                SIDEBAR_DATA.map(data => (
                    <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                    <ListItem style={type === data.name.toLowerCase() ? {backgroundColor: '#d3e3fd', borderRadius:'0 16px 16px 0'} : {} }> 
                       <data.icon fontSize='small'/> {data.title}
                    </ListItem>
                    </NavLink>
                ))
            }

        </List>
        <ComposeMail openDialogBox={openDialogBox} setOpenDialogBox={SetOpenDialogBox}/>
        </Container>
  
  )
}

export default SideBarContent