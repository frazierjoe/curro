import React from 'react';
import { ProfileCard } from './ProfileCard';
import { EquipmentCard } from './EquipmentCard';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '32px',
  },
}));


export const Profile = () => {

  const classes = useStyles();

  return (
    <div>
      <ProfileCard/>
      <EquipmentCard type="SHOE"/>
      <EquipmentCard type="BIKE"/>
      
    </div>
    
    
  );
    
}