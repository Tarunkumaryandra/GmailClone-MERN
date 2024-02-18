import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/useApi';
import { Checkbox, Box, List, ListItem } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email';
import Nomails from './common/Nomails';
import { EMPTY_TABS } from '../constant/constant';

function Emails() {
  const [selectedEmails, setselectedEmails] = useState([]);
  const [refreshScreen, setRefeshScreen] = useState(false);

  const { openDrawer } = useOutletContext();

  const { type } = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEMailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailService = useApi(API_URLS.deleteEmail);

  useEffect(() => {
    getEmailsService.call({}, type);
  }, [type, refreshScreen]);

  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailsService?.response?.map((email) => email._id);
      setselectedEmails(emails);
    } else {
      setselectedEmails([]);
    }
  };

  const deleteselectedEmails = (e) => {
    if (type === 'bin') {
      deleteEmailService.call(selectedEmails);
    } else {
      moveEMailsToBinService.call(selectedEmails);
    }

    setRefeshScreen((prevState) => !prevState);
  };

  return (
    <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100%-250px' } : { width: 'calc(100%-250px' }}>
      <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' , position:'inherit',paddingTop:'80px'}}>
        <Checkbox size='small' onChange={(e) => selectAllEmails(e)} />
        <DeleteOutline style={{ cursor: 'pointer' }} onClick={(e) => deleteselectedEmails(e)} />
      </Box>
      <List>
        {getEmailsService?.response?.map((email) => (
          <ListItem
            key={email._id}
            style={{
              borderTop: '1px solid #f2f6fc',
              transition: 'box-shadow 0.3s',
              padding:0,
              marginBottom:0

     
             
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0.9,0,0,0.1)';
        
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
      
            }}
          >
            <Email
              email={email}
              selectedEmails={selectedEmails}
              setRefeshScreen={setRefeshScreen}
              setselectedEmails={setselectedEmails}
            />
          </ListItem>
        ))}
      </List>
      {getEmailsService?.response?.length === 0 && <Nomails message={EMPTY_TABS[type]} />}
    </Box>
  );
}

export default Emails;
