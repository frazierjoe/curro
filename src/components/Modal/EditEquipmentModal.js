import React from 'react';
import { ConfirmDelete } from './ConfirmDelete';
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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { UPDATE_EQUIPMENT_MUTATION, ME_QUERY } from '../../utils/graphql';

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
    }
  },
  distanceField: {
    flexGrow: 1,
  },
}));

var _editDataMounted = false;
var _previousId = "";

export default function EditEquipmentModal(props) {
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);

  const handleConfirmDeleteOpen = () => {
    setOpenConfirmDelete(true);
  };

  const handleConfirmDeleteClose = () => {
    setOpenConfirmDelete(false);
  };

  const [updateEquipmentMutation, { loading }] = useMutation(UPDATE_EQUIPMENT_MUTATION, {
    update(store, { data: {updateEquipment} }) {

      const data = store.readQuery({
        query: ME_QUERY
      })

      const updatedEquipmentList = data.me.equipmentList.map((equipment) => {
        if(equipment.id === props.data.id){
          return updateEquipment
        }
        return equipment
      })
      
      store.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            ...data.me,
            __typename: "User",
            equipmentList: updatedEquipmentList
          }
        }
      })
      props.handleClose();

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
    update(store, { data: {deleteEquipment} }) {

      const data = store.readQuery({
        query: ME_QUERY
      })

      const updatedEquipmentList = data.me.equipmentList.filter((equipment) => {
        if(equipment.id !== props.data.id){
          return equipment
        }
      })
      
      store.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            ...data.me,
            __typename: "User",
            equipmentList: updatedEquipmentList
          }
        }
      })

      props.handleClose();
    },
    onError(error) {
      console.log(error)
      console.log(error.message)
    }
  })

  const classes = useStyles();

  const [state, setState] = React.useState({
    equipmentId: props.data.id,
    ...props.data
  });

  if((!_editDataMounted && props.data.id) || (_previousId !== props.data.id)){
    _editDataMounted = true
    _previousId = props.data.id
    setState({
      equipmentId: props.data.id,
      ...props.data
    });
  }

 const save = () => {
    var nameValid = state.name.length > 0;
    var limitValid = !(isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0);
    var usageValid = !(isNaN(parseInt(state.usage.value)) || parseInt(state.usage.value) < 0);

    if (nameValid && limitValid && usageValid) {
      var userInput = {
        input: {
          equipmentId: props.data.id,
          name: state.name,
          type: state.type,
          limit: {
            value: parseInt(state.limit.value),
            unit: state.limit.unit
          },
          active: props.data.active
        }

      }

      updateEquipmentMutation({ variables: userInput })
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
        active: props.data.active
    });
    var input = { equipmentId: props.data.id }
    deleteEquipmentMutation({variables: input})
    handleConfirmDeleteClose()
  };
  const cancel = () => {
    setState({
        equipmentId: "",
        name: "",
        type: "",
        limit: {
            value: "",
            unit: "MI"
        },
        active: ""
    });
    props.handleClose();
  }

  const handleChange = (prop) => (event) => {
    if (prop === "limitValue") {
      setState({ ...state, limit: {
        value: String(event.target.value),
        unit: state.limit.unit
      }});
    }
    else if (prop === "unit") {
      setState({ ...state, 
        limit: {
          value: state.limit.value,
          unit: String(event.target.value)
        }
      });
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
        <IconButton onClick={handleConfirmDeleteOpen} disabled={deleteLoading}>
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
        <TextField 
          required id="standard-basic" 
          variant="outlined"
          fullWidth 
          className={classes.textField} 
          value={state.name} 
          onChange={handleChange('name')} 
          label="Name"
          error={state.name.length <= 0}
          helperText={state.name.length <= 0 ? 'Name Required' : ' '}
        />
          <div className={classes.distanceField}>
            <Grid container spacing={1}>
              <Grid item xs>
                <TextField 
                  label="Limit" 
                  type="number" 
                  inputProps={{
                    min: 0.000,
                    step: 0.001,
                  }}
                  variant="outlined"
                  value={state.limit.value} 
                  onChange={handleChange('limitValue')}
                  error={isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0}
                  helperText={isNaN(parseInt(state.limit.value)) || parseInt(state.limit.value) <= 0 ? 'Invalid Limit Value' : ' '}
                  className={classes.textField}
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <FormControl variant="outlined" className={classes.textField} fullWidth>
                  <InputLabel id="distance-unit-select">Unit</InputLabel>
                  <Select
                    labelId="distance-unit-select"
                    id="distance-unit-select-id"
                    value={state.limit.unit}
                    onChange={handleChange("unit")}
                    label="Distance"
                  >
                    <MenuItem value={"MI"}>mi</MenuItem>
                    <MenuItem value={"KM"}>km</MenuItem>
                    <MenuItem value={"M"}>m</MenuItem>
                    <MenuItem value={"YDS"}>yds</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        
      </form>
      <ConfirmDelete
        open={openConfirmDelete}
        handleClose={handleConfirmDeleteClose}
        action={deleteEq}
        actionLabel={"Delete"}
        title={"Delete " + titleText + "?"}
        description={"Are you sure you wish to delete " + state.name + ". This can not be undone."}
      />
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