import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useQuery, gql } from '@apollo/client';

// const QUERY_ME = gql`
//   query {
//     me {
//       id
//       email
//       first
//       last
//       profilePictureURL
//       birthdate
//       bio
//       private
//     }
//   }
// `;


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
    // const { loading, error, data } = useQuery(QUERY_ME);
    console.log(props.me)
    const classes = useStyles();
    const [state, setState] = React.useState({
        first: "Julio",
        last: "Trujillo",
        username: "julio",
        email: "jtrujillo@wustl.edu",
        profilePictureURL: ""
    });
    // Standard for validating email addresses
    // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
    var emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:+)\])$/;
    const save = () => {
        var firstValid = state.first.length > 0;
        var lastValid = state.last.length > 0;
        var usernameValid = state.username.length > 0;
        var emailValid = emailRegex.test(state.email);
        if (firstValid && lastValid && usernameValid && emailValid) {
          console.log("api call to update user")
          props.handleClose();
        }
    }
    const cancel = () => {
        console.log("do not update user")
        props.handleClose();
    }

    const handleChange = (prop) => (event) => {
      setState({...state, [prop]: String(event.target.value)});
    };
  
    const body = (
      <div className={classes.paper}>
        <h2 id="simple-modal-title" color="primary">Edit Profile</h2>
        <form onSubmit={save}>
            <TextField required id="standard-basic" value={state.first} onChange={handleChange('first')} label="First Name"
                error={state.first.length <= 0}
                helperText={state.first.length <= 0 ? 'First Name Required' : ' '}
            />
            <TextField required id="standard-basic" value={state.last} onChange={handleChange('last')} label="Last Name" 
                error={state.last.length <= 0}
                helperText={state.last.length <= 0 ? 'Last Name Required' : ' '}
            />
            <TextField required id="standard-basic" value={state.username} onChange={handleChange('username')} label="Username" 
                error={state.username.length <= 0}
                helperText={state.username.length <= 0 ? 'Username Required' : ' '}
            />
            <TextField required id="standard-basic" value={state.email} onChange={handleChange('email')} label="email" 
                error={!emailRegex.test(state.email)}
                helperText={!emailRegex.test(state.email) ? 'Invalid Email' : ' '}
            />
            <TextField id="standard-basic" value={state.profilePictureURL} onChange={handleChange('profilePictureURL')} label="Profile Picture URL" />

        </form>
        <br></br>
        <Button type="submit" value="Submit" onClick={save} color="primary">SAVE</Button>
        <Button onClick={cancel} color="primary">CANCEL</Button>
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