import React from 'react';
import { ActivityTile } from '../Activity/ActivityTile';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';



export const AllCaughtUp = props => {

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
          <span className={classes.line}/>
        </Grid>
        <Grid item >
          <Fade in={true} timeout={{ enter: 2000}}>
            <DoneIcon color="primary"/>
          </Fade>
        </Grid>
        <Grid item  xs={5}>
          <span className={classes.line}/>
        </Grid>
      </Grid>
      <Typography variant="body2">You're All Caught Up</Typography>
      <Typography variant="body2" color={"textSecondary"}>You've Seen All New Posts</Typography>
    </div>

    );
}