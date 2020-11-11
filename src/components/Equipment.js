import React from 'react';
import LinearWithValueLabel from "./LinearWithValueLabel"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import EditEquipmentModal from '../components/EditEquipmentModal';
import { Card, CardHeader, CardContent } from '@material-ui/core';




export default function Equipment(props) {
    const useStyles = makeStyles((theme) => ({
      button: {
        float: "right"
      },
    }))
    const [openModal, setOpenModal] = React.useState(false);
      
    const handleOpen = () => {
      setOpenModal(true);
    };
    const classes = useStyles();
    return (
      <div>
        
         
        <Typography variant="body1" component="span">  
          {props.name}
          <IconButton className={classes.button} aria-label="edit" onClick={handleOpen}>
          <EditIcon fontSize="small"/>
        </IconButton>
        </Typography>
        
        <Typography variant="body1" component="p">  
          {props.progress + " " + (props.data.usage.unit).toLowerCase() + " / " + props.capacity + " " + props.data.limit.unit.toLowerCase()}
        </Typography>
        <LinearWithValueLabel progress={Math.round(100 * parseFloat(props.progress) / parseFloat(props.capacity))}/>
        <EditEquipmentModal data={props.data} openModal={openModal} handleClose={() => setOpenModal(false)}/>
      </div>
    );
}