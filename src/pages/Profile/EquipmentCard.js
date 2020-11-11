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
        equipmentList {
          id
          name
          limit {
            value
            unit
          }
          type
          usage {
            value
            unit
          }
        }
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
  const [openModal, setOpenModal] = React.useState(false);
  
  const handleOpen = () => {
    setOpenModal(true);
  };

  const classes = useStyles();

  const { loading, error, data } = useQuery(QUERY_ME);
  var equipmentListRender = [];
  if (!loading) {
    equipmentListRender = (data.me.equipmentList).map((e) => 
      (e.type == props.type ? <Equipment data={e} loading={loading} name={e.name} progress={e.usage.value} capacity={e.limit.value} /> : "")  
    );
  }
  if (error) return (<div>
    <Typography variant="h5" style={{ margin: '16px' }}>ERROR: {error.message}</Typography>
  </div>);
  var titleText = (props.type).toLowerCase() + "s";
  titleText = titleText.charAt(0).toUpperCase() + titleText.slice(1);
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
                titleText
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
                {equipmentListRender}
            </Box>

            
              
            )}
        </CardContent>
      </Card>
      <CreateEquipmentModal type={props.type} loading={loading} openModal={openModal} handleClose={() => setOpenModal(false)}/>
    </div>);
}