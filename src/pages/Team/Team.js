import React, { useContext } from 'react';
import { AuthContext } from '../../auth';
import { useQuery, gql } from '@apollo/client';
import { TeamCard } from './TeamCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


export const Team = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '32px',
    },
  }));

  const { user } = useContext(AuthContext)
  const { teamid } = props.match.params

  const TEAM_QUERY = gql`
    query getTeam($id: ID!){
      team(id: $id) {
        id
        name
        description
        createdAt
        memberCount
        profilePictureURL
      }
    }
  `;

  const { loading, error, data } = useQuery(TEAM_QUERY, {variables: {id: teamid}});


  const classes = useStyles();

  return (
    <div style={{overflow: 'hidden'}}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <TeamCard loading={loading} error={error} data={data}/>
        </Grid>
      </Grid>
    </div>
  );
    
}