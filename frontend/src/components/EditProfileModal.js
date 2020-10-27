import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

  
export const EditProfileModal = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        first: "Julio",
        last: "Trujillo",
        username: "julio",
        email: "jtrujillo@wustl.edu" 
    });
    
    const save = () => {
        console.log(state)
        props.handleClose();
    }
    // look at line 97 in newactivitymodal.js
    // currying in javascript
    const handleChangeFirst = (e) => {
        setState({
            first: e.target.value,
            last: state.last,
            username: state.username,
            email: state.email
        })
    }
    const handleChangeLast = (e) => {
        setState({
            first: state.first,
            last: e.target.value,
            username: state.username,
            email: state.email
        })
    }
    const handleChangeUsername = (e) => {
        setState({
            first: state.first,
            last: state.last,
            username: e.target.value,
            email: state.email
        })
    }
    const handleChangeEmail = (e) => {
        setState({
            first: state.first,
            last: state.last,
            username: state.username,
            email: e.target.value
        })
    }
  
    const body = (
      <div className={classes.paper}>
        <h2 id="simple-modal-title" color="primary">Edit Profile</h2>
        <form>
            <TextField id="standard-basic" value={state.first} onChange={handleChangeFirst} label="First Name" />
            <TextField id="standard-basic" value={state.last} onChange={handleChangeLast} label="Last Name" />
            <TextField id="standard-basic" value={state.username} onChange={handleChangeUsername} label="username" />
            <TextField id="standard-basic" value={state.email} onChange={handleChangeEmail} label="email" />

        </form>
        <Button type="submit" value="Submit" onClick={save} color="primary">SAVE</Button>
      </div>
    );
    return (
      <div>
        <Modal
          style={{display:'flex', alignItems:'center', justifyContent:'center'}}
          open={props.openModal}
          onClose={props.handleClose}
          aria-labelledby="simple-modal-tditle"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  }