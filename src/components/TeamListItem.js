import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';

export default function TeamListItem(props) {
    const { history } = props;
    const useStyles = makeStyles((theme) => ({
      button: {
        position: "absolute",
        right: 26,
      },
      teamClick: {
        cursor: 'pointer',
        userSelect: 'none',
        "&:hover": {
          textDecoration: 'underline',
          color: theme.palette.secondary.main,
        }
      }
    }))
    const navigateToTeamPage = () => {
      // history.push('profile/'+props.data.id)
      console.log("navigate to team page")
    }
    
    const classes = useStyles();

    return (
      <React.Fragment>
        <ListItem style={{paddingBottom: 0}} onClick={navigateToTeamPage} className={classes.teamClick}>
          <Avatar variant="square" src={props.data.profilePictureURL}/>
          <ListItemText primary={props.data.name} /> 
        </ListItem>
        
      </React.Fragment>
      
    );
}