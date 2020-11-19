import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { EditProfileModal } from "../../components/EditProfileModal"
import EditIcon from '@material-ui/icons/Edit';

export const ProfileCard = props => {

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
  }));
  const formatDate = (createdAt) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    var date = new Date(1970,0,1)
    date.setMilliseconds(createdAt)
    return date.toLocaleDateString("en-US", options)
  }
  const [openModal, setOpenModal] = React.useState(false);
  
  const handleOpen = () => {
    setOpenModal(true);
  };

  const classes = useStyles();

  if (props.error) return (<div>
    <Typography variant="h5" style={{ margin: '16px' }}>ERROR: {props.error.message}</Typography>
  </div>);

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            (props.loading || !props.me) ? <></> : (
              <IconButton aria-label="edit" onClick={handleOpen}>
                <EditIcon />
              </IconButton>
              
            )
          }
          title={
            props.loading ? (
              <Skeleton animation="wave" width="80%" />
            ) : (
                props.me ? 
                props.data.me.first + ' ' + props.data.me.last :
                props.data.user.first + ' ' + props.data.user.last
              )
          }
          subheader={props.loading ? <Skeleton animation="wave" width="40%" /> : (props.me ? props.data.me.username : props.data.user.username)}
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
                      alt="User Profile"
                      className={classes.largeAvatar}
                      src={props.me ? props.data.me.profilePictureURL : props.data.user.profilePictureURL}
                    />
                  </Box>
                </Box>
                <Typography variant="body1" component="p">
                  {
                    props.me ? props.data.me.bio : props.data.user.bio
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '16px' }}>
                  {
                    "Member since " + formatDate(props.me ? props.data.me.createdAt : props.data.user.createdAt)
                  }
                </Typography>
              </div>
            )}
        </CardContent>
      </Card>
      {props.me && <EditProfileModal data={props.data} loading={props.loading} openModal={openModal} handleClose={() => setOpenModal(false)}/>}
    </div>);
}