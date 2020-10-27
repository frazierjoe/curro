import React from 'react';
import { AllowedActivity } from './AllowedActivity';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

export const ActivityTile = props => {

  const useStyles = makeStyles((theme) => ({
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.main,
    },
    cardContent:{

    },
   
  }));
  
  const editActivity = (activity) => {
    props.setEditActivity(true)
    props.setEditActivityId(activity.id)
    props.setEditActivityValues({
      distanceValue: activity.distance.value,
      distanceUnit: activity.distance.unit,
      duration: activity.duration,
      equipmentId: activity.equipment.id,
      heartRate: activity.additionalInfo.averageHeartRate,
      elevationGain: activity.additionalInfo.elevationGain,
      calories: activity.additionalInfo.calories,
    })
    props.setSelectedActivity(AllowedActivity[activity.activityId])
    props.setOpenActivityDetailModal(true)
  }
  const classes = useStyles();


  return (
    <Card className={classes.card} >
      <CardHeader
        title={props.activity.type}
        style={{paddingBottom: '0px'}}
        action={
          <Tooltip title="Edit Activity" placement="top" enterDelay={400} >
            <IconButton onClick={() => editActivity(props.activity)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1" component="p">{props.activity.duration}</Typography>
        <Typography variant="body1" component="p">{props.activity.distance.value + ' ' + props.activity.distance.unit.toLowerCase()}</Typography>
        <Typography variant="body1" component="p">7:51 min/mi</Typography>
      </CardContent>
    </Card>
    );
}