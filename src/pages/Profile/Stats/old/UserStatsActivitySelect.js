import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function UserStatsActivitySelect({activity, setActivity, mode, setMode, ALLOWED_ACTIVITIES}) {
  const classes = useStyles();

  const handleChange = (event) => {
    setActivity(event.target.value);
    setMode('DURATION');
  };

  let activityOptions = ALLOWED_ACTIVITIES.map(activityEnum => {
    return (
        <MenuItem value={activityEnum} key={`-activityOption${activityEnum}`}>{activityEnum}</MenuItem>
    )
  });
  activityOptions.unshift(<MenuItem value={'ALL'} key={'activity-select-unique'}>ALL</MenuItem>);

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Activity</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={activity}
          onChange={handleChange}
        >
          {activityOptions}
        </Select>
      </FormControl>
    </div>
  );
}

/*
enum AllowedActivity {
  RUN
  BIKE
  SWIM
  SLEEP
  CLIMB
  ALTERG
  YOGA
  AQUA_JOG
  HIKE
} 
*/