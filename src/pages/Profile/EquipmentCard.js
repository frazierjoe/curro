import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@material-ui/icons/Add';
import Equipment from "../../components/Equipment"
import List from '@material-ui/core/List';

export const EquipmentCard = props => {

  const QUERY_ME = gql`
    query {
      me {
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
      margin: 16,
    },
    card: {
      margin: 16,
      marginLeft: 0,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 16,
        marginTop: 0,
      },
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
    equipmentList:{
      width: '100%',
    },
  }));
  
  const handleOpenNewEquipment = () => {
    props.setCreateEquipmentType(props.type)
    props.setOpenCreateEquipmentModal(true);
  };

  const classes = useStyles();

  const { loading, error, data } = useQuery(QUERY_ME);
  var equipmentListRender = [];
  var equipmentCount = 0
  if (!loading) {
    equipmentListRender = (data.me.equipmentList).map((e) => 
      ((e.type === props.type) && <Equipment 
        key={e.id} data={e} 
        loading={loading} 
        name={e.name} 
        progress={e.usage.value} 
        capacity={e.limit.value} 
        setOpenEquipmentModal={props.setOpenEquipmentModal} 
        setEditEquipmentData={props.setEditEquipmentData} 
      />)  
    );
    equipmentCount = data.me.equipmentList.filter((e) => e.type === props.type).length;
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
              <IconButton aria-label="edit" onClick={handleOpenNewEquipment}>
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
            <List className={classes.equipmentList}>
                {equipmentCount === 0 ? "No " + titleText + " Added Yet" : equipmentListRender}
            </List>
            )}
        </CardContent>
      </Card>
    </div>);
}