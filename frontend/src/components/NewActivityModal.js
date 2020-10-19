import React, { useState } from 'react';
import { ActivityTile } from './Activity/ActivityTile';
import { ActivityDetail } from './Activity/ActivityDetail';
import { AllowedActivity } from './Activity/AllowedActivity';
import { AddActivityButton } from './Activity/AddActivityButton';
import { makeStyles } from '@material-ui/core/styles';
import { SelectActivity } from './Activity/SelectActivity';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Toolbar from '@material-ui/core/Toolbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
    padding: '0 16px 16px 16px',
    margin: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: '100%', 
      width: '100%',
      overflow: 'scroll',
      overflowX: 'hidden',
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
  gridList: {      
    flexWrap: 'nowrap',
    // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: 'translateZ(0)',
  },
  activityGrid: {
    padding: 0,
    margin: 0,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginLeft: '-8px',
    },
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const NewActivityModal = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [activityData, setActivityData] = React.useState([]);
  const [openSelectActivityModal, setOpenSelectActivityModal] = useState(false)
  const [openActivityDetailModal, setOpenActivityDetailModal] = useState(false)
  const [editActivityTypeIndex, setEditActivityTypeIndex] = useState(0)
  const [editActivityId, setEditActivityId] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState(AllowedActivity[0])
  const [editActivity, setEditActivity] = useState(false)

  const [editActivityValues, setEditActivityValues] = React.useState({
    distanceValue: '',
    distanceUnit: 'mi',
    duration: '',
    equipmentId: '',
    heartRate: '',
    elevationGain: '',
    calories: '',
  });

  const handleEditActivityChange = (prop) => (event) => {
    setEditActivityValues({ ...editActivityValues, [prop]: event.target.value });
  };

  const setEditActivityDefaultValues = () => {
    setEditActivityValues({
      distanceValue: '',
      distanceUnit: 'mi',
      duration: '',
      equipmentId: '',
      heartRate: '',
      elevationGain: '',
      calories: '',
    })
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const clearState = () => {
    setActivityData([])
    setSelectedDate(new Date())
  }
  const cancelPost = () => {
    props.handleClose()
    clearState()
  }
  const postActivity = (callback) => {
    callback()
    console.log("make API call here")
    clearState()
    // TODO print contents of form
    // TODO validate form should have a date and title
    // TODO Make api call <----
}

  return (
    <div>
      <Modal
        style={{display:'flex', alignItems:'center', justifyContent:'center'}}
        open={props.openModal}
        onClose={props.handleClose}
        disableBackdropClick
      >
      <div style={classes.modalStyle} className={classes.paper}>
        <Toolbar disableGutters>
          <Button onClick={cancelPost} >Cancel</Button>
          <Typography variant="h6" className={classes.spacer} >New Post</Typography>
          <Button onClick={() => postActivity(props.handleClose)} color="primary">POST</Button>
        </Toolbar>
        <form noValidate autoComplete="off">
          <TextField className={classes.textField} label="Title" fullWidth variant="outlined" required/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              margin="normal"
              id="date-picker-dialog"
              label="Activity Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.activityGrid}>
            <GridList className={classes.gridList} cols={2.5} >
              {activityData.map((activity) => (
                <GridListTile key={activity.id} style={{boxShadow: 'none'}}>
                    <ActivityTile 
                      activity={activity} 
                      setOpenActivityDetailModal={setOpenActivityDetailModal}
                      setEditActivityTypeIndex={setEditActivityTypeIndex}
                      setEditActivityId={setEditActivityId}
                      setEditActivity={setEditActivity}
                    />
                </GridListTile>
              ))}
              <GridListTile key="add-activity-button">
                <AddActivityButton openSelectActivity={() => setOpenSelectActivityModal(true)}/>
              </GridListTile>
            </GridList>
          </div>
          <TextField className={classes.textField} label="Note" fullWidth multiline rows={7} variant="outlined" />
          {/* TODO add TAG list, look into select -> Multiple Select Chip */}
        </form>
      </div>
      
      </Modal>
      <SelectActivity 
        openModal={openSelectActivityModal} 
        handleClose={() => setOpenSelectActivityModal(false)} 
        setActivityData={setActivityData}
        activityData={activityData} 
        setSelectedActivity={setSelectedActivity}
        setOpenActivityDetailModal={setOpenActivityDetailModal}
        setEditActivity={setEditActivity}
      />
      <ActivityDetail 
        activityData={activityData}
        setActivityData={setActivityData}
        activity={selectedActivity} 
        openModal={openActivityDetailModal} 
        handleClose={() => setOpenActivityDetailModal(false)}
        editActivity={editActivity}
        editActivityId={editActivityId}
        handleCloseSelect={() => setOpenSelectActivityModal(false)}
        handleEditActivityChange={handleEditActivityChange}
        editActivityValues={editActivityValues}
        setEditActivityDefaultValues={setEditActivityDefaultValues}
      />
    </div>
  );
}