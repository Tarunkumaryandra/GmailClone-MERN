import { Close, DeleteOutline } from '@mui/icons-material'
import { Dialog,Box, Typography, styled, InputBase, TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import useApi from '../hooks/useApi'
import { API_URLS } from '../services/api.urls';


const dialogStyle={
    height:'90',
    width:'80%',
    maxWidth:'100%',
    maxHeight:'90',
    boxShadow:'none',
    borderRadius:'10px 10px 0 0'
}

const Header=styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    padding:'10px 15px',
    background:'#f2f6fc',
    '&>p':{
        fontSize:14,
        fontWeight:500
    }
})


const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '& > div':{
        fontSize:14,
        borderBottom:'1px solid #F5F5F5',
        marginTop:'10'
    }

})

const Footer=styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px'

})

const SendButton =styled(Button)({
    background:'#0B57D0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:'100',
})





function ComposeMail({openDialogBox, setOpenDialogBox}) {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);


    const config ={
    
            Host : "smtp.elasticemail.com",
            Username : "tarunyandra@yopmail.com",
            Password : "80E8CC58F548CCE01D3F07DF3A718CBEA3E8",
            Port:2525
            
    }

    const closeComposeMail =(e)=>{
        e.preventDefault();

        const payload ={
            to:data.to,
            from:'tarunyandra124@gmail.com',
            subject:data.subject,
            body:data.body,
            date:new Date(),
            image:'',
            name:'Tarun',
            starred:false,
            type:'drafts'
        }

        saveDraftService.call(payload)

        if(!saveDraftService.error){
            setOpenDialogBox(false);
            setData({});
        }else{
            
        }
    }


    const SendMail = (e) => {
        e.preventDefault();
    
        if (window.Email) { // Fix the case of 'Window' to 'window'
            window.Email.send({
                ...config,
                To: data.to,
                From: `tarunyandra124@gmail.com`,
                Subject: data.subject,
                Body: data.body,
            }).then(
                (message) => alert(message)
            );
        }


        const payload ={
            to:data.to,
            from:'tarunyandra124@gmail.com',
            subject:data.subject,
            body:data.body,
            date:new Date(),
            image:'',
            name:'Tarun',
            starred:false,
            type:'sent'
        }

        sentEmailService.call(payload)

        if(!sentEmailService.error){
            setOpenDialogBox(false);
            setData({});
        }else{
            
        }
    
        setOpenDialogBox(false);
    };

    const onValueChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
        console.log(data);
    }
    
  return (
    <div>
        <Dialog
        open={openDialogBox}
        PaperProps={{ sx: dialogStyle}}
        
        >
           <Header>
                <Typography>New Message</Typography> 
                <Close fontSize='small'onClick={(e)=>closeComposeMail(e)} style={{cursor:'pointer'}}/>
           </Header>
           <RecipientsWrapper>
                <InputBase placeholder='Recipients'name='to' onChange={(e) => onValueChange(e)}/>
                <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChange(e)}/>
           </RecipientsWrapper>
           <TextField 
                multiline
                rows={20}
                name='body'
                sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
                onChange={(e) => onValueChange(e)}
           />
           <Footer>
            <SendButton onClick={(e) => SendMail(e)}>Send</SendButton>
            <DeleteOutline onClick={() => setOpenDialogBox(false)} style={{cursor:'pointer'}}/>
           </Footer>

          
        </Dialog>
    </div>
  )
}

export default ComposeMail