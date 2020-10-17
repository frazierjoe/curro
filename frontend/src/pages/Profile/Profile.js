import React from 'react';
import { ProfileCard } from './ProfileCard';
import { makeStyles } from '@material-ui/core/styles';

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
    </div>);
}