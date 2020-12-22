import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  resultItem: {
    backgroundColor: "#ffffff",
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: '#fafafa',
    },
    minHeight: 94,
    [theme.breakpoints.down('sm')]: {
      minHeight: 134
    },
  }, 
}));


export const NotificationTile = (props) => {

  const { history } = props;


  const navigateToUserProfile = () => {
    history.push('/profile/'+props.user.id)
    if(props.handleDrawerClose){
      props.handleDrawerClose()
    }
  }
  const navigateToTeamProfile = () => {
    history.push('/team/'+props.team.id)
    if(props.handleDrawerClose){
      props.handleDrawerClose()
    }  
  }
  // TODO check if team or profile and 
  const navigateToProfile = () => {
      if(props.team){
          navigateToTeamProfile()
      } else {
          navigateToUserProfile()
      }

  }     

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.resultItem} onClick={navigateToProfile} divider>
        <ListItemAvatar>
          <Avatar 
            alt="Profile Picture" 
            variant= {props.notification.team ? "square" : "circle"} 
            src={props.notification.team ? props.notification.team.profilePictureURL : props.notification.sender.profilePictureURL}
           />
        </ListItemAvatar>
        <ListItemText
          primary={props.notification.team ? props.notification.team.name : props.notification.sender.first + " " + props.notification.sender.last}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.notification.message}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>);
}
