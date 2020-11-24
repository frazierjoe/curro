import React, { useContext } from 'react';
import { AuthContext } from '../../auth';
import { useQuery, gql } from '@apollo/client';
import { ProfileCard } from './ProfileCard';
import { EquipmentCard } from './EquipmentCard';
import { TeamListCard } from './TeamListCard';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EditEquipmentModal from '../../components/EditEquipmentModal';
import { CreateEquipmentModal } from '../../components/CreateEquipmentModal';
import { ME_QUERY, USER_QUERY } from '../../utils/graphql';
import { CreateTeamModal } from '../../components/CreateTeamModal';
import UserStats from './Stats/UserStats';


export const Profile = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '32px',
    },
  }));

  const defaultTeamData = {
    id: "",
    name: "",
    profilePictureURL: ""
  }
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

  const { user } = useContext(AuthContext)
  const { userid } = props.match.params
  var me = false
  if(userid && user.id !== userid){
    console.log(userid)
  } else {
    console.log("me")
    me = true
  }
  
  const [openCreateTeamModal, setOpenCreateTeamModal] = React.useState(false);
  const [createTeamData, setCreateTeamData] = React.useState(defaultTeamData);

  const [openEquipmentModal, setOpenEquipmentModal] = React.useState(false);
  const [editEquipmentData, setEditEquipmentData] = React.useState(defaultEquipmentData);

  const [openCreateEquipmentModal, setOpenCreateEquipmentModal] = React.useState(false);
  const [createEquipmentType, setCreateEquipmentType] = React.useState("");

  const { loading, error, data } = useQuery(me ? ME_QUERY : USER_QUERY, {variables: {id: userid}});

  const classes = useStyles();
  const { history } = props;
  return (
    <div style={{overflow: 'hidden'}}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <Grid item xs={12}>
            <ProfileCard loading={loading} error={error} data={data} me={me}/>
            
          </Grid>
          <Grid item xs={12}>
            <TeamListCard 
              me={me}
              data={data}
              loading={loading}
              error={error}
              setOpenTeamModal={setOpenEquipmentModal} 
              setEditEquipmentData={setEditEquipmentData} 
              setOpenCreateTeamModal={setOpenCreateTeamModal}
              history={history}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Grid item xs={12}>
          <EquipmentCard 
            me={me}
            type="SHOE" 
            data={data}
            loading={loading}
            error={error}
            setOpenEquipmentModal={setOpenEquipmentModal} 
            setEditEquipmentData={setEditEquipmentData} 
            setOpenCreateEquipmentModal={setOpenCreateEquipmentModal} 
            setCreateEquipmentType={setCreateEquipmentType}
          />
          </Grid>
          <Grid item xs={12}>
            <EquipmentCard 
              me={me}
              type="BIKE" 
              data={data}
              loading={loading}
              error={error}
              setOpenEquipmentModal={setOpenEquipmentModal} 
              setEditEquipmentData={setEditEquipmentData} 
              setOpenCreateEquipmentModal={setOpenCreateEquipmentModal} 
              setCreateEquipmentType={setCreateEquipmentType}
            />
          </Grid>
        </Grid>
        <UserStats/>
      </Grid>
      {me && <EditEquipmentModal data={editEquipmentData} openModal={openEquipmentModal} handleClose={() => setOpenEquipmentModal(false)}/>}
      {me && <CreateEquipmentModal type={createEquipmentType} openModal={openCreateEquipmentModal} handleClose={() => setOpenCreateEquipmentModal(false)}/>}
      {me && <CreateTeamModal openModal={openCreateTeamModal} handleClose={() => setOpenCreateTeamModal(false)}/>}
    </div>
    
    
  );
    
}
