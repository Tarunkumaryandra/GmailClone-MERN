import React, { Suspense } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { useState } from 'react'
import Emails from '../components/Emails';
import { Outlet } from 'react-router-dom';
import SuspenceLoader from '../components/common/SuspenceLoader';
import { Box } from '@mui/material';


function Main() {
  const[openDrawer, setOpenDrawer]=useState(true);

  const toggleDrawer =() =>{
    setOpenDrawer(!openDrawer);
  }

  return (
    <>
        <Header toggleDrawer={toggleDrawer}/>
        <Box>
        <SideBar openDrawer={openDrawer}/>
        <Suspense fallback={<SuspenceLoader />}>
        <Outlet context={{openDrawer}} />
        </Suspense>
        </Box>
    </>
  )
}

export default Main