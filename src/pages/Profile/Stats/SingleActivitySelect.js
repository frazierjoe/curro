import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';

import { ACTIVITY_MAP } from './ActivityConstants';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: 120,
    },
}));
const SingleActivitySelect = ({displayedActivity, handleChange}) => {
    const classes = useStyles();

    return (
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Activity</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={displayedActivity}
                onChange={handleChange}
            >
                {Object.keys(ACTIVITY_MAP).map((activityEnum) => (
                    <MenuItem value={activityEnum} key={`statsActivitySelect-${activityEnum}`}>
                        {ACTIVITY_MAP[activityEnum].type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SingleActivitySelect;