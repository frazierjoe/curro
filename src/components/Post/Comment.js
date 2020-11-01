import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


export const Comment = props => {

  const useStyles = makeStyles((theme) => ({
    comment: {
      
    },
   
  }));



  const formatDate = (createdAt) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    var date = new Date(1970,0,1)
    date.setMilliseconds(createdAt)
 
    return date.toLocaleDateString("en-US", options)
  }
  
  const classes = useStyles();

  // console.log(props.comment)

  return (
    <div className={classes.comment}>
      <Typography>Comment</Typography>
    </div>);
}