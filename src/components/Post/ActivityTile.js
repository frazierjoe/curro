import React from 'react';
import TimeHelper from '../../utils/TimeHelper'
import DistanceHelper from '../../utils/DistanceHelper'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PoolIcon from '@material-ui/icons/Pool'; //swim
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'; //run, alter-g
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'; //bike
import HotelIcon from '@material-ui/icons/Hotel'; //sleep
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'; //default icon
import Avatar from '@material-ui/core/Avatar';


export const ActivityTile = props => {
  
  const validDistance = (props.activity.distance !== null && props.activity.distance.value !== null && props.activity.distance.value > 0) 
  const distance = validDistance ? (props.activity.distance.value + ' ' + props.activity.distance.unit.toLowerCase() + ' ') : ''

  const validDuration = (props.activity.duration !== null && props.activity.duration > 0)
  const duration =  validDuration ? TimeHelper.formatTimeMs(props.activity.duration) : ""

  const pace = (validDistance && validDuration) ? ("("+DistanceHelper.calculateAveragePace(props.activity.distance, props.activity.duration, props.activity.type) + ")") : ""

  const getActivityTypeIcon = (activityType) => {
    switch(activityType.toUpperCase()) {
      case "RUN":
        return <DirectionsRunIcon/>
      case "BIKE":
        return <DirectionsBikeIcon/>
      case "SWIM":
        return <PoolIcon/>
      case "SLEEP":
        return <HotelIcon/>
      case "CLIMB":
        return <Avatar alt="Climb" variant="square" src={process.env.PUBLIC_URL + '/assets/icons/noun_climbing.png'} style={{height: "24px", width: "24px"}}/>
      case "ALTERG":
        return <Avatar alt="AlterG" variant="square" src={process.env.PUBLIC_URL + '/assets/icons/noun_treadmill.png'} style={{height: "24px", width: "24px"}}/>
      case "YOGA":
        return <Avatar alt="Yoga" variant="square" src={process.env.PUBLIC_URL + '/assets/icons/noun_yoga.png'} style={{height: "24px", width: "24px"}}/>
      case "AQUA_JOG":
        return <Avatar alt="Aqua" variant="square" src={process.env.PUBLIC_URL + '/assets/icons/noun_aqua.png'} style={{height: "24px", width: "24px"}}/>
      case "HIKE":
        return <Avatar alt="Hike" src={process.env.PUBLIC_URL + '/assets/icons/noun_hiking.png'} style={{height: "24px", width: "24px"}}/>
      default:
        return <FitnessCenterIcon/>
    }
  }

  return (
      <ListItem style={{backgroundColor: "#fafafa"}} divider>
        <ListItemAvatar>
          {getActivityTypeIcon(props.activity.type)}
        </ListItemAvatar>
        <ListItemText primary={props.activity.type.replace(/_+/g, ' ') + " " + distance + pace} secondary={duration}/>
      </ListItem>
    );
}