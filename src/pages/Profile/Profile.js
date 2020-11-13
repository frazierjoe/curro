import React from 'react';
import { ProfileCard } from './ProfileCard';
import { EquipmentCard } from './EquipmentCard';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EditEquipmentModal from '../../components/EditEquipmentModal';
import { CreateEquipmentModal } from '../../components/CreateEquipmentModal';


export const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '32px',
    },
  }));

  const defaultEquipmentData = {
    name: "",
    type: "",
    usage: {
      value: 0,
      unit: "MI"
    },
    limit: {
      value: 0,
      unit: "MI"
    },
  }

  const [openEquipmentModal, setOpenEquipmentModal] = React.useState(false);
  const [editEquipmentData, setEditEquipmentData] = React.useState(defaultEquipmentData);

  const [openCreateEquipmentModal, setOpenCreateEquipmentModal] = React.useState(false);
  const [createEquipmentType, setCreateEquipmentType] = React.useState("");



  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <ProfileCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Grid item xs={12}>
          <EquipmentCard 
            type="SHOE" 
            setOpenEquipmentModal={setOpenEquipmentModal} 
            setEditEquipmentData={setEditEquipmentData} 
            setOpenCreateEquipmentModal={setOpenCreateEquipmentModal} 
            setCreateEquipmentType={setCreateEquipmentType}
          />
          </Grid>
          <Grid item xs={12}>
            <EquipmentCard 
              type="BIKE" 
              setOpenEquipmentModal={setOpenEquipmentModal} 
              setEditEquipmentData={setEditEquipmentData} 
              setOpenCreateEquipmentModal={setOpenCreateEquipmentModal} 
              setCreateEquipmentType={setCreateEquipmentType}
            />
          </Grid>
        </Grid>
      </Grid>
      <EditEquipmentModal data={editEquipmentData} openModal={openEquipmentModal} handleClose={() => setOpenEquipmentModal(false)}/>
      <CreateEquipmentModal type={createEquipmentType} openModal={openCreateEquipmentModal} handleClose={() => setOpenCreateEquipmentModal(false)}/>
    </div>
    
    
  );
    
}