import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Toolbar from '@material-ui/core/Toolbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  modal: {
    top: 48,
  },
  paper: {
    position: 'absolute',
    width: '40%',
    height: '90%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: '0 8px 8px 8px',
    margin: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: '100%', 
      width: '100%',
      overflow: 'scroll',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '16px 0 0 0',
  },
  spacer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  inputField: {
    marginBottom: 16,
  },

}));

export const ActivityDetail = (props) => {
  const classes = useStyles();
  const deleteActivity = () => {

    // remove activity from activities
    var activityDataCopy = [...props.activityData]
    console.log(props.editActivityId)
    var index = activityDataCopy.findIndex(activity => activity.id === props.editActivityId)
    // var index = activityDataCopy.indexOf(todo)
    if (index !== -1) {
      activityDataCopy.splice(index, 1)
      props.setActivityData(activityDataCopy)
    }
    // close the activity detail modal
    props.handleClose()
  }
  const saveActivity = () => {
   
    // generate a unique ID for the new activity
    var date = new Date();
    var id = date.getTime();

    // add new activity to the activities 
    props.setActivityData(
      [
        ...props.activityData,
        {
        id: id,
        activityId: props.activity.id,
        type: props.activity.type,
        duration: "00:34:23.1",
        distance: {
          value: 9.25,
          unit: "MI"
        },
        equipment: {
          type: "BIKE",
          name: "Red Rocket",
        },
        additionalInfo: {
          averageHeartRate: 62,
          elevationGain: 130,
          calories: 850
        }
      }]
    )
    
    // close the select activity modal
    props.handleCloseSelect()
    // close the activity detail modal
    props.handleClose()

  };

  console.log(props.activity)

  return (
    <div>
      <Modal
        style={{display:'flex', alignItems:'center', justifyContent:'center'}}
        open={props.openModal}
        onClose={props.handleClose}
        disableBackdropClick
        hideBackdrop
      >
      <div style={classes.modalStyle} className={classes.paper}>
        <Toolbar disableGutters>
          {
            props.editActivity ?  
            <Tooltip title="Delete" placement="right" enterDelay={400}>
              <IconButton onClick={deleteActivity}>
                <DeleteForeverIcon/>
              </IconButton>
            </Tooltip> :
            <Tooltip title="Back" placement="right" enterDelay={400}>
              <IconButton onClick={props.handleClose} >
                <ArrowBackIosIcon/>
              </IconButton>
            </Tooltip>
          }
          <Typography variant="h6" className={classes.spacer} >{props.activity.type + " Details"}</Typography>
          <Button onClick={saveActivity} color="secondary">Save</Button>
        </Toolbar>
        { props.activity.durationAllowed ? 
          <TextField 
            type="time" 
            variant="outlined"
            className={classes.inputField}
            fullWidth
          />
          : <></>
        }
        { props.activity.distanceAllowed ? 
          <TextField 
            label="Distance" 
            type="number" 
            inputProps={{
              min: 0.000,
              step: 0.001,
            }}
            variant="outlined"
            className={classes.inputField}
            fullWidth
          />
          : <></>
        }
        { props.activity.equipmentAllowed ? 
          <TextField label="Equipment" 
            fullWidth
            variant="outlined"
            className={classes.inputField}
          />
          : <></>
        }
        { props.activity.additionalInfoAllowed ? 
          <TextField 
            label="Additional Information" 
            variant="outlined"
            className={classes.inputField}
            fullWidth
          />
          : <></>
        }
      </div>
      
      </Modal>
    </div>
  );
}
