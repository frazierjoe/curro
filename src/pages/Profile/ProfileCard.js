import React from 'react';
import { useQuery, gql } from '@apollo/client';
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

  const QUERY_ME = gql`
    query {
      me {
        id
        email
        first
        last
        username
        profilePictureURL
        birthdate
        bio
        private
        createdAt
      }
    }
  `;

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '32px',
    },
    card: {
      maxWidth: 352,
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

  const { loading, error, data } = useQuery(QUERY_ME);

  if (error) return (<div>
    <Typography variant="h5" style={{ margin: '16px' }}>ERROR: {error.message}</Typography>
  </div>);

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            loading ? <></> : (
              <IconButton aria-label="edit" onClick={handleOpen}>
                <EditIcon />
              </IconButton>
              
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" width="80%" />
            ) : (
                data.me.first + ' ' + data.me.last
              )
          }
          subheader={loading ? <Skeleton animation="wave" width="40%" /> : data.me.username}
        />

        <CardContent className={classes.cardContent}>
          {loading ? (
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
                      src={data.me.profilePictureURL}
                    />
                  </Box>
                </Box>
                <Typography variant="body1" component="p">
                  {
                    data.me.bio
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '16px' }}>
                  {
                    "Member since " + formatDate(data.me.createdAt)
                  }
                </Typography>
              </div>
            )}
        </CardContent>
      </Card>
      <EditProfileModal data={data} loading={loading} openModal={openModal} handleClose={() => setOpenModal(false)}/>
    </div>);
}