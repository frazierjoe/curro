import React from 'react';
import LinearWithValueLabel from "./LinearWithValueLabel"
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default function TeamListItem(props) {
    const useStyles = makeStyles((theme) => ({
      button: {
        position: "absolute",
        right: 26,
      },
    }))
      
    const handleOpenEditTeam = () => {
      console.log(props.data)
      props.setOpenTeamModal(true)
    };
    
    
    const classes = useStyles();

    return (
      <React.Fragment>
        <ListItem style={{paddingBottom: 0}}>
          <ListItemText primary={props.name} /> 
          {props.edit && <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={handleOpenEditTeam}>
              <EditIcon fontSize="small"/>
            </IconButton>
          </ListItemSecondaryAction>
          }
        </ListItem>
        
      </React.Fragment>
      
    );
}