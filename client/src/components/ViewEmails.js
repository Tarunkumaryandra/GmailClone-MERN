import React from 'react'
import { useOutletContext, useLocation } from 'react-router-dom'
import {Box, Typography, styled} from '@mui/material'
import {ArrowBack ,Delete} from '@mui/icons-material'
import { emtyProfilePic } from '../constant/constant'
import useApi from '../hooks/useApi'
import { API_URLS } from '../services/api.urls'


const IconWrapper = styled(Box)({
  padding:15,
  position:'relative',
  paddingTop:'80px'
})

const Subject = styled(Typography)({
 fontSize:22,
 margin: '10px 0 20px 75px',
 display:'flex'
})

const Indicator = styled(Box)({
  fontSize:12,
  background:'#ddd',
  color:'#222',
  borderRadius:4,
  padding: '2px 4px',
  marginLeft:6,
  alignSelf:'center'
})

const Container = styled(Box)({
  marginLeft:'15px',
  width:'98%',
  '& >div' :{
    display:'flex',
    '& > p > span':{
      fontSize:12,
      color:'#5E5E5E'
  
    }
  }


})

const Wrapper =styled(Box)({

})


const Date = styled(Box)({
  marginLeft: 'auto', // Align to the right
  color:'#5E5E5E',
  marginRight:10


})


const Image =styled('img')({
  borderRadius:"50%",
  width:40,
  height:40,
  margin:'5px 10px 0 10px',
  background:'#cccccc'


})


const Body =styled(Typography)({
  whiteSpace:'pre-line'

})





function ViewEmails() {
    const {openDrawer} = useOutletContext();

    const {state} = useLocation();
    const {email} = state;

    const moveEMailsToBinService = useApi(API_URLS.moveEmailsToBin);

    const deleteEmail=()=>{
      moveEMailsToBinService.call([email._id]);
      window.history.back();
    }
    
  return (
    <Box style={openDrawer ? {marginLeft:250, width:'calc(100%-250px'} : {width:'calc(100%-250px'}}>
        <IconWrapper>
            <ArrowBack onClick={() => window.history.back()} color='action' fontSize='small'  style={{cursor:'pointer'}}/>
            <Delete fontSize='small' color='action' style={{marginLeft:'40',cursor:'pointer'}} onClick={()=>deleteEmail()}/>
        </IconWrapper>
        <Subject>
          {email.subject} <Indicator component='span'>inbox</Indicator> 
        </Subject>
        <Box style={{display:'flex'}}>
          <Image src={emtyProfilePic}  alt="dp"/>
          <Container>
            <Box>
              <Typography style={{marginTop:'10px'}}>{email.name}
              <Box component='span'>&nbsp; &#60;{email.to}&#62;</Box>
              </Typography>
              <Date>
                    {(new window.Date(email.date)).getDate()}&nbsp;
                    {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}&nbsp;
                    {(new window.Date(email.date)).getFullYear()}
              </Date>
            </Box>
            <Body style={{marginTop:20} }>{email.body}</Body>
          </Container>
        </Box>
    </Box>
  )
}

export default ViewEmails