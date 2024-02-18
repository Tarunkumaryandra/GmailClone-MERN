import React from 'react'
import { CircularProgress, Typography, Box } from '@mui/material'


function SuspenceLoader() {
  return (
    <Box>
        <CircularProgress />
        <Typography>Loading</Typography>
    </Box>
    
  )
}

export default SuspenceLoader