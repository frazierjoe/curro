import React from 'react';
import LinearWithValueLabel from "./LinearWithValueLabel"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(10),
  },
}))


export default function Equipment(props) {
    const classes = useStyles();
    return (
      <div>
        <Typography variant="body1" component="p">  
          {props.name + " - " + props.progress + " mi / " + props.capacity + " mi"}
          <IconButton className={classes.button} aria-label="edit">
              <EditIcon fontSize="small"/>
          </IconButton>
        </Typography>
        
          
        
        <LinearWithValueLabel progress={Math.round(100 * parseFloat(props.progress) / parseFloat(props.capacity))}/>
        
      </div>
    );
}