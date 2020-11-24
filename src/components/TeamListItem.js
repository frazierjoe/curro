import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';

export default function TeamListItem(props) {
    const { history } = props;
    const useStyles = makeStyles((theme) => ({
      button: {
        position: "absolute",
        right: 26,
      },
      profilePicture: {
        cursor: 'pointer',
      },
      profileClick: {
        cursor: 'pointer',
        userSelect: 'none',
        "&:hover": {
          textDecoration: 'underline',
          color: theme.palette.secondary.main,
        },
      }
    }))
    const navigateToTeamPage = () => {
      history.push('/team/'+props.data.id)
    }
    
    const classes = useStyles();

    return (
      <React.Fragment>
        <ListItem style={{paddingBottom: 0}} >
          <ListItemAvatar>
            <Avatar 
            variant="square" 
            className={classes.profilePicture}
            src={props.data.profilePictureURL}
            onClick={navigateToTeamPage}
            />
          </ListItemAvatar>
          <ListItemText 
            primary={<span className={classes.profileClick} onClick={navigateToTeamPage}>{props.data.name}</span>} 
            secondary={props.data.memberCount + " Member" + (props.data.memberCount > 1 ? "s" : "")}
          /> 
        </ListItem>
        
      </React.Fragment>
      
    );
}