import React from 'react'
import { Box, Typography, Checkbox, styled } from '@mui/material'
import { Star,StarBorder } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {routes} from '../routes/routes'
import useApi from '../hooks/useApi'
import { API_URLS } from '../services/api.urls'

const Wrapper = styled(Box)({
    width: '99%',
    padding: '0 0 0 10px',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
        background: '#f2f6fc',
    },
    '& > div': {
        display: 'flex',
        width: "100%",
        '& > p': {
            fontSize: 14
        }
    }

})

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6

})

const Date = styled(Typography)({
    marginLeft: 'auto',
    fontSize: 12,
    color: '#5F6368',
    marginRight: 20, // You can adjust this margin if needed
})

function Email({ email, selectedEmails,setRefeshScreen,setselectedEmails }) {

    const navigate = useNavigate();

    const toggleStarredService =useApi(API_URLS.toggleStarredEmail);

    const toggleStarredMails = () =>{
        toggleStarredService.call({ id: email._id,value: !email.starred})
        setRefeshScreen(prevState => !prevState);
    }

    const onValueChange = () =>{
        if (selectedEmails.includes(email._id)){
            setselectedEmails(prevState => prevState.filter(id => id != email._id));

        }else{
            setselectedEmails(prevState => [... prevState,email._id]);
        }
    }
    return (
        <Wrapper>
            <Checkbox
                size='small'
                checked={selectedEmails.includes(email._id)}
                onChange={()=>onValueChange()}
            />
            {
                email.starred?
                <Star fontSize="small" style={{marginRight:10,color:'#f7cb4e'}} onClick={() => toggleStarredMails()} />
                :
                <StarBorder fontSize="small" style={{marginRight:10}} onClick={() => toggleStarredMails()} />
            }
            {/* <StarBorder fontSize='small' style={{ marginRight: '10px' }}  onClick={()=>toggleStarredMails()} /> */}
            <Box onClick={()=> navigate(routes.view.path, { state: { email:email }}) }>
                <Typography style={{ width: 200, overflow: 'hidden' }}>{email.name}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography style={{ marginRight: 0, width: 830, overflow: 'hidden', maxHeight: 20, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {email.subject} {email.body && '-'} {email.body}
                </Typography>
                <Date>
                    {(new window.Date(email.date)).getDate()}
                    {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                </Date>
            </Box>
        </Wrapper>
    )
}

export default Email
