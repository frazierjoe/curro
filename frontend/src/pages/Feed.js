import React, { useState }  from 'react';
import Typography from '@material-ui/core/Typography';
import { NewActivityModal } from '../components/NewActivityModal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  
}));
export const Feed = () => {

  const [openModal, setOpenModal] = useState(false)
  const classes = useStyles();

  return (
  <div>
    <Typography variant="h4">Feed</Typography>
    <Button onClick={() => setOpenModal(true)} color="primary">POST</Button>
    
    <NewActivityModal openModal={openModal} handleClose={() => setOpenModal(false)}/>
  </div>);
}