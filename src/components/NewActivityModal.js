import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { ActivityTile } from './Activity/ActivityTile';
import { ActivityDetail } from './Activity/ActivityDetail';
import { AllowedActivity } from './Activity/AllowedActivity';
import { AddActivityButton } from './Activity/AddActivityButton';
import { makeStyles } from '@material-ui/core/styles';
import { SelectActivity } from './Activity/SelectActivity';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Toolbar from '@material-ui/core/Toolbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    overflow: 'scroll',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: '100%', 
      width: '100%',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '16px 0 0 0',
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  spacer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  gridList: {      
    flexWrap: 'nowrap',
  },
  activityGrid: {
    padding: 0,
    margin: '16px 0 0 0',
    width: '100%',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const NewActivityModal = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [activityData, setActivityData] = React.useState([]);
  const [openSelectActivityModal, setOpenSelectActivityModal] = useState(false)
  const [openActivityDetailModal, setOpenActivityDetailModal] = useState(false)
  const [editActivityId, setEditActivityId] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState(AllowedActivity[0])
  const [editActivity, setEditActivity] = useState(false)

  const [post, setPost] = React.useState({
    title: '',
    note: '',
    titleError: false,
    dateError: false,
    titleErrorMessage: '',
    dateErrorMessage: '',
    errorMessage: ''
  });

  const handlePostChange = (prop) => (event) => {

    if(prop ==='title'){

      if(post.titleError && event.target.value.length > 0){
        setPost({...post, titleError: false, [prop]: String(event.target.value)})
        return
      } 
    } 
    setPost({ ...post, [prop]: String(event.target.value) });
    
  };

  const defaultActivityValues = {
    distanceValue: '',
    distanceUnit: 'mi',
    duration: '',
    durationMs: 0,
    equipmentId: '',
    heartRate: '',
    elevationGain: '',
    calories: '',
  }

  const [editActivityValues, setEditActivityValues] = React.useState(defaultActivityValues);

  const handleEditActivityChange = (prop) => (event) => {
    if(prop === 'duration'){
      var onlyNumbersRegex = /[^\.\d\:]/g
      event.target.value = event.target.value.replace(onlyNumbersRegex, '')
    }
    setEditActivityValues({ ...editActivityValues, [prop]: event.target.value });
    
  };

  const setEditActivityDefaultValues = () => {
    setEditActivityValues(defaultActivityValues)
  }

  const handleDateChange = (date) => {
    if(date !== null){
      setPost({ ...post, 
        dateError: false,
      });
    }
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

  const CREATE_POST_MUTATION = gql`
    mutation createPost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
      }
    }
  `;

  const [createPostMutation, {loading, error, data }] = useMutation(CREATE_POST_MUTATION, {
    update(_, {data: {createPost: post}}) {
      console.log(post)
      // TODO clear state
      props.handleClose()
    },
    onError(error) {
      console.log(error)
      console.log(error.message)
      // TODO, don't close and tell user what happened
      props.handleClose()
    }
  })

  const validatePost = (callback) => {
    console.log("Checking Form")
    console.log(post.title)
    console.log(post.note)
    var postDate = selectedDate.toISOString()
    console.log(postDate)
    console.log(new Date(postDate))

    const postTitleValid = post.title.length > 0
    const selectedDateValid = selectedDate !== null

    var titleErrorMessage = 'Title is required'
    var dateErrorMessage = 'Date is required'

    setPost({ ...post, 
      titleError: !postTitleValid, titleErrorMessage: titleErrorMessage,
      dateError: !selectedDateValid, titleErrorMessage: dateErrorMessage
    });

    if(postTitleValid && selectedDateValid) {
      callback()
    } 
  }
  const postActivity = () => {
    validatePost(() => {
      console.log("make API call here")
      // TODO map this to activity list
      console.log(activityData)

      var activityList = activityData.map((activity)=>{
        var formatActivity = {
          type: activity.type,
          duration: activity.duration,
          distance: {
            value: parseFloat(activity.distance.value),
            unit: activity.distance.unit
          },
          equipmentId: activity.equipmentId === "" ? undefined : activity.equipmentId,
          additionalInfo: {
            averageHeartRate: activity.averageHeartRate,
            elevationGain: activity.elevationGain,
            calories: activity.calories
          }
        }
        return formatActivity
      })

      //  "type": "RUN",
      // "duration": 3060000,
    	// "distance": {"value": 10.4, "unit": "KM"},
    	// "equipmentId": null,
      // "additionalInfo": {
      //   "averageHeartRate": null,
      //   "elevationGain": null,
      //   "calories": null
			// }

      console.log(activityList)
      const postInput = {
        input: {
          title: post.title,
          activityList: activityList,
          note: post.note,
          postDate: selectedDate.toISOString(),
          // TODO change this to tagList of users
          tagIdList: []  
        }
      }
      console.log(postInput)
      createPostMutation({ variables: postInput })
    })
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
          <Button onClick={postActivity} color="primary" disabled={loading}>POST</Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Toolbar>
        <form noValidate autoComplete="off">
          <TextField 
            className={classes.textField} 
            value={post.title} 
            onChange={handlePostChange('title')} 
            helperText={post.titleError ? post.titleErrorMessage : ''}
            error={post.titleError}
            label="Title" 
            fullWidth 
            variant="outlined" 
            required
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              required
              className={classes.textField}
              margin="normal"
              id="date-picker-dialog"
              label="Activity Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              helperText={post.dateError ? post.dateErrorMessage : ''}
              error={post.dateError}
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
                      edit={true}
                      setOpenActivityDetailModal={setOpenActivityDetailModal}
                      setEditActivityId={setEditActivityId}
                      setEditActivity={setEditActivity}
                      setEditActivityValues={setEditActivityValues}
                      setSelectedActivity={setSelectedActivity}
                    />
                </GridListTile>
              ))}
              <GridListTile key="add-activity-button">
                <AddActivityButton openSelectActivity={() => setOpenSelectActivityModal(true)}/>
              </GridListTile>
            </GridList>
          </div>
          <TextField className={classes.textField} label="Note" value={post.note} onChange={handlePostChange('note')} fullWidth multiline rows={7} variant="outlined" />
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