import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import { useMutation, gql } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


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
    overflow: 'scroll',
    overflowX: 'hidden',
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
}));
var _isMounted = false;
export default function EditEquipmentModal(props) {
  // update equipment mutation below
  const UPDATE_EQUIPMENT_MUTATION = gql`
  mutation updateEquipment($input: UpdateEquipmentInput!) {
        updateEquipment(input: $input) {
          id
          name
          type
          limit {
            value
            unit
          }
          usage {
            value
            unit
          }
          active
        }
      }
    `;
  const [updateEquipmentMutation, { loading }] = useMutation(UPDATE_EQUIPMENT_MUTATION, {
    update(_, { data }) {
      props.handleClose();
      console.log(data)

    },
    onError(error) {
      console.log(error)
      console.log(error.message)
    }
  })

  const DELETE_EQUIPMENT_MUTATION = gql`
  mutation deleteEquipment($equipmentId: ID!) {
        deleteEquipment(equipmentId: $equipmentId) {
          message
          success
        }
      }
    `;
  const [deleteEquipmentMutation, { deleteLoading }] = useMutation(DELETE_EQUIPMENT_MUTATION, {
    update(_, { data }) {
      props.handleClose();
      console.log(data)

    },
    onError(error) {
      console.log(error)
      console.log(error.message)
    }
  })
  const classes = useStyles();
  const [state, setState] = React.useState({
    equipmentId: props.data.id,
    name: props.data.name,
    type: props.data.type,
    limit: {
      value: props.data.limit.value,
      unit: props.data.limit.unit
    },
    usage: {
      value: props.data.usage.value,
      unit: props.data.usage.unit
    },
    active: true
  });
  
 const save = () => {
    var nameValid = state.name.length > 0;
    var limitValid = !(isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0);
    
    if (nameValid && limitValid) {
      var userInput = {
        input: {
          equipmentId: props.data.id,
          name: state.name,
          type: state.type,
          limit: {
            value: parseInt(state.limit.value),
            unit: state.limit.unit
          },
          usage: {
            value: parseInt(state.usage.value),
            unit: state.usage.unit
          },
          active: true
        }

      }
      console.log(userInput)
      updateEquipmentMutation({ variables: userInput })
      _isMounted = false
      window.location.reload(true);

    }
  }
  const deleteEq = () => {
    setState({
        equipmentId: props.data.id,
        name: props.data.name,
        type: props.data.type,
        limit: {
            value: props.data.limit.value,
            unit: props.data.limit.unit
        },
        usage: {
            value: props.data.usage.value,
            unit: props.data.usage.unit
        }
    });
    var input = { equipmentId: props.data.id }
    deleteEquipmentMutation({variables: input})
    _isMounted = false
    window.location.reload(true);
  };
  const cancel = () => {
    setState({
        equipmentId: props.data.id,
        name: props.data.name,
        type: props.data.type,
        limit: {
            value: props.data.limit.value,
            unit: props.data.limit.unit
        },
        usage: {
            value: props.data.usage.value,
            unit: props.data.usage.unit
        }
    });
    _isMounted = false
    props.handleClose();
  }

  const handleChange = (prop) => (event) => {
    if (prop == "limitValue") {
      setState({ ...state, limit: {
        value: String(event.target.value),
        unit: state.limit.unit
      }});
    }
    else if (prop == "usageValue") {
        setState({ ...state, usage: {
            value: String(event.target.value),
            unit: state.usage.unit
        }});
    }
    else {
      setState({ ...state, [prop]: String(event.target.value) });
    }
    
  };
  var titleText = (props.data.type).toLowerCase();
  titleText = titleText.charAt(0).toUpperCase() + titleText.slice(1);
  const body = (
    <div className={classes.paper}>
      <Toolbar disableGutters>
        <Button onClick={cancel}>Cancel</Button>
        <IconButton onClick={deleteEq} disabled={deleteLoading}>
                  <DeleteForeverIcon/>
                  {deleteLoading && <CircularProgress size={24}  />}
                </IconButton>
        <Typography variant="h6" className={classes.spacer}>{"Edit " + titleText}</Typography>
        <Button onClick={save} color="primary" disabled={loading}>
          SAVE
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Button>
      </Toolbar>
      <form onSubmit={save}>
        <TextField required id="standard-basic" fullWidth className={classes.textField} value={state.name} onChange={handleChange('name')} label="Name"
          error={state.name.length <= 0}
          helperText={state.name.length <= 0 ? 'Name Required' : ' '}
        />
        <TextField required id="standard-basic" fullWidth className={classes.textField} value={state.usage.value} onChange={handleChange('usageValue')} label="Usage"
          error={isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) < 0}
          helperText={isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0 ? 'Invalid Usage Value' : ' '}
        />
        <TextField required id="standard-basic" fullWidth className={classes.textField} value={state.limit.value} onChange={handleChange('limitValue')} label="Limit"
          error={isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0}
          helperText={isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0 ? 'Invalid Limit Value' : ' '}
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