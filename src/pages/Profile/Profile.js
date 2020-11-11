import React from 'react';
import { ProfileCard } from './ProfileCard';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader} from '@material-ui/core';
import UserStats from './Stats/UserStats';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '32px',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  profileWrapper: {
    maxWidth: '1080px',
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }

}));


export const Profile = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.profileWrapper}>
        <ProfileCard/>
        <UserStats/>
      </div>
    </div>);
}

/*
enum AllowedActivity {
  RUN
  BIKE
  SWIM
  SLEEP
  CLIMB
  ALTERG
  YOGA
  AQUA_JOG
  HIKE
} 
*/