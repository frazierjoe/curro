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

export const TeamSearchTile = (props) => {

  const { history } = props;

  const navigateToTeamProfile = () => {
    history.push('team/'+props.team.id)
  }

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.resultItem} divider>
        <ListItemAvatar>
          <Avatar 
            variant="square" 
            alt="Team Logo" 
            src={props.team.profilePictureURL} 
            className={classes.profilePicture} 
            onClick={navigateToTeamProfile}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<span className={classes.profileClick} onClick={navigateToTeamProfile}>{props.team.name}</span>}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.team.memberCount + " Member" + (props.team.memberCount > 1 ? "s" : "")}
              </Typography>
              {props.team.description && (" — " + props.team.description)}
            </React.Fragment>
          }
        />
      </ListItem>);
}