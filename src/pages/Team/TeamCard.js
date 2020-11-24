import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';


export const TeamCard = props => {

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '32px',
    },
    card: {
      margin: theme.spacing(2),
    },
    cardContent: {
      paddingTop: '0px'
    },
    largeAvatar: {
      width: '128px',
      height: '128px',
    },
    media: {
      height: 190,
    },
    countBox: {
      backgroundColor: theme.palette.background.main,
      textAlign: 'center',
      marginBottom: 8,
    },
    requestButton: {
      marginBottom: 16,
    }
  }));

  const [joined, setJoined] = useState(false);
  // TODO for when we hook up requests
  // const [requestPending, setRequestPending] = useState(false);

  const formatDate = (createdAt) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    var date = new Date(1970,0,1)
    date.setMilliseconds(createdAt)
    return date.toLocaleDateString("en-US", options)
  }
  
  const requestTeam = () => {
    if(joined){
      console.log("TODO API call for Leaving Team :(")
      setJoined(false)
    } else {
      console.log("TODO API call for Sending Request to join team")
      setJoined(true)
    }
  }

  const classes = useStyles();

  if (props.error) return (<div>
    <Typography variant="h5" style={{ margin: '16px' }}>ERROR: {props.error.message}</Typography>
  </div>);

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          title={
            props.loading ? (
              <Skeleton animation="wave" width="80%" />
            ) : props.data.team.name
          }
          subheader="Team"
        />

        <CardContent className={classes.cardContent}>
          {props.loading ? (
            <React.Fragment>
              <Box display="flex" style={{ marginBottom: '16px' }}>
                <Box m="auto">
                  <Skeleton animation="wave" variant="circle" width={128} height={128} />
                </Box>
              </Box>
              <Skeleton animation="wave" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" width="90%" style={{ marginBottom: 16 }} />
              <Skeleton animation="wave" height={16} width="70%" />
            </React.Fragment>
          ) : (
              <div>
                <Box display="flex" style={{ marginBottom: '16px' }}>
                  <Box m="auto">
                    <Avatar
                      variant="square" 
                      alt="Team Logo" 
                      className={classes.largeAvatar}
                      src={props.data.team.profilePictureURL}
                    />
                  </Box>
                </Box>
                <Box className={classes.countBox}>
                  <Typography variant="body1" color="textSecondary" component="p" style={{ marginTop: '16px' }}>
                    {props.data.team.memberCount + " Member" + (props.data.team.memberCount > 1 ? "s" : "")}
                  </Typography>
                </Box>
                {/* TODO Create Team follow button */}
                {/* <Button 
                  variant={(joined || requestPending) ? "outlined" : "contained"} 
                  color="secondary" 
                  size="small" 
                  fullWidth 
                  onClick={requestTeam}
                  disabled={requestPending}
                  className={classes.requestButton}>
                  { requestPending ? "Request Pending" : (joined ? "Leave Team" : "Request To Join")}
                </Button> */}

                <Typography variant="body1" component="p">{props.data.team.description}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '16px' }}>
                  {
                    "Team created " + formatDate(props.data.team.createdAt)
                  }
                </Typography>
              </div>
            )}
        </CardContent>
      </Card>
    </div>);
}