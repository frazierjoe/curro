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
import { CreateEquipmentModal } from '../../components/CreateEquipmentModal';
import AddIcon from '@material-ui/icons/Add';
import LinearWithValueLabel from "../../components/LinearWithValueLabel"
import Equipment from "../../components/Equipment"

export const EquipmentCard = props => {

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
    console.log('typeof(createdAt) :>> ', typeof(createdAt));
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
                <AddIcon />
              </IconButton>
              
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" width="80%" />
            ) : (
                props.type
              )
          }
        />

        <CardContent className={classes.cardContent}>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" width="90%" style={{ marginBottom: 16 }} />
              <Skeleton animation="wave" height={16} width="70%" />
            </React.Fragment>
          ) : (
            <Box display="block" alignItems="center">
                <Equipment name="Nike Flex" progress="230" capacity="500"/>
                <Equipment name="Nike Flex" progress="230" capacity="500"/>
            </Box>

            
              
            )}
        </CardContent>
      </Card>
      {/* <EditProfileModal data={data} loading={loading} openModal={openModal} handleClose={() => setOpenModal(false)}/> */}
      <CreateEquipmentModal type={props.type} loading={loading} openModal={openModal} handleClose={() => setOpenModal(false)}/>
    </div>);
}