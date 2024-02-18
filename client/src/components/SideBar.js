import React from 'react'
import { Drawer, Slide, styled } from '@mui/material'
import SideBarContent from './SideBarContent'


function SideBar({openDrawer}) {
  return (
    <div>
        <Drawer
        anchor='left'
        open={openDrawer}
        hideBackdrop={true}
        ModalProps={{
            keepMounted: true
        }}
        variant='persistent'
        sx={{
          '& .MuiDrawer-paper':{
            marginTop:'64px',
            width:250,
            background:'#F5F5F5',
            height:'clac(100vh-64px)'
          }
        }}
        >
            <SideBarContent />
        </Drawer>
    </div>
  )
}

export default SideBar