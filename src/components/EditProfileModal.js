import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useMutation, gql } from '@apollo/client';


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
var _isMounted = false;
export const EditProfileModal = (props) => {
  const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          id
          email
          first
          last
          bio
          profilePictureURL
          
        }
      }
    `;
  const [updateUserMutation, { loading, error, data }] = useMutation(UPDATE_USER_MUTATION, {
    update(cache, { data: { updateUser: user } }) {
      props.handleClose();

    },
    onError(error) {
      console.log(error)
      console.log(error.message)
    }
  })

  const classes = useStyles();
  const [state, setState] = React.useState({
    first: "",
    last: "",
    username: "",
    email: "",
    bio: "",
    profilePictureURL: ""
  });
  if (!props.loading && props.data.me && !_isMounted) {
    _isMounted = true;
    setState({
      first: props.data.me.first,
      last: props.data.me.last,
      username: props.data.me.username,
      email: props.data.me.email,
      bio: props.data.me.bio,
      profilePictureURL: props.data.me.profilePictureURL
    });
  }
  // Standard for validating email addresses
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  var emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:+)\])$/;
  const save = () => {
    var firstValid = state.first.length > 0;
    var lastValid = state.last.length > 0;
    var usernameValid = state.username.length > 0;
    var emailValid = emailRegex.test(state.email);
    if (firstValid && lastValid && usernameValid && emailValid) {
      var userInput = {
        input: {
          userId: props.data.me.id,
          first: state.first,
          last: state.last,
          username: state.username,
          bio: state.bio,
          profilePictureURL: state.profilePictureURL
        }

      }
      
      console.log(userInput)

      updateUserMutation({ variables: userInput })
      window.location.reload(true);

    }
  }
  const cancel = () => {
    console.log("do not update user")
    props.handleClose();
  }

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: String(event.target.value) });
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" color="primary">Edit Profile</h2>
      <form onSubmit={save}>
        <TextField required id="standard-basic" fullWidth value={state.first} onChange={handleChange('first')} label="First Name"
          error={state.first.length <= 0}
          helperText={state.first.length <= 0 ? 'First Name Required' : ' '}
        />
        <TextField required id="standard-basic" fullWidth value={state.last} onChange={handleChange('last')} label="Last Name"
          error={state.last.length <= 0}
          helperText={state.last.length <= 0 ? 'Last Name Required' : ' '}
        />
        <TextField required id="standard-basic" fullWidth value={state.username} onChange={handleChange('username')} label="Username"
          error={state.username.length <= 0}
          helperText={state.username.length <= 0 ? 'Username Required' : ' '}
        />
        <TextField required id="standard-basic" fullWidth value={state.email} onChange={handleChange('email')} label="email"
          error={!emailRegex.test(state.email)}
          helperText={!emailRegex.test(state.email) ? 'Invalid Email' : ' '}
        />
        <TextField id="standard-basic" fullWidth value={state.profilePictureURL} onChange={handleChange('profilePictureURL')} label="Profile Picture URL" 
          helperText={' '}
        />
        <TextField id="standard-basic" fullWidth value={state.bio} multiline={true} rowsMax={3} onChange={handleChange('bio')} label="Bio" />
      </form>
      <br></br>
      <Button type="submit" value="Submit" onClick={save} color="primary">SAVE</Button>
      <Button onClick={cancel} color="primary">CANCEL</Button>
    </div>
  );
  return (
    <div>
      <Modal
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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