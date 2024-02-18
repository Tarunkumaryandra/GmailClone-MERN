import React from 'react'
import {AppBar, Toolbar, InputBase, Box} from '@mui/material'
import {Menu as MenuIcon, Search, Tune, HelpOutlineOutlined, SettingsOutlined, AppsOutlined,AccountCircleOutlined} from '@mui/icons-material';
import styled from '@emotion/styled'
import { gmailLogo } from '../constant/constant';


const StyledAppBar =styled(AppBar)({
    background:'#F5F5F5',
    boxShadow:'none',

})

const SeachWrapper = styled(Box)({
    background:"#EAF1FB",
    marginLeft:80,
    borderRadius:8,
    minWidth:690,
    maxWidth:720,
    height:48,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding: '0 20px',
    '& > div':{
        width: "100%",
        padding:'0 10px'
    }
})


const OptionsWrapper = styled(Box)({
    width:'100%',
    display:'flex',
    justifyContent:'end',
    '& >svg':{
        marginLeft:20,
    }

})


function Header({toggleDrawer}) {
  return (

        <StyledAppBar position='fixed'>
            <Toolbar>
                <MenuIcon color='action' onClick={toggleDrawer} style={{cursor:'pointer'}}/>
                <img src={gmailLogo} alt='logo' style={{width:110,marginLeft:15}}/>
                <SeachWrapper>
                    <Search color='action'/>
                    <InputBase 
                    placeholder='Search mail'/>
                    <Tune color='action'/> 
                </SeachWrapper>
                <OptionsWrapper>
                    <HelpOutlineOutlined  color='action'/>
                    <SettingsOutlined color='action'/>
                    <AppsOutlined color='action'/>
                    <AccountCircleOutlined color='action'/>
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>

  )
}

export default Header