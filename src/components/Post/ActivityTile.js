import React from 'react';
import TimeHelper from '../../utils/TimeHelper'
import DistanceHelper from '../../utils/DistanceHelper'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import PoolIcon from '@material-ui/icons/Pool'; //swim, aqua-jog
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'; //hike
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'; //run, alter-g
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'; //bike
import HotelIcon from '@material-ui/icons/Hotel'; //sleep
import PhotoIcon from '@material-ui/icons/Photo'; //climb
import SpaIcon from '@material-ui/icons/Spa'; //yoga
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Grid from '@material-ui/core/Grid';

export const ActivityTile = props => {

  const useStyles = makeStyles((theme) => ({
    card: {
      width: '100%',
      height: '100%',
      marginBottom: 0,
      backgroundColor: theme.palette.background.main,
      "&:last-child": {
        paddingBottom: 0
      }
    },
    cardContent:{
      marginBottom: 0,
      paddingBottom: 0
    },
   
  }));
  
  const validDistance = (props.activity.distance !== null && props.activity.distance.value !== null && props.activity.distance.value > 0) 
  const distance = validDistance ? (props.activity.distance.value + ' ' + props.activity.distance.unit.toLowerCase() + ' ') : ''

  const validDuration = (props.activity.duration !== null && props.activity.duration > 0)
  const duration =  validDuration ? TimeHelper.formatTimeMs(props.activity.duration) : ""

  const pace = (validDistance && validDuration) ? ("("+DistanceHelper.calculateAveragePace(props.activity.distance, props.activity.duration, props.activity.type) + ")") : ""

  const getActivityTypeIcon = (activityType) => {
    switch(activityType) {
      case "RUN":
        return <DirectionsRunIcon/>
      case "BIKE":
        return <DirectionsBikeIcon/>
      case "SWIM":
        return <PoolIcon/>
      case "SLEEP":
        return <HotelIcon/>
      case "CLIMB":
        return <PhotoIcon/>
      case "ALTERG":
        return <DirectionsRunIcon/>
      case "YOGA":
        return <SpaIcon/>
      case "AQUA_JOG":
        return <PoolIcon/>
      case "HIKE":
        return <DirectionsWalkIcon/>
      default:
        return <FitnessCenterIcon/>
    }
  }

  const classes = useStyles();

  return (
      <ListItem style={{backgroundColor: "#fafafa"}} divider>
        <ListItemAvatar>
          {getActivityTypeIcon(props.activity.type)}
        </ListItemAvatar>
        <ListItemText primary={props.activity.type.replace(/\_+/g, ' ') + " " + distance + pace} secondary={duration}/>
      </ListItem>
    );
}