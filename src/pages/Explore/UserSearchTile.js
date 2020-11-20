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
}));


export const UserSearchTile = (props) => {

  const { history } = props;

  const navigateToUserProfile = () => {
    history.push('profile/'+props.user.id)
  }

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.resultItem} divider>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src={props.user.profilePictureURL} className={classes.profilePicture} onClick={navigateToUserProfile}/>
        </ListItemAvatar>
        <ListItemText
          primary={<span className={classes.profileClick} onClick={navigateToUserProfile}>{props.user.first + ' ' + props.user.last}</span>}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <span className={classes.profileClick} onClick={navigateToUserProfile}>{props.user.username}</span>
              </Typography>
              {props.user.bio && (" — " + props.user.bio)}
            </React.Fragment>
          }
        />
      </ListItem>);
}