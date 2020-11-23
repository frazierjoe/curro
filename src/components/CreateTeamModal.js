import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import { useMutation, gql } from '@apollo/client';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { CREATE_TEAM_MUTATION, ME_QUERY } from '../utils/graphql';


const useStyles = makeStyles((theme) => ({
  modal: {
    top: 48,
  },
  paper: {
    position: 'absolute',
    width: '40%',
    height: '98%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: '0 16px 16px 16px',
    margin: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: '100%', 
      width: '100%',
    },
  },
  spacer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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
  distanceField: {
    flexGrow: 1,
  }
}));
export const CreateTeamModal = (props) => {

  const [createTeamMutation, { loading, error, data }] = useMutation(CREATE_TEAM_MUTATION, {
    update(store, { data: { createTeam } }) {
    //   console.log("Before")
      const data = store.readQuery({
        query: ME_QUERY
      })
      console.log(data)
      const updatedTeamList = [createTeam, ...data.me.teamList]
      console.log(updatedTeamList)

      store.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            ...data.me,
            // __typename: "User",
            teamList: updatedTeamList
          }
        }
      })
    //   props.handleClose();
      
    },
    onError(error) {
      console.log(error)
      console.log(error.message)
    }
  })

  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    description: "",
    profilePictureURL: ""
  });
  
 const save = () => {
    var nameValid = state.name.length > 0;
    
    if (nameValid) {
      var userInput = {
        input: {
          name: state.name,
          description: state.description,
          profilePictureURL: state.profilePictureURL
        }

      }
      console.log(userInput)
      createTeamMutation({ variables: userInput })

    }
  }
  const cancel = () => {
    setState({
        name: "",
        description: "",
        profilePictureURL: ""
    });
    props.handleClose();
  }

  const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: String(event.target.value) });
  };
  const body = (
    <div className={classes.paper}>
      <Toolbar disableGutters>
        <Button onClick={cancel}>Cancel</Button>
        <Typography variant="h6" className={classes.spacer}>{"Create a Team"}</Typography>
        <Button onClick={save} color="primary" disabled={loading}>
          SAVE
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Button>
      </Toolbar>
      <form onSubmit={save}>
        <TextField 
          required 
          id="standard-basic" 
          variant="outlined"
          fullWidth 
          className={classes.textField} 
          value={state.name} 
          onChange={handleChange("name")} 
          label="Name"
          error={state.name.length <= 0}
          helperText={state.name.length <= 0 ? 'Name Required' : ' '}
        />
        <TextField 
          required 
          id="standard-basic" 
          variant="outlined"
          fullWidth 
          className={classes.textField} 
          value={state.description} 
          onChange={handleChange("description")} 
          label="Description"
          multiline={true}
          rowsMax={5}
          rows={3}
        />
        <TextField 
          required 
          id="standard-basic" 
          variant="outlined"
          fullWidth 
          className={classes.textField} 
          value={state.profilePictureURL} 
          onChange={handleChange("profilePictureURL")} 
          label="Team Picture URL"
        />
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className={classes.modal}
        open={props.openModal}
        onClose={props.handleClose}
        disableBackdropClick
        aria-labelledby="simple-modal-tditle"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}