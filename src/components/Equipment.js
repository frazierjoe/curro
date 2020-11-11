import React from 'react';
import LinearWithValueLabel from "./LinearWithValueLabel"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import EditEquipmentModal from '../components/EditEquipmentModal';




export default function Equipment(props) {
    const useStyles = makeStyles((theme) => ({
      button: {
        marginLeft: theme.spacing(10),
      },
    }))
    const [openModal, setOpenModal] = React.useState(false);
      
    const handleOpen = () => {
      setOpenModal(true);
    };
    const classes = useStyles();
    return (
      <div>
        <Typography variant="body1" component="p">  
          {props.name + " - " + props.progress + " " + (props.data.usage.unit).toLowerCase() + " / " + props.capacity + " " + props.data.limit.unit.toLowerCase()}
          <IconButton className={classes.button} aria-label="edit" onClick={handleOpen}>
              <EditIcon fontSize="small"/>
          </IconButton>
        </Typography>
        
          
        
        <LinearWithValueLabel progress={Math.round(100 * parseFloat(props.progress) / parseFloat(props.capacity))}/>
        <EditEquipmentModal data={props.data} openModal={openModal} handleClose={() => setOpenModal(false)}/>
      </div>
    );
}