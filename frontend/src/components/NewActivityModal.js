import 'date-fns';
import React from 'react';
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  modal: {
    top: 48,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2, 2, 2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '16px 0 0 0'
  },
}));

export const NewActivityModal = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  

  return (
    <div>
      <Modal
        style={{display:'flex', alignItems:'center', justifyContent:'center'}}
        open={props.openModal}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={classes.modalStyle} className={classes.paper}>
        <Typography variant="h4">Create New Post</Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" className={classes.textField} label="Title" fullWidth/>
          <TextField id="standard-basic" className={classes.textField} label="Note" fullWidth/>
          <TextField id="standard-basic" className={classes.textField} label="Standard" fullWidth/>
          <TextField id="standard-basic" className={classes.textField} label="Standard" fullWidth/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          </MuiPickersUtilsProvider>
        </form>
        <p>Hello World!</p>
        <Button onClick={() => postActivity(props.handleClose)} color="primary">POST</Button>
      </div>
      
      </Modal>
    </div>
  );
}

function postActivity(callback) {
    callback()
    console.log("make API call here")
    // TODO print contents of form
    // TODO validate form
    // TODO Make api call <----


}