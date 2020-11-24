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
      minHeight: 112
    },
  }, 
}));

export const TeamSearchTile = (props) => {

  const { history } = props;

  const navigateToTeamProfile = () => {
    history.push('/team/'+props.team.id)
    if(props.handleDrawerClose){
      props.handleDrawerClose()
    }  
  }

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" onClick={navigateToTeamProfile} className={classes.resultItem} divider>
        <ListItemAvatar>
          <Avatar 
            variant="square" 
            alt="Team Logo" 
            src={props.team.profilePictureURL} 
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.team.name}
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