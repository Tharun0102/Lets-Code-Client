import React from 'react';
import emptyBoxIcon from './empty-box.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './style.scss';

const EmptyBox = ({type}) => {
  return(
    <Box className="empty-box-container">
      <img className="empty-box-icon" src={emptyBoxIcon} alt="empty-box-icon"/>
      <Typography className="noData-text">No {type}s to display,try adding one!</Typography>
    </Box>
  )
} 
export default EmptyBox;