import React from 'react'
import {Box, Typography} from '@mui/material';
import { useRouteError } from 'react-router-dom';

function ErrorComponent() {
    const error = useRouteError();
    console.log(error);

  return (
    <Box style={{marginLeft:250}}>
        <Typography>There was an erro loading this page</Typography>
    </Box>
  )
}

export default ErrorComponent