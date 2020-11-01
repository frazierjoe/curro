import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';


export const AllCaughtUp = props => {

  const [seenCheckMark, setSeenCheckMark] = useState(false)

  const useStyles = makeStyles((theme) => ({
    main: {
      width: '100%',
      alignContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
    },
    line: {
      width: '100%',
      height: 1,
      borderBottom: '1px solid black',
      display: 'block',
    },
    grid: {
      flex: 1,
    },
    
   
  }));

  
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container className={classes.grid} direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={5}>
          <Fade in={seenCheckMark} timeout={{ enter: 500}}>
            <span className={classes.line}/>
          </Fade>
        </Grid>
        <Grid item >
            <Fade in={seenCheckMark} timeout={{ enter: 2000}}>
              <DoneIcon color="primary"/>
            </Fade>
        </Grid>
        <Grid item  xs={5}>
          <Fade in={seenCheckMark} timeout={{ enter: 500}}>
            <span className={classes.line}/>
          </Fade>
        </Grid>
      </Grid>
      <Typography variant="body2">You're All Caught Up</Typography>
      <Waypoint onEnter={() => setSeenCheckMark(true)} onLeave={() => setSeenCheckMark(false)}>            
        <Typography variant="body2" color={"textSecondary"}>You've Seen All New Posts</Typography>
      </Waypoint>
    </div>
    );
}